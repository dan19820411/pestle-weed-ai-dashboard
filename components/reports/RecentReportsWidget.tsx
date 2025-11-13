'use client';

import React, { useState, useEffect } from 'react';

interface Report {
  id: string;
  title: string;
  type: 'PDF' | 'Excel' | 'CSV';
  generatedAt: string;
  size: string;
  generatedBy: string;
  category: 'Attendance' | 'Academic' | 'Administrative' | 'Results';
}

interface RecentReportsWidgetProps {
  limit?: number;
}

export default function RecentReportsWidget({ limit = 5 }: RecentReportsWidgetProps) {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    // Load recent reports from localStorage or API
    loadRecentReports();
  }, []);

  const loadRecentReports = () => {
    // In real app, fetch from API or localStorage
    const mockReports: Report[] = [
      {
        id: '1',
        title: 'Class 10-A Attendance Report',
        type: 'PDF',
        generatedAt: '2 hours ago',
        size: '245 KB',
        generatedBy: 'Principal',
        category: 'Attendance'
      },
      {
        id: '2',
        title: 'Term 1 Results Summary',
        type: 'Excel',
        generatedAt: '5 hours ago',
        size: '1.2 MB',
        generatedBy: 'Principal',
        category: 'Results'
      },
      {
        id: '3',
        title: 'Monthly Academic Performance',
        type: 'PDF',
        generatedAt: '1 day ago',
        size: '890 KB',
        generatedBy: 'Principal',
        category: 'Academic'
      },
      {
        id: '4',
        title: 'Fee Collection Report',
        type: 'Excel',
        generatedAt: '2 days ago',
        size: '567 KB',
        generatedBy: 'Admin',
        category: 'Administrative'
      },
      {
        id: '5',
        title: 'Weekly Attendance Summary',
        type: 'CSV',
        generatedAt: '3 days ago',
        size: '123 KB',
        generatedBy: 'Principal',
        category: 'Attendance'
      }
    ];

    setReports(mockReports.slice(0, limit));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return (
          <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
            <path d="M14 2v6h6M9 13h6M9 17h6M9 9h6" />
          </svg>
        );
      case 'Excel':
        return (
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
            <path d="M14 2v6h6M10 11l2 4 2-4M9 17l3-6 3 6" />
          </svg>
        );
      case 'CSV':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
            <path d="M14 2v6h6M9 13h6M9 17h6" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Attendance': 'bg-blue-100 text-blue-800',
      'Academic': 'bg-green-100 text-green-800',
      'Administrative': 'bg-purple-100 text-purple-800',
      'Results': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const handleDownload = (reportId: string) => {
    // In real app, trigger actual download
    console.log('Downloading report:', reportId);
    alert(`Downloading report ${reportId}...`);
  };

  const handleDelete = (reportId: string) => {
    setReports(reports.filter(r => r.id !== reportId));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Recent Reports</h3>
            <p className="text-blue-100 text-sm mt-1">Your recently generated reports</p>
          </div>
          <svg className="w-6 h-6 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {reports.length === 0 ? (
          <div className="p-8 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-600">No recent reports</p>
            <p className="text-sm text-gray-500 mt-1">Generate your first report to see it here</p>
          </div>
        ) : (
          reports.map((report) => (
            <div key={report.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getTypeIcon(report.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm truncate">
                        {report.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getCategoryColor(report.category)}`}>
                          {report.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {report.size}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">
                          {report.generatedAt}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDownload(report.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Download"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(report.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {reports.length > 0 && (
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
          <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm w-full text-center">
            View All Reports →
          </button>
        </div>
      )}
    </div>
  );
}
