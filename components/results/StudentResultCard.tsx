'use client';
import React, { useState } from 'react';
import { 
  GraduationCap, 
  ChevronDown,
  ChevronUpIcon,
  MessageCircle 
} from 'lucide-react';

interface StudentResultCardProps {
  result: any;
}

export default function StudentResultCard({ result }: StudentResultCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getGradeColor = (grade: string) => {
    const colors: any = {
      'A+': 'text-green-600 bg-green-50 border-green-200',
      'A': 'text-green-600 bg-green-50 border-green-200',
      'B+': 'text-blue-600 bg-blue-50 border-blue-200',
      'B': 'text-blue-600 bg-blue-50 border-blue-200',
      'C': 'text-yellow-600 bg-yellow-50 border-yellow-200',
      'D': 'text-orange-600 bg-orange-50 border-orange-200',
      'F': 'text-red-600 bg-red-50 border-red-200',
    };
    return colors[grade] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-600';
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 70) return 'bg-blue-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const percentage = result.percentage || (result.total_marks && result.max_marks 
    ? (result.total_marks / result.max_marks) * 100 
    : 0);

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300">
      {/* Main Card Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-3 bg-purple-100 rounded-lg">
              <GraduationCap className="h-7 w-7 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">{result.subject || 'Subject'}</h3>
              <p className="text-sm text-gray-500">{result.term || 'Term 1'} • {result.class || 'Class 9-A'}</p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-lg text-sm font-bold border-2 ${getGradeColor(result.grade)}`}>
            Grade {result.grade || 'A'}
          </div>
        </div>

        {/* Marks Breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-blue-600 font-semibold mb-1">Theory</p>
            <p className="text-xl font-bold text-blue-900">{result.theory_marks || 0}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-xs text-green-600 font-semibold mb-1">Practical</p>
            <p className="text-xl font-bold text-green-900">{result.practical_marks || 0}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <p className="text-xs text-purple-600 font-semibold mb-1">Total Marks</p>
            <p className="text-xl font-bold text-purple-900">
              {result.total_marks || 0}/{result.max_marks || 100}
            </p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3">
            <p className="text-xs text-orange-600 font-semibold mb-1">Percentage</p>
            <p className="text-xl font-bold text-orange-900">{percentage.toFixed(1)}%</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-600">Performance</span>
            <span className="text-xs font-bold text-gray-900">{percentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${getPerformanceColor(percentage)}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Teacher Remarks Toggle */}
        {result.teacher_remarks && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition mt-2"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Teacher's Remarks</span>
            </div>
            {expanded ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
        )}
      </div>

      {/* Expanded Teacher Remarks */}
      {expanded && result.teacher_remarks && (
        <div className="px-6 pb-6 animate-in slide-in-from-top duration-300">
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
            <p className="text-sm text-gray-700 italic">"{result.teacher_remarks}"</p>
          </div>
        </div>
      )}
    </div>
  );
}
