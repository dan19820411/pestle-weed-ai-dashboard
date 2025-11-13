'use client';
import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

export default function StudentResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTerm, setSelectedTerm] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'analytics' | 'list'>('analytics');
  
  const studentId = 'S001'; // In production, get from auth

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch('/data/results_termwise.csv');
      const csvText = await response.text();
      const parsed = Papa.parse<any>(csvText, { header: true, dynamicTyping: true });
      
      const studentResults = parsed.data.filter(
        (r: any) => r.studentId === studentId && r.publish_status === 'Published'
      ) as Result[];

      setResults(studentResults);
      setLoading(false);
    } catch (err) {
      console.error('Error loading data:', err);
      setLoading(false);
    }
  };

  const availableTerms = [...new Set(results.map(r => r.term))].sort();
  const filteredResults = results.filter(r => selectedTerm === 'all' || r.term === selectedTerm);

  const overallStats = {
    totalSubjects: filteredResults.length,
    averagePercentage: filteredResults.length > 0
      ? filteredResults.reduce((sum, r) => sum + r.percentage, 0) / filteredResults.length
      : 0,
    highestScore: filteredResults.length > 0 ? Math.max(...filteredResults.map(r => r.percentage)) : 0,
    lowestScore: filteredResults.length > 0 ? Math.min(...filteredResults.map(r => r.percentage)) : 0,
  };

  // Subject-wise Performance Comparison (All Terms)
  const subjectComparison = Array.from(new Set(results.map(r => r.subject))).map(subject => {
    const subjectResults = results.filter(r => r.subject === subject);
    const termData: any = { subject: subject.substring(0, 12) };
    
    availableTerms.forEach(term => {
      const termResult = subjectResults.find(r => r.term === term);
      termData[term] = termResult ? termResult.percentage : 0;
    });
    
    termData.avg = subjectResults.length > 0 
      ? subjectResults.reduce((sum, r) => sum + r.percentage, 0) / subjectResults.length 
      : 0;
    
    return termData;
  });

  // Term-wise Progress Trend
  const termProgress = availableTerms.map(term => {
    const termResults = results.filter(r => r.term === term);
    return {
      term,
      avgScore: termResults.length > 0 
        ? parseFloat((termResults.reduce((sum, r) => sum + r.percentage, 0) / termResults.length).toFixed(1))
        : 0,
      subjects: termResults.length,
      highest: termResults.length > 0 ? Math.max(...termResults.map(r => r.percentage)) : 0,
      lowest: termResults.length > 0 ? Math.min(...termResults.map(r => r.percentage)) : 0,
    };
  });

  // Subject Performance Radar (Current/Latest Term)
  const latestTerm = availableTerms[availableTerms.length - 1] || availableTerms[0];
  const radarData = results
    .filter(r => r.term === latestTerm)
    .map(r => ({
      subject: r.subject.substring(0, 10),
      score: r.percentage,
    }));

  // Strengths & Weaknesses
  const strengths = [...filteredResults].sort((a, b) => b.percentage - a.percentage).slice(0, 3);
  const weaknesses = [...filteredResults].sort((a, b) => a.percentage - b.percentage).slice(0, 3);

  // Grade Distribution
  const gradeDistribution = {
    'A': filteredResults.filter(r => r.grade === 'A+' || r.grade === 'A').length,
    'B': filteredResults.filter(r => r.grade === 'B+' || r.grade === 'B').length,
    'C': filteredResults.filter(r => r.grade === 'C').length,
    'D/F': filteredResults.filter(r => r.grade === 'D' || r.grade === 'F').length,
  };

  const gradeChartData = Object.entries(gradeDistribution).map(([grade, count]) => ({
    grade,
    count,
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-purple-600">🎓 My Results & Progress</h1>
            <div className="flex gap-3">
              <button
                onClick={() => setViewMode('analytics')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  viewMode === 'analytics' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}>
                📊 Analytics
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}>
                📋 Results List
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">My Academic Journey</h2>
          <p className="text-gray-600 mt-2">Track your progress and identify areas for improvement</p>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">View Term:</label>
            <select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
              <option value="all">All Terms</option>
              {availableTerms.map(term => <option key={term} value={term}>{term}</option>)}
            </select>
            <div className="ml-auto text-sm text-gray-600">
              Showing {filteredResults.length} results
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
            <h3 className="text-sm font-medium opacity-90 mb-2">Total Subjects</h3>
            <p className="text-3xl font-bold">{overallStats.totalSubjects}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
            <h3 className="text-sm font-medium opacity-90 mb-2">Average Score</h3>
            <p className="text-3xl font-bold">{overallStats.averagePercentage.toFixed(1)}%</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
            <h3 className="text-sm font-medium opacity-90 mb-2">Highest Score</h3>
            <p className="text-3xl font-bold">{overallStats.highestScore.toFixed(1)}%</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow p-6 text-white">
            <h3 className="text-sm font-medium opacity-90 mb-2">Lowest Score</h3>
            <p className="text-3xl font-bold">{overallStats.lowestScore.toFixed(1)}%</p>
          </div>
        </div>

        {viewMode === 'analytics' ? (
          <div className="space-y-6">
            {/* Performance Trend Over Terms */}
            {termProgress.length > 1 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📈 My Performance Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={termProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="term" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="avgScore" stroke="#8b5cf6" strokeWidth={3} name="Average Score" />
                    <Line type="monotone" dataKey="highest" stroke="#10b981" strokeWidth={2} name="Highest" />
                    <Line type="monotone" dataKey="lowest" stroke="#ef4444" strokeWidth={2} name="Lowest" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  {termProgress.map(t => (
                    <div key={t.term} className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-semibold text-gray-700">{t.term}</div>
                      <div className="text-2xl font-bold text-purple-600">{t.avgScore}%</div>
                      <div className="text-xs text-gray-500">{t.subjects} subjects</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Subject-wise Comparison Across Terms */}
            {subjectComparison.length > 0 && availableTerms.length > 1 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📚 Subject Performance Across Terms</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={subjectComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" angle={-45} textAnchor="end" height={100} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    {availableTerms.map((term, i) => (
                      <Bar key={term} dataKey={term} fill={`hsl(${i * 60}, 70%, 50%)`} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Current Performance Radar */}
            {radarData.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Current Performance Radar ({latestTerm})</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Grade Distribution */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎖️ My Grade Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={gradeChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="grade" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" name="Number of Subjects" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">💪 My Strengths</h3>
                <div className="space-y-3">
                  {strengths.map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-semibold text-gray-900">{r.subject}</div>
                        <div className="text-xs text-gray-600">{r.term} • Grade {r.grade}</div>
                      </div>
                      <div className="text-2xl font-bold text-green-600">{r.percentage.toFixed(1)}%</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📖 Areas to Improve</h3>
                <div className="space-y-3">
                  {weaknesses.map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <div className="font-semibold text-gray-900">{r.subject}</div>
                        <div className="text-xs text-gray-600">{r.term} • Grade {r.grade}</div>
                      </div>
                      <div className="text-2xl font-bold text-orange-600">{r.percentage.toFixed(1)}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Results List View */
          <div className="space-y-6">
            {filteredResults.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Available</h3>
                <p className="text-gray-600">Results will appear here once published</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredResults.map((result, i) => (
                  <div key={i} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-3 bg-purple-100 rounded-lg">
                          <svg className="h-7 w-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{result.subject}</h3>
                          <p className="text-sm text-gray-500">{result.term} • {result.class}</p>
                        </div>
                      </div>
                      <div className={`px-4 py-2 rounded-lg text-sm font-bold border-2 ${
                        result.grade === 'A+' || result.grade === 'A' ? 'text-green-600 bg-green-50 border-green-200' :
                        result.grade === 'B+' || result.grade === 'B' ? 'text-blue-600 bg-blue-50 border-blue-200' :
                        result.grade === 'C' ? 'text-yellow-600 bg-yellow-50 border-yellow-200' :
                        'text-orange-600 bg-orange-50 border-orange-200'
                      }`}>Grade {result.grade}</div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-xs text-blue-600 font-semibold mb-1">Theory</p>
                        <p className="text-xl font-bold text-blue-900">{result.theory_marks}</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-xs text-green-600 font-semibold mb-1">Practical</p>
                        <p className="text-xl font-bold text-green-900">{result.practical_marks}</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <p className="text-xs text-purple-600 font-semibold mb-1">Total</p>
                        <p className="text-xl font-bold text-purple-900">{result.total_marks}/{result.max_marks}</p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <p className="text-xs text-orange-600 font-semibold mb-1">Percentage</p>
                        <p className="text-xl font-bold text-orange-900">{result.percentage.toFixed(1)}%</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium text-gray-600">Performance</span>
                        <span className="text-xs font-bold text-gray-900">{result.percentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className={`h-3 rounded-full transition-all ${
                          result.percentage >= 90 ? 'bg-green-600' :
                          result.percentage >= 80 ? 'bg-green-500' :
                          result.percentage >= 70 ? 'bg-blue-500' :
                          result.percentage >= 60 ? 'bg-yellow-500' :
                          result.percentage >= 50 ? 'bg-orange-500' : 'bg-red-500'
                        }`} style={{ width: `${result.percentage}%` }}></div>
                      </div>
                    </div>

                    {result.teacher_remarks && (
                      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                        <p className="text-sm font-semibold text-blue-900 mb-1">Teacher's Remarks</p>
                        <p className="text-sm text-gray-700 italic">"{result.teacher_remarks}"</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
