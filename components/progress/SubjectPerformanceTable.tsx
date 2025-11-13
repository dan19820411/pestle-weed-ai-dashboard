'use client';

import React, { useState } from 'react';

interface SubjectResult {
  subject: string;
  theory_marks: number;
  practical_marks: number;
  total_marks: number;
  max_marks: number;
  percentage: number;
  grade: string;
  teacher_remarks: string;
  term: string;
}

interface SubjectPerformanceTableProps {
  results?: SubjectResult[];
  studentId?: string;
  showTerm?: 'Term1' | 'Term2' | 'Both';
}

// Default subject results
const defaultSubjectResults: SubjectResult[] = [
  { subject: 'Mathematics', theory_marks: 68, practical_marks: 17, total_marks: 85, max_marks: 100, percentage: 85.0, grade: 'A', teacher_remarks: 'Excellent performance in algebra', term: 'Term1' },
  { subject: 'Science', theory_marks: 62, practical_marks: 16, total_marks: 78, max_marks: 100, percentage: 78.0, grade: 'B+', teacher_remarks: 'Good understanding of concepts', term: 'Term1' },
  { subject: 'English', theory_marks: 66, practical_marks: 16, total_marks: 82, max_marks: 100, percentage: 82.0, grade: 'A', teacher_remarks: 'Very good writing skills', term: 'Term1' },
  { subject: 'Hindi', theory_marks: 60, practical_marks: 15, total_marks: 75, max_marks: 100, percentage: 75.0, grade: 'B+', teacher_remarks: 'Good progress shown', term: 'Term1' },
  { subject: 'Social Studies', theory_marks: 64, practical_marks: 16, total_marks: 80, max_marks: 100, percentage: 80.0, grade: 'A', teacher_remarks: 'Well prepared for exams', term: 'Term1' },
];

export default function SubjectPerformanceTable({ results = defaultSubjectResults, studentId, showTerm = 'Both' }: SubjectPerformanceTableProps) {
  const [sortBy, setSortBy] = useState<'subject' | 'percentage' | 'grade'>('percentage');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Ensure results is always an array
  const safeResults = results || defaultSubjectResults;

  // Filter by term if needed
  const filteredResults = showTerm === 'Both' 
    ? safeResults 
    : safeResults.filter(r => r.term === showTerm);

  // Sort results
  const sortedResults = [...filteredResults].sort((a, b) => {
    let compareValue = 0;
    
    if (sortBy === 'subject') {
      compareValue = a.subject.localeCompare(b.subject);
    } else if (sortBy === 'percentage') {
      compareValue = a.percentage - b.percentage;
    } else if (sortBy === 'grade') {
      const gradeOrder = { 'A+': 6, 'A': 5, 'B+': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 };
      compareValue = (gradeOrder[a.grade as keyof typeof gradeOrder] || 0) - 
                     (gradeOrder[b.grade as keyof typeof gradeOrder] || 0);
    }
    
    return sortOrder === 'asc' ? compareValue : -compareValue;
  });

  // Calculate overall statistics
  const totalPercentage = sortedResults.reduce((sum, r) => sum + r.percentage, 0);
  const avgPercentage = sortedResults.length > 0 ? (totalPercentage / sortedResults.length).toFixed(1) : '0.0';
  const highestScore = sortedResults.length > 0 ? Math.max(...sortedResults.map(r => r.percentage)) : 0;
  const lowestScore = sortedResults.length > 0 ? Math.min(...sortedResults.map(r => r.percentage)) : 0;

  // Get grade color
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'A':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'B+':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'B':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'C':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Get percentage color
  const getPercentageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 font-bold';
    if (percentage >= 75) return 'text-blue-600 font-semibold';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Toggle sort
  const handleSort = (column: 'subject' | 'percentage' | 'grade') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Subject-wise Performance
        </h3>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-xs font-semibold text-blue-700 uppercase mb-1">
              Average Score
            </div>
            <div className="text-2xl font-bold text-blue-900">
              {avgPercentage}%
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-xs font-semibold text-green-700 uppercase mb-1">
              Highest Score
            </div>
            <div className="text-2xl font-bold text-green-900">
              {highestScore.toFixed(1)}%
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-xs font-semibold text-orange-700 uppercase mb-1">
              Lowest Score
            </div>
            <div className="text-2xl font-bold text-orange-900">
              {lowestScore.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Sort Info */}
        <div className="text-sm text-gray-600 mb-2">
          Sorted by: <span className="font-semibold">{sortBy}</span> ({sortOrder === 'desc' ? 'Highest first' : 'Lowest first'})
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th 
                className="text-left p-3 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('subject')}
              >
                <div className="flex items-center gap-2">
                  Subject
                  {sortBy === 'subject' && (
                    <span className="text-blue-600">
                      {sortOrder === 'desc' ? '↓' : '↑'}
                    </span>
                  )}
                </div>
              </th>
              <th className="text-center p-3 text-sm font-semibold text-gray-700">
                Term
              </th>
              <th className="text-center p-3 text-sm font-semibold text-gray-700">
                Theory
              </th>
              <th className="text-center p-3 text-sm font-semibold text-gray-700">
                Practical
              </th>
              <th className="text-center p-3 text-sm font-semibold text-gray-700">
                Total
              </th>
              <th 
                className="text-center p-3 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('percentage')}
              >
                <div className="flex items-center justify-center gap-2">
                  Percentage
                  {sortBy === 'percentage' && (
                    <span className="text-blue-600">
                      {sortOrder === 'desc' ? '↓' : '↑'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className="text-center p-3 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('grade')}
              >
                <div className="flex items-center justify-center gap-2">
                  Grade
                  {sortBy === 'grade' && (
                    <span className="text-blue-600">
                      {sortOrder === 'desc' ? '↓' : '↑'}
                    </span>
                  )}
                </div>
              </th>
              <th className="text-left p-3 text-sm font-semibold text-gray-700">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map((result, index) => (
              <tr 
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="p-3">
                  <div className="font-medium text-gray-900">{result.subject}</div>
                </td>
                <td className="p-3 text-center">
                  <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {result.term}
                  </span>
                </td>
                <td className="p-3 text-center text-gray-700">
                  {result.theory_marks}/80
                </td>
                <td className="p-3 text-center text-gray-700">
                  {result.practical_marks}/20
                </td>
                <td className="p-3 text-center font-semibold text-gray-900">
                  {result.total_marks}/{result.max_marks}
                </td>
                <td className="p-3 text-center">
                  <span className={getPercentageColor(result.percentage)}>
                    {result.percentage.toFixed(1)}%
                  </span>
                </td>
                <td className="p-3 text-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getGradeColor(result.grade)}`}>
                    {result.grade}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-600 italic">
                  {result.teacher_remarks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedResults.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No results available for the selected term.
        </div>
      )}
    </div>
  );
}
