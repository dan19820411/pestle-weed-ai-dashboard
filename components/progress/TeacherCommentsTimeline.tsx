'use client';

import React from 'react';

interface Comment {
  month: string;
  year: number;
  teacher_comments: string;
  overall_percentage: number;
  discipline_score: number;
  participation_score: number;
}

interface TeacherCommentsTimelineProps {
  comments?: Comment[];
  studentId?: string;
}

// Default teacher comments data
const defaultComments: Comment[] = [
  {
    month: 'November',
    year: 2025,
    teacher_comments: 'Excellent progress in all subjects. Shows great enthusiasm and dedication. Keep up the outstanding work!',
    overall_percentage: 87,
    discipline_score: 5,
    participation_score: 5
  },
  {
    month: 'October',
    year: 2025,
    teacher_comments: 'Good understanding of concepts. Active participation in class discussions. Math skills have improved significantly.',
    overall_percentage: 82,
    discipline_score: 4,
    participation_score: 4
  },
  {
    month: 'September',
    year: 2025,
    teacher_comments: 'Shows consistent effort and improvement. Needs to focus more on time management during exams.',
    overall_percentage: 78,
    discipline_score: 4,
    participation_score: 4
  },
  {
    month: 'August',
    year: 2025,
    teacher_comments: 'Good potential. Requires more practice in mathematics. Excellent performance in languages.',
    overall_percentage: 75,
    discipline_score: 4,
    participation_score: 3
  },
  {
    month: 'July',
    year: 2025,
    teacher_comments: 'Settling into the new academic year well. Shows willingness to learn and improve.',
    overall_percentage: 73,
    discipline_score: 4,
    participation_score: 3
  }
];

export default function TeacherCommentsTimeline({ comments = defaultComments, studentId }: TeacherCommentsTimelineProps) {
  // Ensure comments is always an array
  const safeComments = comments || defaultComments;
  
  // Sort comments by date (most recent first)
  const sortedComments = [...safeComments].sort((a, b) => {
    const dateA = new Date(`${a.month} 1, ${a.year}`);
    const dateB = new Date(`${b.month} 1, ${b.year}`);
    return dateB.getTime() - dateA.getTime();
  });

  // Get sentiment icon based on performance
  const getSentimentIcon = (percentage: number) => {
    if (percentage >= 85) {
      return (
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      );
    } else if (percentage >= 70) {
      return (
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      );
    } else if (percentage >= 60) {
      return (
        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      );
    }
  };

  // Get background color based on performance
  const getBackgroundColor = (percentage: number) => {
    if (percentage >= 85) return 'bg-green-50 border-green-200';
    if (percentage >= 70) return 'bg-blue-50 border-blue-200';
    if (percentage >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">
          Teacher Comments Timeline
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Monthly feedback and observations
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {sortedComments.map((comment, index) => (
          <div key={index} className="relative">
            {/* Timeline line */}
            {index < sortedComments.length - 1 && (
              <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-gray-200"></div>
            )}

            {/* Comment card */}
            <div className="flex gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 relative z-10">
                {getSentimentIcon(comment.overall_percentage)}
              </div>

              {/* Content */}
              <div className={`flex-1 rounded-lg border-2 p-4 ${getBackgroundColor(comment.overall_percentage)}`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {comment.month} {comment.year}
                    </h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span className="font-medium">{comment.overall_percentage}%</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="font-medium">Discipline: {comment.discipline_score}/5</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="font-medium">Participation: {comment.participation_score}/5</span>
                      </span>
                    </div>
                  </div>

                  {/* Badge */}
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-semibold
                    ${comment.overall_percentage >= 85 ? 'bg-green-200 text-green-800' :
                      comment.overall_percentage >= 70 ? 'bg-blue-200 text-blue-800' :
                      comment.overall_percentage >= 60 ? 'bg-yellow-200 text-yellow-800' :
                      'bg-red-200 text-red-800'}
                  `}>
                    {comment.overall_percentage >= 85 ? 'Excellent' :
                     comment.overall_percentage >= 70 ? 'Good' :
                     comment.overall_percentage >= 60 ? 'Average' :
                     'Needs Improvement'}
                  </span>
                </div>

                {/* Comment text */}
                <div className="bg-white bg-opacity-70 rounded-lg p-3 border border-gray-200">
                  <div className="flex gap-2">
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-700 italic">
                      "{comment.teacher_comments}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedComments.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p>No teacher comments available yet.</p>
        </div>
      )}

      {/* Summary */}
      {sortedComments.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            Overall Feedback Summary
          </h4>
          <p className="text-sm text-gray-700">
            {sortedComments.length} months of recorded feedback • 
            Average Performance: {(sortedComments.reduce((sum, c) => sum + c.overall_percentage, 0) / sortedComments.length).toFixed(1)}% • 
            Average Discipline: {(sortedComments.reduce((sum, c) => sum + c.discipline_score, 0) / sortedComments.length).toFixed(1)}/5.0 • 
            Average Participation: {(sortedComments.reduce((sum, c) => sum + c.participation_score, 0) / sortedComments.length).toFixed(1)}/5.0
          </p>
        </div>
      )}
    </div>
  );
}
