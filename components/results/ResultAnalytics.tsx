'use client';

import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsData {
  classStats: {
    className: string;
    averagePercentage: number;
    totalStudents: number;
    passed: number;
    failed: number;
  }[];
  gradeDistribution: {
    grade: string;
    count: number;
    percentage: number;
  }[];
  subjectPerformance: {
    subject: string;
    average: number;
    highest: number;
    lowest: number;
  }[];
  termComparison?: {
    term: string;
    average: number;
  }[];
}

interface ResultAnalyticsProps {
  data?: AnalyticsData;
  results?: any[];
  selectedClass?: string;
  selectedTerm?: string;
}

// Default analytics data
const defaultAnalyticsData: AnalyticsData = {
  classStats: [
    { className: 'Class 10-A', averagePercentage: 82.5, totalStudents: 30, passed: 28, failed: 2 },
    { className: 'Class 10-B', averagePercentage: 78.3, totalStudents: 28, passed: 25, failed: 3 },
    { className: 'Class 9-A', averagePercentage: 85.1, totalStudents: 25, passed: 24, failed: 1 },
  ],
  gradeDistribution: [
    { grade: 'A+', count: 8, percentage: 20 },
    { grade: 'A', count: 12, percentage: 30 },
    { grade: 'B+', count: 10, percentage: 25 },
    { grade: 'B', count: 6, percentage: 15 },
    { grade: 'C', count: 3, percentage: 7.5 },
    { grade: 'D', count: 1, percentage: 2.5 },
  ],
  subjectPerformance: [
    { subject: 'Mathematics', average: 82.5, highest: 98, lowest: 62 },
    { subject: 'Science', average: 78.2, highest: 95, lowest: 58 },
    { subject: 'English', average: 85.8, highest: 96, lowest: 65 },
    { subject: 'Hindi', average: 75.4, highest: 92, lowest: 55 },
    { subject: 'Social Studies', average: 80.1, highest: 94, lowest: 60 },
  ],
  termComparison: [
    { term: 'Term 1', average: 78.5 },
    { term: 'Term 2', average: 82.3 },
  ]
};

