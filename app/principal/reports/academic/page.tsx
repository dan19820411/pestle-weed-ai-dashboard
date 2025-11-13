'use client';
import { useState } from 'react';
import AcademicReportGenerator from '@/components/reports/AcademicReportGenerator';
import PageTransition, { FadeIn } from '@/components/ui/PageTransition';

const dummyAcademicData = [
  { subject: 'Mathematics', class: '10A', avgScore: 85.5, highestScore: 98, lowestScore: 62, students: 30 },
  { subject: 'Science', class: '10A', avgScore: 78.2, highestScore: 95, lowestScore: 58, students: 30 },
  { subject: 'English', class: '10A', avgScore: 82.8, highestScore: 96, lowestScore: 65, students: 30 },
  { subject: 'Mathematics', class: '10B', avgScore: 81.3, highestScore: 94, lowestScore: 60, students: 28 },
  { subject: 'Science', class: '10B', avgScore: 76.5, highestScore: 92, lowestScore: 55, students: 28 },
  { subject: 'English', class: '10B', avgScore: 80.1, highestScore: 93, lowestScore: 63, students: 28 },
];

export default function AcademicReportsPage() {
  return (
    <PageTransition>
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Academic Reports</h1>
          <p className="text-gray-600 mt-2">Generate detailed academic performance and subject-wise analysis</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-semibold">Preview: Subject Performance Data</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Highest</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lowest</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dummyAcademicData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.subject}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.class}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">{row.avgScore.toFixed(1)}%</td>
                    <td className="px-6 py-4 text-sm text-green-600">{row.highestScore}</td>
                    <td className="px-6 py-4 text-sm text-red-600">{row.lowestScore}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.students}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <AcademicReportGenerator initialData={dummyAcademicData} />
      </FadeIn>
    </PageTransition>
  );
}
