'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Printer, FileText, Calendar } from 'lucide-react';

export default function ReportCornerPage() {
  const [selectedReportType, setSelectedReportType] = useState('');

  const reportTypes = [
    { id: 'attendance', name: 'Attendance Report', description: 'Daily, weekly, or monthly attendance' },
    { id: 'performance', name: 'Performance Report', description: 'Academic performance by class/subject' },
    { id: 'fee', name: 'Fee Collection Report', description: 'Fee payment status and collection' },
    { id: 'conduct', name: 'Conduct Report', description: 'Student behavior and discipline' },
    { id: 'custom', name: 'Custom Report', description: 'Build your own report' },
  ];

  const handleGenerateReport = () => {
    if (!selectedReportType) {
      alert('Please select a report type');
      return;
    }
    alert(`Generating ${reportTypes.find(r => r.id === selectedReportType)?.name}...`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/principal" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Report Corner</h1>
          <p className="mt-2 text-gray-600">Generate and download various reports</p>
        </div>

        {/* Report Type Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Report Type</h2>
          <div className="space-y-3">
            {reportTypes.map((report) => (
              <label
                key={report.id}
                className={`flex items-start p-4 border rounded-lg cursor-pointer transition ${
                  selectedReportType === report.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="reportType"
                  value={report.id}
                  checked={selectedReportType === report.id}
                  onChange={(e) => setSelectedReportType(e.target.value)}
                  className="mt-1 h-4 w-4 text-blue-600"
                />
                <div className="ml-3">
                  <div className="font-medium text-gray-900">{report.name}</div>
                  <div className="text-sm text-gray-600">{report.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Date Range Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Date Range</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Additional Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Filters (Optional)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Classes</option>
                <option value="9-A">Class 9-A</option>
                <option value="9-B">Class 9-B</option>
                <option value="10-A">Class 10-A</option>
                <option value="10-B">Class 10-B</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Subjects</option>
                <option value="math">Mathematics</option>
                <option value="science">Science</option>
                <option value="english">English</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleGenerateReport}
            disabled={!selectedReportType}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
              selectedReportType
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FileText className="h-5 w-5" />
            Generate Report
          </button>
          <button
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
          >
            <Download className="h-5 w-5" />
            Download
          </button>
          <button
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
          >
            <Printer className="h-5 w-5" />
            Print
          </button>
        </div>

        {/* Recent Reports */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Reports</h2>
          <div className="space-y-3">
            <RecentReportItem
              title="Attendance Report - November 2025"
              date="Nov 10, 2025"
              type="Attendance"
            />
            <RecentReportItem
              title="Performance Report - Class 10-A"
              date="Nov 8, 2025"
              type="Performance"
            />
            <RecentReportItem
              title="Fee Collection - October 2025"
              date="Nov 1, 2025"
              type="Fee Collection"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function RecentReportItem({ title, date, type }: any) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <FileText className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <p className="font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">{type} • {date}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="p-2 text-gray-600 hover:text-blue-600 transition">
          <Download className="h-4 w-4" />
        </button>
        <button className="p-2 text-gray-600 hover:text-blue-600 transition">
          <Printer className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}