export default function ResultAnalytics({ data, results, selectedClass = 'All', selectedTerm = 'Term1' }: ResultAnalyticsProps) {
  // Use provided data or convert results or use default
  let analyticsData = data || defaultAnalyticsData;
  
  // If results array is provided but not data, convert results to analytics data
  if (!data && results && results.length > 0) {
    // Calculate grade distribution
    const gradeCount: { [key: string]: number } = {};
    results.forEach(r => {
      const grade = r.grade || 'N/A';
      gradeCount[grade] = (gradeCount[grade] || 0) + 1;
    });
    
    const gradeDistribution = Object.keys(gradeCount)
      .sort()
      .map(grade => ({
        grade,
        count: gradeCount[grade],
        percentage: (gradeCount[grade] / results.length) * 100
      }));
    
    // Calculate class-wise statistics
    const classCounts: { [key: string]: { total: number; sum: number; passed: number; failed: number } } = {};
    results.forEach(r => {
      const className = r.class || 'Unknown';
      if (!classCounts[className]) {
        classCounts[className] = { total: 0, sum: 0, passed: 0, failed: 0 };
      }
      classCounts[className].total += 1;
      classCounts[className].sum += parseFloat(r.percentage) || 0;
      if ((parseFloat(r.percentage) || 0) >= 40) {
        classCounts[className].passed += 1;
      } else {
        classCounts[className].failed += 1;
      }
    });
    
    const classStats = Object.keys(classCounts).map(className => ({
      className: `Class ${className}`,
      averagePercentage: classCounts[className].sum / classCounts[className].total,
      totalStudents: classCounts[className].total,
      passed: classCounts[className].passed,
      failed: classCounts[className].failed
    }));
    
    // Calculate subject-wise statistics
    const subjectStats: { [key: string]: { sum: number; count: number; highest: number; lowest: number } } = {};
    results.forEach(r => {
      const subject = r.subject || 'Unknown';
      const percentage = parseFloat(r.percentage) || 0;
      if (!subjectStats[subject]) {
        subjectStats[subject] = { sum: 0, count: 0, highest: 0, lowest: 100 };
      }
      subjectStats[subject].sum += percentage;
      subjectStats[subject].count += 1;
      subjectStats[subject].highest = Math.max(subjectStats[subject].highest, percentage);
      subjectStats[subject].lowest = Math.min(subjectStats[subject].lowest, percentage);
    });
    
    const subjectPerformance = Object.keys(subjectStats).map(subject => ({
      subject,
      average: subjectStats[subject].sum / subjectStats[subject].count,
      highest: subjectStats[subject].highest,
      lowest: subjectStats[subject].lowest
    }));
    
    analyticsData = {
      classStats: classStats.length > 0 ? classStats : defaultAnalyticsData.classStats,
      gradeDistribution,
      subjectPerformance: subjectPerformance.length > 0 ? subjectPerformance : defaultAnalyticsData.subjectPerformance,
      termComparison: defaultAnalyticsData.termComparison
    };
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

  // Calculate overall statistics
  const totalStudents = analyticsData.classStats.reduce((sum, c) => sum + c.totalStudents, 0);
  const totalPassed = analyticsData.classStats.reduce((sum, c) => sum + c.passed, 0);
  const totalFailed = analyticsData.classStats.reduce((sum, c) => sum + c.failed, 0);
  const overallPassPercentage = totalStudents > 0 ? ((totalPassed / totalStudents) * 100).toFixed(1) : '0';
  const overallAverage = analyticsData.classStats.length > 0
    ? (analyticsData.classStats.reduce((sum, c) => sum + c.averagePercentage, 0) / analyticsData.classStats.length).toFixed(1)
    : '0';

  // Find best and worst performing classes
  const sortedClasses = [...analyticsData.classStats].sort((a, b) => b.averagePercentage - a.averagePercentage);
  const bestClass = sortedClasses[0];
  const worstClass = sortedClasses[sortedClasses.length - 1];

  // Find best and worst performing subjects
  const sortedSubjects = [...analyticsData.subjectPerformance].sort((a, b) => b.average - a.average);
  const bestSubject = sortedSubjects[0];
  const worstSubject = sortedSubjects[sortedSubjects.length - 1];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{payload[0].payload.name || payload[0].name}</p>
          <p className="text-sm text-gray-600">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium opacity-90">Total Students</div>
            <svg className="w-8 h-8 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div className="text-4xl font-bold">{totalStudents}</div>
          <div className="text-sm mt-2 opacity-90">Appeared in {selectedTerm}</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium opacity-90">Pass Percentage</div>
            <svg className="w-8 h-8 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-4xl font-bold">{overallPassPercentage}%</div>
          <div className="text-sm mt-2 opacity-90">{totalPassed} passed • {totalFailed} failed</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium opacity-90">Overall Average</div>
            <svg className="w-8 h-8 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="text-4xl font-bold">{overallAverage}%</div>
          <div className="text-sm mt-2 opacity-90">Across all subjects</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium opacity-90">Best Performer</div>
            <svg className="w-8 h-8 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div className="text-2xl font-bold">{bestClass?.className}</div>
          <div className="text-sm mt-2 opacity-90">{bestClass?.averagePercentage.toFixed(1)}% average</div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class-wise Performance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Class-wise Performance</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={analyticsData.classStats} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="className" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="averagePercentage" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grade Distribution Pie */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Grade Distribution</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={analyticsData.gradeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ grade, percentage }) => `${grade}: ${percentage.toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {analyticsData.gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={gradeColors[entry.grade]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {analyticsData.gradeDistribution.map((item) => (
              <div key={item.grade} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: gradeColors[item.grade] }}></div>
                <span className="text-xs text-gray-600">{item.grade}: {item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subject Performance */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Subject-wise Performance Analysis</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Highest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lowest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedSubjects.map((subject, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{subject.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-blue-600">{subject.average.toFixed(1)}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-green-600">{subject.highest}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-red-600">{subject.lowest}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${subject.average >= 75 ? 'bg-green-500' : subject.average >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${subject.average}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{subject.average >= 75 ? 'Good' : subject.average >= 60 ? 'Average' : 'Needs Attention'}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h4 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Strengths
          </h4>
          <ul className="space-y-2">
            <li className="text-sm text-green-700">
              <strong>{bestClass?.className}</strong> shows excellent performance with {bestClass?.averagePercentage.toFixed(1)}% average
            </li>
            <li className="text-sm text-green-700">
              <strong>{bestSubject?.subject}</strong> has the highest average score of {bestSubject?.average.toFixed(1)}%
            </li>
            <li className="text-sm text-green-700">
              Pass percentage of {overallPassPercentage}% indicates strong overall understanding
            </li>
          </ul>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h4 className="text-lg font-bold text-orange-800 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Areas for Improvement
          </h4>
          <ul className="space-y-2">
            <li className="text-sm text-orange-700">
              <strong>{worstClass?.className}</strong> needs attention with {worstClass?.averagePercentage.toFixed(1)}% average
            </li>
            <li className="text-sm text-orange-700">
              <strong>{worstSubject?.subject}</strong> requires focus with {worstSubject?.average.toFixed(1)}% average
            </li>
            <li className="text-sm text-orange-700">
              {totalFailed} students need remedial support and personalized attention
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
