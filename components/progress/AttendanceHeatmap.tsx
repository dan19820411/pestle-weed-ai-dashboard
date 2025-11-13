'use client';

import React from 'react';

interface AttendanceRecord {
  date: string;
  status: 'Present' | 'Absent' | 'Late';
  time_in?: string;
  reason?: string;
}

interface AttendanceHeatmapProps {
  data?: AttendanceRecord[];
  studentId?: string;
  daysToShow?: number;
}

// Default attendance data (last 60 days)
const generateDefaultAttendance = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const today = new Date();
  
  for (let i = 0; i < 60; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Skip weekends
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;
    
    // 90% present, 5% late, 5% absent
    const rand = Math.random();
    let status: 'Present' | 'Absent' | 'Late';
    let time_in: string | undefined;
    let reason: string | undefined;
    
    if (rand < 0.90) {
      status = 'Present';
      time_in = '08:00 AM';
    } else if (rand < 0.95) {
      status = 'Late';
      time_in = '08:30 AM';
      reason = 'Traffic delay';
    } else {
      status = 'Absent';
      reason = 'Medical leave';
    }
    
    records.push({
      date: date.toISOString().split('T')[0],
      status,
      time_in,
      reason
    });
  }
  
  return records;
};

const defaultAttendanceData = generateDefaultAttendance();

export default function AttendanceHeatmap({ data = defaultAttendanceData, studentId, daysToShow = 60 }: AttendanceHeatmapProps) {
  // Ensure data is always an array
  const safeData = data || defaultAttendanceData;
  
  // Get last N days of attendance
  const sortedData = [...safeData].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, daysToShow);

  // Calculate statistics
  const totalDays = sortedData.length;
  const presentCount = sortedData.filter(d => d.status === 'Present').length;
  const lateCount = sortedData.filter(d => d.status === 'Late').length;
  const absentCount = sortedData.filter(d => d.status === 'Absent').length;
  const attendanceRate = totalDays > 0 ? ((presentCount + lateCount) / totalDays * 100).toFixed(1) : '0.0';

  // Get color for status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present':
        return 'bg-green-500 hover:bg-green-600';
      case 'Late':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'Absent':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-200';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present':
        return '✓';
      case 'Late':
        return '⏰';
      case 'Absent':
        return '✗';
      default:
        return '?';
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Get day name
  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { weekday: 'short' });
  };

  // Group data by weeks
  const groupByWeeks = () => {
    const weeks: AttendanceRecord[][] = [];
    let currentWeek: AttendanceRecord[] = [];
    
    sortedData.reverse().forEach((record, index) => {
      currentWeek.push(record);
      if (currentWeek.length === 7 || index === sortedData.length - 1) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });
    
    return weeks;
  };

  const weeks = groupByWeeks();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Attendance Pattern (Last {daysToShow} Days)
        </h3>
        
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs font-semibold text-gray-600 uppercase mb-1">
              Attendance Rate
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {attendanceRate}%
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-xs font-semibold text-green-700 uppercase mb-1">
              Present
            </div>
            <div className="text-2xl font-bold text-green-600">
              {presentCount}
            </div>
            <div className="text-xs text-green-600">
              {totalDays > 0 ? ((presentCount / totalDays) * 100).toFixed(0) : 0}% of days
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-3">
            <div className="text-xs font-semibold text-yellow-700 uppercase mb-1">
              Late
            </div>
            <div className="text-2xl font-bold text-yellow-600">
              {lateCount}
            </div>
            <div className="text-xs text-yellow-600">
              {totalDays > 0 ? ((lateCount / totalDays) * 100).toFixed(0) : 0}% of days
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-3">
            <div className="text-xs font-semibold text-red-700 uppercase mb-1">
              Absent
            </div>
            <div className="text-2xl font-bold text-red-600">
              {absentCount}
            </div>
            <div className="text-xs text-red-600">
              {totalDays > 0 ? ((absentCount / totalDays) * 100).toFixed(0) : 0}% of days
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Heatmap */}
      <div className="mb-4">
        <div className="flex items-center gap-6 text-xs text-gray-600 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span>Late</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Absent</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="space-y-2">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex gap-2">
              {week.map((record, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`
                    group relative flex-1 h-16 rounded-lg
                    ${getStatusColor(record.status)}
                    transition-all duration-200 cursor-pointer
                    flex flex-col items-center justify-center
                    text-white font-semibold
                  `}
                  title={`${formatDate(record.date)} - ${record.status}${record.reason ? ': ' + record.reason : ''}`}
                >
                  <div className="text-xs opacity-90">
                    {getDayName(record.date)}
                  </div>
                  <div className="text-lg">
                    {getStatusIcon(record.status)}
                  </div>
                  <div className="text-xs opacity-90">
                    {new Date(record.date).getDate()}
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    <div className="font-semibold">{formatDate(record.date)}</div>
                    <div>Status: {record.status}</div>
                    {record.time_in && <div>Time In: {record.time_in}</div>}
                    {record.reason && <div>Reason: {record.reason}</div>}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Absences */}
      {absentCount > 0 && (
        <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
          <h4 className="text-sm font-semibold text-red-900 mb-2">
            Recent Absences ({absentCount} days)
          </h4>
          <div className="space-y-2">
            {sortedData
              .filter(d => d.status === 'Absent')
              .slice(0, 5)
              .map((record, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{formatDate(record.date)}</span>
                  <span className="text-red-600 italic">
                    {record.reason || 'No reason provided'}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Performance Message */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-900">
          {parseFloat(attendanceRate) >= 90 ? (
            <>
              <span className="font-semibold">Excellent attendance!</span> Keep up the great work. 
              Consistent attendance is key to academic success.
            </>
          ) : parseFloat(attendanceRate) >= 80 ? (
            <>
              <span className="font-semibold">Good attendance.</span> Try to maintain above 90% 
              for optimal learning outcomes.
            </>
          ) : (
            <>
              <span className="font-semibold">Attendance needs improvement.</span> Regular 
              attendance is crucial for academic performance. Please ensure consistent presence.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
