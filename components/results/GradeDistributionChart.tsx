'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface GradeDistributionChartProps {
  data?: { grade: string; count: number; percentage: number }[];
  results?: any[]; // Array of result objects from the API
  title?: string;
}

// Default data
const defaultGradeData = [
  { grade: 'A+', count: 8, percentage: 20 },
  { grade: 'A', count: 12, percentage: 30 },
  { grade: 'B+', count: 10, percentage: 25 },
  { grade: 'B', count: 6, percentage: 15 },
  { grade: 'C', count: 3, percentage: 7.5 },
  { grade: 'D', count: 1, percentage: 2.5 },
];

export default function GradeDistributionChart({ data, results, title = 'Grade Distribution' }: GradeDistributionChartProps) {
  // If results prop is provided, convert it to grade distribution data
  let chartDataSource = data || defaultGradeData;
  
  if (results && results.length > 0) {
    // Calculate grade distribution from results
    const gradeCounts: { [key: string]: number } = {};
    results.forEach(r => {
      const grade = r.grade || 'N/A';
      gradeCounts[grade] = (gradeCounts[grade] || 0) + 1;
    });
    
    const totalCount = results.length;
    chartDataSource = Object.keys(gradeCounts)
      .sort()
      .map(grade => ({
        grade,
        count: gradeCounts[grade],
        percentage: (gradeCounts[grade] / totalCount) * 100
      }));
  }
  const gradeColors: { [key: string]: string } = {
    'A+': '#10b981',
    'A': '#3b82f6',
    'B+': '#8b5cf6',
    'B': '#f59e0b',
    'C': '#ef4444',
    'D': '#991b1b',
    'F': '#450a0a',
  };

  const chartData = chartDataSource.map(item => ({
    grade: item.grade,
    count: item.count,
    percentage: item.percentage,
    fill: gradeColors[item.grade] || '#6b7280',
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{payload[0].payload.grade}</p>
          <p className="text-sm text-gray-600">Count: {payload[0].value}</p>
          <p className="text-sm text-gray-600">Percentage: {payload[0].payload.percentage.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="grade" stroke="#6b7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} label={{ value: 'Number of Students', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-3 md:grid-cols-7 gap-2">
        {chartDataSource.map(item => (
          <div key={item.grade} className="text-center p-2 rounded" style={{ backgroundColor: gradeColors[item.grade] + '20' }}>
            <div className="text-xs font-semibold text-gray-600">{item.grade}</div>
            <div className="text-lg font-bold" style={{ color: gradeColors[item.grade] }}>{item.count}</div>
            <div className="text-xs text-gray-600">{item.percentage.toFixed(1)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
