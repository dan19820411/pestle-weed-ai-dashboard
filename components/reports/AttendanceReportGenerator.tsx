'use client';
import React, { useState } from 'react';

interface AttendanceReportGeneratorProps {
  initialData?: any[];
}

const defaultAttendanceData = [
  { date: '2025-11-11', class: '10A', present: 28, absent: 2, total: 30, percentage: 93.3 },
  { date: '2025-11-11', class: '10B', present: 25, absent: 3, total: 28, percentage: 89.3 },
  { date: '2025-11-12', class: '10A', present: 29, absent: 1, total: 30, percentage: 96.7 },
  { date: '2025-11-12', class: '10B', present: 27, absent: 1, total: 28, percentage: 96.4 },
  { date: '2025-11-13', class: '10A', present: 27, absent: 3, total: 30, percentage: 90.0 },
  { date: '2025-11-13', class: '10B', present: 26, absent: 2, total: 28, percentage: 92.9 },
];

export default function AttendanceReportGenerator({ initialData }: AttendanceReportGeneratorProps) {
  const attendanceData = initialData || defaultAttendanceData;
  const [generating, setGenerating] = useState(false);

  const generateReport = (format: 'csv' | 'pdf') => {
    setGenerating(true);
    setTimeout(() => {
      alert(`Generated ${format.toUpperCase()} report with ${attendanceData.length} records`);
      setGenerating(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Generate Attendance Report</h3>
      <p className="text-gray-600 mb-6">Export attendance data with {attendanceData.length} records</p>
      
      <div className="flex gap-4">
        <button
          onClick={() => generateReport('csv')}
          disabled={generating}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
        >
          {generating ? 'Generating...' : 'Export as CSV'}
        </button>
        <button
          onClick={() => generateReport('pdf')}
          disabled={generating}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
        >
          {generating ? 'Generating...' : 'Export as PDF'}
        </button>
      </div>
    </div>
  );
}
