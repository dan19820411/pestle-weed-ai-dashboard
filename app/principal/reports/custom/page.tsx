'use client';

import { useState } from 'react';
import PageTransition, { FadeIn } from '@/components/ui/PageTransition';
import { 
  FileText, 
  Calendar, 
  Users,
  GraduationCap,
  BarChart3,
  ClipboardList
} from 'lucide-react';

export default function CustomReportsPage() {
  const [selectedReportType, setSelectedReportType] = useState<string>('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');

  const reportTypes = [
    {
      id: 'attendance',
      name: 'Custom Attendance Report',
      icon: Calendar,
      description: 'Generate attendance reports with custom date ranges and filters',
      color: 'blue'
    },
    {
      id: 'academic',
      name: 'Custom Academic Report',
      icon: GraduationCap,
      description: 'Create detailed academic performance reports',
      color: 'green'
    },
    {
      id: 'comparison',
      name: 'Class Comparison Report',
      icon: BarChart3,
      description: 'Compare performance across different classes',
      color: 'purple'
    },
    {
      id: 'student',
      name: 'Student Progress Report',
      icon: Users,
      description: 'Individual student progress over time',
      color: 'orange'
    },
    {
      id: 'comprehensive',
      name: 'Comprehensive Report',
      icon: DocumentBarChart3,
      description: 'All-inclusive report with attendance, academics, and analytics',
      color: 'indigo'
    }
  ];

  const classes = ['All', '10', '9', '8', '7', '6'];
  const subjects = ['All', 'Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer Science'];

  const handleGenerateReport = () => {
    if (!selectedReportType) {
      alert('Please select a report type');
      return;
    }
    
    // Simulate report generation
    alert(`Generating ${selectedReportType} report...\n\nDate Range: ${dateRange.start || 'Not set'} to ${dateRange.end || 'Not set'}\nClass: ${selectedClass}\nSubject: ${selectedSubject}`);
  };

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700',
      green: 'bg-green-50 border-green-200 hover:bg-green-100 text-green-700',
      purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-700',
      orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-700',
      indigo: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-700',
    };
    return colors[color] || colors.blue;
  };

  return (
    <PageTransition>
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Custom Report Generator</h1>
          <p className="text-gray-600 mt-2">Create customized reports with your own parameters and filters</p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Report Types */}
        <div className="lg:col-span-2">
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Select Report Type</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTypes.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReportType(report.id)}
                    className={`
                      p-4 rounded-lg border-2 transition-all text-left
                      ${selectedReportType === report.id 
                        ? `${getColorClasses(report.color)} border-${report.color}-400 shadow-lg` 
                        : 'bg-white border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <report.icon className={`h-8 w-8 flex-shrink-0 ${selectedReportType === report.id ? '' : 'text-gray-400'}`} />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{report.name}</h3>
                        <p className="text-sm text-gray-600">{report.description}</p>
                      </div>
                      {selectedReportType === report.id && (
                        <div className="flex-shrink-0">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right Panel - Filters & Options */}
        <div className="space-y-6">
          <FadeIn delay={0.2}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Filters & Options</h2>
              
              {/* Date Range */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Date Range
                </label>
                <div className="space-y-2">
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Start Date"
                  />
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="End Date"
                  />
                </div>
              </div>

              {/* Class Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="h-4 w-4 inline mr-1" />
                  Class
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {classes.map(cls => (
                    <option key={cls} value={cls}>
                      {cls === 'All' ? 'All Classes' : `Class ${cls}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <GraduationCap className="h-4 w-4 inline mr-1" />
                  Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerateReport}
                disabled={!selectedReportType}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <FileText className="h-5 w-5" />
                Generate Report
              </button>
            </div>
          </FadeIn>

          {/* Info Box */}
          <FadeIn delay={0.3}>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h5 className="font-semibold text-blue-900 text-sm mb-1">Custom Reports</h5>
                  <p className="text-xs text-blue-800">
                    Select a report type and configure filters to generate customized reports. 
                    Reports will be generated in PDF format and can be downloaded immediately.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Quick Actions */}
      <FadeIn delay={0.4}>
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Report Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left">
              <h4 className="font-semibold text-gray-900 mb-1">Monthly Overview</h4>
              <p className="text-sm text-gray-600">Complete report for the current month</p>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left">
              <h4 className="font-semibold text-gray-900 mb-1">Term Summary</h4>
              <p className="text-sm text-gray-600">Academic summary for current term</p>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left">
              <h4 className="font-semibold text-gray-900 mb-1">Year-End Report</h4>
              <p className="text-sm text-gray-600">Comprehensive annual performance report</p>
            </button>
          </div>
        </div>
      </FadeIn>
    </PageTransition>
  );
}
