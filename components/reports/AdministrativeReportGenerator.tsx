'use client';
import React, { useState } from 'react';

interface AdministrativeReportGeneratorProps {
  initialData?: any[];
}

const defaultAdminData = [
  { category: 'Fee Collection', month: 'October', collected: 450000, pending: 50000, total: 500000, percentage: 90 },
  { category: 'Fee Collection', month: 'November', collected: 425000, pending: 75000, total: 500000, percentage: 85 },
  { category: 'Teacher Performance', teacher: 'Mr. Kumar', rating: 4.5, classes: 25, feedback: 'Excellent' },
  { category: 'Teacher Performance', teacher: 'Mrs. Sharma', rating: 4.8, classes: 30, feedback: 'Outstanding' },
  { category: 'Enrollment', class: '10A', enrolled: 30, capacity: 35, percentage: 85.7 },
  { category: 'Enrollment', class: '10B', enrolled: 28, capacity: 35, percentage: 80.0 },
];

export default function AdministrativeReportGenerator({ initialData }: AdministrativeReportGeneratorProps) {
  const adminData = initialData || defaultAdminData;
  const [generating, setGenerating] = useState(false);

  const generateReport = (format: 'csv' | 'pdf') => {
    setGenerating(true);
    setTimeout(() => {
      alert(`Generated ${format.toUpperCase()} report with ${adminData.length} records`);
      setGenerating(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Generate Administrative Report</h3>
      <p className="text-gray-600 mb-6">Export administrative data with {adminData.length} records</p>
      
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
