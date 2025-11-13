'use client';

import React, { useState } from 'react';

interface Topper {
  rank: number;
  studentId: string;
  studentName: string;
  class: string;
  percentage: number;
  subjects: { subject: string; marks: number }[];
}

interface ToppersListProps {
  toppers: Topper[];
  title?: string;
  limit?: number;
}

export default function ToppersList({ toppers, title = 'Top Performers', limit = 10 }: ToppersListProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const displayedToppers = toppers.slice(0, limit);

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `${rank}.`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900';
    if (rank === 3) return 'bg-gradient-to-r from-amber-600 to-amber-700 text-white';
    return 'bg-white';
  };

  const getAvatarUrl = (name: string) => {
    const seed = encodeURIComponent(name);
    return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=2563eb,7c3aed,db2777,059669,dc2626`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <div className="text-sm text-gray-600">
          Showing top {displayedToppers.length} students
        </div>
      </div>

      <div className="space-y-3">
        {displayedToppers.map((topper) => (
          <div key={topper.studentId} className={`rounded-lg border-2 overflow-hidden transition-all ${getRankColor(topper.rank)} ${topper.rank <= 3 ? 'border-transparent shadow-lg' : 'border-gray-200 hover:border-blue-300'}`}>
            <div className="p-4 cursor-pointer" onClick={() => setExpanded(expanded === topper.studentId ? null : topper.studentId)}>
              <div className="flex items-center gap-4">
                <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center text-2xl font-bold rounded-full ${topper.rank <= 3 ? 'bg-white bg-opacity-20' : 'bg-gray-100'}`}>
                  {getMedalIcon(topper.rank)}
                </div>
                
                <img src={getAvatarUrl(topper.studentName)} alt={topper.studentName} className="w-12 h-12 rounded-full border-2 border-white shadow" />
                
                <div className="flex-1">
                  <h4 className={`font-bold ${topper.rank <= 3 ? '' : 'text-gray-900'}`}>
                    {topper.studentName}
                  </h4>
                  <div className={`text-sm ${topper.rank <= 3 ? 'opacity-90' : 'text-gray-600'}`}>
                    {topper.studentId} • {topper.class}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-3xl font-bold ${topper.rank <= 3 ? '' : 'text-blue-600'}`}>
                    {topper.percentage.toFixed(1)}%
                  </div>
                  <div className={`text-xs ${topper.rank <= 3 ? 'opacity-75' : 'text-gray-500'}`}>
                    Overall Score
                  </div>
                </div>
                
                <svg className={`w-5 h-5 transition-transform ${expanded === topper.studentId ? 'rotate-180' : ''} ${topper.rank <= 3 ? '' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {expanded === topper.studentId && (
              <div className="px-4 pb-4 bg-white">
                <div className="pt-4 border-t border-gray-200">
                  <h5 className="text-sm font-semibold text-gray-700 mb-3">Subject-wise Performance</h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {topper.subjects.map((subject, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1">{subject.subject}</div>
                        <div className="text-lg font-bold text-gray-900">{subject.marks}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {toppers.length > limit && (
        <div className="mt-4 text-center">
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View All {toppers.length} Toppers →
          </button>
        </div>
      )}
    </div>
  );
}
