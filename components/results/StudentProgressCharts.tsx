'use client';
import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface Result {
  studentId: string;
  studentName: string;
  class: string;
  term: string;
  subject: string;
  theory_marks: number;
  practical_marks: number;
  total_marks: number;
  max_marks: number;
  percentage: number;
  grade: string;
  teacher_remarks: string;
  publish_status: string;
}

interface ProgressData {
  studentId: string;
  studentName: string;
  month: string;
  year: string;
  overall_percentage: number;
  attendance: number;
  discipline_score: number;
  participation_score: number;
  teacher_comments: string;
}

interface StudentProgressChartsProps {
  results: Result[];
  progressData: ProgressData[];
  studentName: string;
}

const COLORS = {
  primary: '#9333ea',
  secondary: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#06b6d4',
};

const GRADE_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#64748b'];

export default function StudentProgressCharts({ results, progressData, studentName }: StudentProgressChartsProps) {
  
  // 1. Term-wise Average Performance
  const termPerformanceData = useMemo(() => {
    const terms = [...new Set(results.map(r => r.term))].sort();
    return terms.map(term => {
      const termResults = results.filter(r => r.term === term);
      const avgPercentage = termResults.reduce((sum, r) => sum + r.percentage, 0) / termResults.length;
      const totalMarks = termResults.reduce((sum, r) => sum + r.total_marks, 0);
      const maxMarks = termResults.reduce((sum, r) => sum + r.max_marks, 0);
      
      return {
        term,
        'Average %': parseFloat(avgPercentage.toFixed(1)),
        'Total Score': totalMarks,
        'Max Score': maxMarks,
        'Subjects': termResults.length
      };
    });
  }, [results]);

  // 2. Subject-wise Performance Comparison (all terms)
  const subjectComparisonData = useMemo(() => {
    const subjects = [...new Set(results.map(r => r.subject))];
    const terms = [...new Set(results.map(r => r.term))].sort();
    
    return subjects.map(subject => {
      const subjectData: any = { subject };
      terms.forEach(term => {
        const result = results.find(r => r.subject === subject && r.term === term);
        if (result) {
          subjectData[term] = result.percentage;
        }
      });
      return subjectData;
    });
  }, [results]);

  // 3. Monthly Progress Trend (from progress history)
  const monthlyProgressData = useMemo(() => {
    return progressData.map(p => ({
      month: `${p.month.substring(0, 3)} ${p.year}`,
      'Performance': p.overall_percentage,
      'Attendance': p.attendance,
      'Discipline': p.discipline_score * 20, // Scale to 100
      'Participation': p.participation_score * 20 // Scale to 100
    }));
  }, [progressData]);

  // 4. Radar Chart for Holistic Performance (latest month)
  const holisticData = useMemo(() => {
    if (progressData.length === 0) return [];
    const latest = progressData[progressData.length - 1];
    return [
      { category: 'Academic', value: latest.overall_percentage },
      { category: 'Attendance', value: latest.attendance },
      { category: 'Discipline', value: latest.discipline_score * 20 },
      { category: 'Participation', value: latest.participation_score * 20 },
    ];
  }, [progressData]);

  // 5. Grade Distribution
  const gradeDistributionData = useMemo(() => {
    const gradeCounts: { [key: string]: number } = {};
    results.forEach(r => {
      gradeCounts[r.grade] = (gradeCounts[r.grade] || 0) + 1;
    });
    
    return Object.entries(gradeCounts)
      .map(([grade, count]) => ({ grade, count }))
      .sort((a, b) => {
        const gradeOrder = ['A+', 'A', 'B+', 'B', 'C', 'D', 'F'];
        return gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade);
      });
  }, [results]);

  // 6. Top and Bottom Performing Subjects
  const subjectPerformance = useMemo(() => {
    const subjectAvgs: { [key: string]: number[] } = {};
    results.forEach(r => {
      if (!subjectAvgs[r.subject]) subjectAvgs[r.subject] = [];
      subjectAvgs[r.subject].push(r.percentage);
    });

    return Object.entries(subjectAvgs)
      .map(([subject, percentages]) => ({
        subject,
        average: percentages.reduce((a, b) => a + b, 0) / percentages.length
      }))
      .sort((a, b) => b.average - a.average);
  }, [results]);

  const topSubjects = subjectPerformance.slice(0, 3);
  const bottomSubjects = subjectPerformance.slice(-3).reverse();

  // 7. Improvement Trend (comparing consecutive terms)
  const improvementData = useMemo(() => {
    const terms = [...new Set(results.map(r => r.term))].sort();
    const subjects = [...new Set(results.map(r => r.subject))];
    
    return subjects.map(subject => {
      const improvements: number[] = [];
      for (let i = 1; i < terms.length; i++) {
        const prev = results.find(r => r.subject === subject && r.term === terms[i-1]);
        const curr = results.find(r => r.subject === subject && r.term === terms[i]);
        if (prev && curr) {
          improvements.push(curr.percentage - prev.percentage);
        }
      }
      const avgImprovement = improvements.length > 0 
        ? improvements.reduce((a, b) => a + b, 0) / improvements.length 
        : 0;
      
      return {
        subject,
        improvement: parseFloat(avgImprovement.toFixed(2))
      };
    }).sort((a, b) => b.improvement - a.improvement);
  }, [results]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Performance Analytics - {studentName}
        </h2>
        <p className="text-gray-600">
          Comprehensive analysis of your academic journey with insights and trends
        </p>
      </div>

      {/* Key Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow p-6 border border-green-200">
          <h3 className="text-sm font-semibold text-green-800 mb-2">🏆 Top Performing Subject</h3>
          {topSubjects.length > 0 && (
            <>
              <p className="text-2xl font-bold text-green-900">{topSubjects[0].subject}</p>
              <p className="text-lg text-green-700">{topSubjects[0].average.toFixed(1)}% average</p>
            </>
          )}
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow p-6 border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">📈 Most Improved</h3>
          {improvementData.length > 0 && improvementData[0].improvement > 0 && (
            <>
              <p className="text-2xl font-bold text-blue-900">{improvementData[0].subject}</p>
              <p className="text-lg text-blue-700">+{improvementData[0].improvement.toFixed(1)}% growth</p>
            </>
          )}
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow p-6 border border-orange-200">
          <h3 className="text-sm font-semibold text-orange-800 mb-2">🎯 Focus Area</h3>
          {bottomSubjects.length > 0 && (
            <>
              <p className="text-2xl font-bold text-orange-900">{bottomSubjects[0].subject}</p>
              <p className="text-lg text-orange-700">{bottomSubjects[0].average.toFixed(1)}% average</p>
            </>
          )}
        </div>
      </div>

      {/* Term-wise Performance Trend */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Term-wise Performance Trend</h3>
        <p className="text-sm text-gray-600 mb-4">Track your overall performance across different terms</p>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={termPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="term" />
            <YAxis domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="Average %" 
              stroke={COLORS.primary} 
              fill={COLORS.primary} 
              fillOpacity={0.3}
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Subject-wise Comparison Across Terms */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">📚 Subject-wise Performance Comparison</h3>
        <p className="text-sm text-gray-600 mb-4">Compare your performance in each subject across terms</p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={subjectComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="subject" 
              angle={-45} 
              textAnchor="end" 
              height={100}
              interval={0}
            />
            <YAxis domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
            />
            <Legend />
            {termPerformanceData.map((term, index) => (
              <Bar 
                key={term.term} 
                dataKey={term.term} 
                fill={GRADE_COLORS[index % GRADE_COLORS.length]} 
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Progress (All Parameters) */}
      {monthlyProgressData.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📅 Monthly Progress Overview</h3>
          <p className="text-sm text-gray-600 mb-4">Holistic view of your performance, attendance, discipline and participation</p>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="Performance" 
                stroke={COLORS.primary} 
                strokeWidth={3} 
                dot={{ r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="Attendance" 
                stroke={COLORS.success} 
                strokeWidth={2} 
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="Discipline" 
                stroke={COLORS.info} 
                strokeWidth={2} 
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="Participation" 
                stroke={COLORS.warning} 
                strokeWidth={2} 
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Holistic Performance Radar */}
      {holisticData.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Holistic Performance Profile</h3>
          <p className="text-sm text-gray-600 mb-4">Your current standing across all performance parameters</p>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={holisticData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar 
                name="Performance" 
                dataKey="value" 
                stroke={COLORS.primary} 
                fill={COLORS.primary} 
                fillOpacity={0.6} 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Grade Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🎓 Grade Distribution</h3>
          <p className="text-sm text-gray-600 mb-4">Breakdown of grades across all subjects</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gradeDistributionData}
                dataKey="count"
                nameKey="grade"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => `${entry.grade}: ${entry.count}`}
              >
                {gradeDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={GRADE_COLORS[index % GRADE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Improvement Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📈 Subject Improvement</h3>
          <p className="text-sm text-gray-600 mb-4">Average improvement/decline per subject</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={improvementData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={['dataMin', 'dataMax']} />
              <YAxis type="category" dataKey="subject" width={120} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
                formatter={(value: any) => `${value > 0 ? '+' : ''}${value}%`}
              />
              <Bar dataKey="improvement" fill={COLORS.secondary}>
                {improvementData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.improvement >= 0 ? COLORS.success : COLORS.danger} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subject Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Subjects */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🏅 Top Performing Subjects</h3>
          <div className="space-y-3">
            {topSubjects.map((subject, index) => (
              <div key={subject.subject} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full font-bold">
                    {index + 1}
                  </span>
                  <span className="font-semibold text-gray-900">{subject.subject}</span>
                </div>
                <span className="text-lg font-bold text-green-600">{subject.average.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Areas Needing Focus */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Focus Areas</h3>
          <div className="space-y-3">
            {bottomSubjects.map((subject, index) => (
              <div key={subject.subject} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-orange-600 text-white rounded-full font-bold">
                    {index + 1}
                  </span>
                  <span className="font-semibold text-gray-900">{subject.subject}</span>
                </div>
                <span className="text-lg font-bold text-orange-600">{subject.average.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teacher Comments Timeline */}
      {progressData.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">💬 Teacher Comments Timeline</h3>
          <p className="text-sm text-gray-600 mb-4">Monthly feedback from your teachers</p>
          <div className="space-y-4">
            {progressData.slice(-6).reverse().map((data, index) => (
              <div key={index} className="flex gap-4 border-l-4 border-purple-600 pl-4 py-2">
                <div className="flex-shrink-0">
                  <div className="text-sm font-semibold text-purple-600">{data.month} {data.year}</div>
                  <div className="text-xs text-gray-500">{data.overall_percentage.toFixed(1)}% average</div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 italic">"{data.teacher_comments}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Items */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow p-6 text-white">
        <h3 className="text-xl font-bold mb-4">📋 Recommended Action Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bottomSubjects.length > 0 && (
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h4 className="font-semibold mb-2">🎯 Focus on weak areas</h4>
              <p className="text-sm opacity-90">
                Dedicate extra time to {bottomSubjects[0].subject} to improve your overall performance
              </p>
            </div>
          )}
          
          {improvementData.length > 0 && improvementData[0].improvement > 0 && (
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h4 className="font-semibold mb-2">💪 Maintain momentum</h4>
              <p className="text-sm opacity-90">
                Keep up the excellent work in {improvementData[0].subject} - you're showing great improvement!
              </p>
            </div>
          )}
          
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h4 className="font-semibold mb-2">📚 Balanced approach</h4>
            <p className="text-sm opacity-90">
              Try to maintain consistency across all subjects for holistic development
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h4 className="font-semibold mb-2">🤝 Seek help</h4>
            <p className="text-sm opacity-90">
              Don't hesitate to reach out to teachers for clarifications and guidance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
