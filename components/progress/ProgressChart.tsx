'use client';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

interface ProgressChartProps {
  studentId: string;
  showAttendance?: boolean;
  height?: number;
}

const defaultProgressData = [
  { month: 'January', year: 2025, overall_percentage: 75, attendance: 92 },
  { month: 'February', year: 2025, overall_percentage: 78, attendance: 94 },
  { month: 'March', year: 2025, overall_percentage: 82, attendance: 91 },
  { month: 'April', year: 2025, overall_percentage: 85, attendance: 95 },
  { month: 'May', year: 2025, overall_percentage: 83, attendance: 93 },
  { month: 'June', year: 2025, overall_percentage: 87, attendance: 96 },
];

export default function ProgressChart({ 
  studentId, 
  showAttendance = true, 
  height = 300 
}: ProgressChartProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgressData();
  }, [studentId]);

  const loadProgressData = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setData(defaultProgressData);
      setLoading(false);
    } catch (err) {
      console.error('Error loading progress data:', err);
      setData(defaultProgressData);
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSkeleton.Card />;
  }

  const chartData = (data || defaultProgressData).map(item => ({
    name: `${item.month.substring(0, 3)} ${item.year}`,
    'Performance': item.overall_percentage,
    'Attendance': showAttendance ? item.attendance : undefined,
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Progress</h3>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Performance" stroke="#8b5cf6" strokeWidth={2} />
          {showAttendance && (
            <Line type="monotone" dataKey="Attendance" stroke="#10b981" strokeWidth={2} />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
