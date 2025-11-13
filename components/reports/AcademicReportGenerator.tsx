'use client';
import React, { useState } from 'react';

interface AcademicReportGeneratorProps {
  initialData?: any[];
}

const defaultAcademicData = [
  { subject: 'Mathematics', class: '10A', avgScore: 85.5, highestScore: 98, lowestScore: 62, students: 30 },
  { subject: 'Science', class: '10A', avgScore: 78.2, highestScore: 95, lowestScore: 58, students: 30 },
  { subject: 'English', class: '10A', avgScore: 82.8, highestScore: 96, lowestScore: 65, students: 30 },
  { subject: 'Mathematics', class: '10B', avgScore: 81.3, highestScore: 94, lowestScore: 60, students: 28 },
  { subject: 'Science', class: '10B', avgScore: 76.5, highestScore: 92, lowestScore: 55, students: 28 },
  { subject: 'English', class: '10B', avgScore: 80.1, highestScore: 93, lowestScore: 63, students: 28 },
];

export default function AcademicReportGenerator({ initialData }: AcademicReportGeneratorProps) {
  const academicData = initialData || defaultAcademicData;
  const [generating, setGenerating] = useState(false);

  const generateReport = (format: 'csv' | 'pdf') => {
    setGenerating(true);
    setTimeout(() => {
      alert(`Generated ${format.toUpperCase()} report with ${academicData.length} records`);
      setGenerating(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Generate Academic Report</h3>
      <p className="text-gray-600 mb-6">Export academic data with {academicData.length} subject records</p>
      
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
