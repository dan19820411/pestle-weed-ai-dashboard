import React from 'react';

interface StudentProfileCardProps {
  student: {
    id: string;
    name: string;
    class: string;
    rollNo?: string;
    age?: number;
    overallPerformance: number;
    attendance: number;
    disciplineScore: number;
    rank?: number;
  };
}

export default function StudentProfileCard({ student }: StudentProfileCardProps) {
  // Generate avatar from student name using DiceBear API
  const getAvatarUrl = (name: string) => {
    const seed = encodeURIComponent(name);
    return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=2563eb,7c3aed,db2777,059669,dc2626`;
  };

  // Get performance color
  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-600 bg-green-50';
    if (percentage >= 70) return 'text-blue-600 bg-blue-50';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  // Get attendance color
  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-start gap-6">
        {/* Student Avatar */}
        <div className="flex-shrink-0">
          <img
            src={getAvatarUrl(student.name)}
            alt={student.name}
            className="w-24 h-24 rounded-full border-4 border-blue-100"
          />
        </div>

        {/* Student Details */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {student.name}
              </h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <span className="font-semibold">ID:</span>
                  <span className="font-mono">{student.id}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-semibold">Class:</span>
                  <span>{student.class}</span>
                </span>
                {student.rollNo && (
                  <span className="flex items-center gap-1">
                    <span className="font-semibold">Roll No:</span>
                    <span>{student.rollNo}</span>
                  </span>
                )}
                {student.age && (
                  <span className="flex items-center gap-1">
                    <span className="font-semibold">Age:</span>
                    <span>{student.age} years</span>
                  </span>
                )}
              </div>
            </div>

            {/* Rank Badge */}
            {student.rank && (
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg px-4 py-2">
                <div className="text-xs font-semibold text-yellow-700 uppercase">
                  Class Rank
                </div>
                <div className="text-2xl font-bold text-yellow-900">
                  #{student.rank}
                </div>
              </div>
            )}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {/* Overall Performance */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-xs font-semibold text-gray-600 uppercase mb-1">
                Overall Performance
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-bold ${getPerformanceColor(student.overallPerformance).split(' ')[0]}`}>
                  {student.overallPerformance}%
                </span>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${getPerformanceColor(student.overallPerformance)}`}>
                  {student.overallPerformance >= 85 ? 'Excellent' : 
                   student.overallPerformance >= 70 ? 'Good' : 
                   student.overallPerformance >= 60 ? 'Average' : 'Needs Improvement'}
                </span>
              </div>
            </div>

            {/* Attendance */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-xs font-semibold text-gray-600 uppercase mb-1">
                Attendance
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-bold ${getAttendanceColor(student.attendance)}`}>
                  {student.attendance}%
                </span>
                <span className="text-xs text-gray-600">
                  {student.attendance >= 90 ? '(Excellent)' : 
                   student.attendance >= 80 ? '(Good)' : '(Poor)'}
                </span>
              </div>
            </div>

            {/* Discipline Score */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-xs font-semibold text-gray-600 uppercase mb-1">
                Discipline Score
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-purple-600">
                  {student.disciplineScore}
                </span>
                <span className="text-xl text-gray-400">/5.0</span>
              </div>
              <div className="mt-2">
                {/* Star rating visual */}
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${
                        star <= student.disciplineScore
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
