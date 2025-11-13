'use client';
import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

export default function PrincipalResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedTerm, setSelectedTerm] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchStudent, setSearchStudent] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'analytics'>('analytics');

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const response = await fetch('/data/results_termwise.csv');
      const csvText = await response.text();
      const parsed = Papa.parse<any>(csvText, { header: true, dynamicTyping: true });
      
      const cleanedResults = parsed.data.filter((r: any) => r.studentId && r.studentName);
      setResults(cleanedResults);
      setFilteredResults(cleanedResults);
      setLoading(false);
    } catch (error) {
      console.error('Error loading results:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...results];
    if (selectedClass !== 'all') filtered = filtered.filter(r => r.class === selectedClass);
    if (selectedTerm !== 'all') filtered = filtered.filter(r => r.term === selectedTerm);
    if (selectedSubject !== 'all') filtered = filtered.filter(r => r.subject === selectedSubject);
    if (selectedStatus !== 'all') filtered = filtered.filter(r => r.publish_status === selectedStatus);
    if (searchStudent.trim()) {
      filtered = filtered.filter(r => 
        r.studentName.toLowerCase().includes(searchStudent.toLowerCase()) ||
        r.studentId.toLowerCase().includes(searchStudent.toLowerCase())
      );
    }
    setFilteredResults(filtered);
  }, [selectedClass, selectedTerm, selectedSubject, selectedStatus, searchStudent, results]);

  const classes = ['all', ...Array.from(new Set(results.map(r => r.class)))].filter(Boolean);
  const terms = ['all', ...Array.from(new Set(results.map(r => r.term)))].filter(Boolean);
  const subjects = ['all', ...Array.from(new Set(results.map(r => r.subject)))].filter(Boolean);
  const statuses = ['all', 'Published', 'Draft'];

  const stats = {
    total: filteredResults.length,
    published: filteredResults.filter(r => r.publish_status === 'Published').length,
    draft: filteredResults.filter(r => r.publish_status === 'Draft').length,
    avgPercentage: filteredResults.length > 0 
      ? (filteredResults.reduce((sum, r) => sum + r.percentage, 0) / filteredResults.length).toFixed(1)
      : '0',
    gradeA: filteredResults.filter(r => r.grade === 'A+' || r.grade === 'A').length,
    gradeB: filteredResults.filter(r => r.grade === 'B+' || r.grade === 'B').length,
    gradeC: filteredResults.filter(r => r.grade === 'C').length,
    gradeF: filteredResults.filter(r => r.grade === 'D' || r.grade === 'F').length,
  };

  // Chart Data Preparation
  const gradeData = [
    { name: 'A Grade', value: stats.gradeA, color: '#10b981' },
    { name: 'B Grade', value: stats.gradeB, color: '#3b82f6' },
    { name: 'C Grade', value: stats.gradeC, color: '#f59e0b' },
    { name: 'D/F Grade', value: stats.gradeF, color: '#ef4444' },
  ];

  // Class-wise performance
  const classPerformance = classes.filter(c => c !== 'all').map(className => {
    const classResults = filteredResults.filter(r => r.class === className);
    return {
      class: className,
      avgScore: classResults.length > 0 ? 
        (classResults.reduce((sum, r) => sum + r.percentage, 0) / classResults.length).toFixed(1) : 0,
      students: new Set(classResults.map(r => r.studentId)).size,
      results: classResults.length
    };
  });

  // Subject-wise performance
  const subjectPerformance = subjects.filter(s => s !== 'all').map(subject => {
    const subjectResults = filteredResults.filter(r => r.subject === subject);
    return {
      subject: subject.substring(0, 10),
      avgScore: subjectResults.length > 0 ?
        parseFloat((subjectResults.reduce((sum, r) => sum + r.percentage, 0) / subjectResults.length).toFixed(1)) : 0,
      count: subjectResults.length
    };
  }).sort((a, b) => b.avgScore - a.avgScore);

  // Term-wise trend
  const termTrend = terms.filter(t => t !== 'all').map(term => {
    const termResults = filteredResults.filter(r => r.term === term);
    return {
      term,
      avgScore: termResults.length > 0 ?
        parseFloat((termResults.reduce((sum, r) => sum + r.percentage, 0) / termResults.length).toFixed(1)) : 0,
      results: termResults.length
    };
  });

  // Top/Bottom performers
  const topPerformers = [...filteredResults]
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);
  
  const bottomPerformers = [...filteredResults]
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">📊 Results Analytics</h1>
              <p className="text-sm text-gray-600 mt-1">Interactive statistical insights</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setViewMode('analytics')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  viewMode === 'analytics' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                📊 Analytics
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                📋 Data Grid
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow p-4 text-white">
            <div className="text-sm opacity-90">Total Results</div>
            <div className="text-3xl font-bold">{stats.total}</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-4 text-white">
            <div className="text-sm opacity-90">Published</div>
            <div className="text-3xl font-bold">{stats.published}</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow p-4 text-white">
            <div className="text-sm opacity-90">Draft</div>
            <div className="text-3xl font-bold">{stats.draft}</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-4 text-white">
            <div className="text-sm opacity-90">Avg Score</div>
            <div className="text-3xl font-bold">{stats.avgPercentage}%</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow p-4 text-white">
            <div className="text-sm opacity-90">Grade A</div>
            <div className="text-3xl font-bold">{stats.gradeA}</div>
          </div>
          <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg shadow p-4 text-white">
            <div className="text-sm opacity-90">Grade B</div>
            <div className="text-3xl font-bold">{stats.gradeB}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🔍 Filters (Charts update dynamically)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                {classes.map(c => <option key={c} value={c}>{c === 'all' ? 'All Classes' : `Class ${c}`}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Term</label>
              <select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                {terms.map(t => <option key={t} value={t}>{t === 'all' ? 'All Terms' : t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                {subjects.map(s => <option key={s} value={s}>{s === 'all' ? 'All Subjects' : s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                {statuses.map(s => <option key={s} value={s}>{s === 'all' ? 'All Status' : s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Student</label>
              <input type="text" value={searchStudent} onChange={(e) => setSearchStudent(e.target.value)}
                placeholder="Name or ID..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"/>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredResults.length}</span> of <span className="font-semibold">{results.length}</span> results
            </div>
            <button onClick={() => {
                setSelectedClass('all'); setSelectedTerm('all'); setSelectedSubject('all');
                setSelectedStatus('all'); setSearchStudent('');
              }} className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition">
              Reset All Filters
            </button>
          </div>
        </div>

        {viewMode === 'analytics' ? (
          <div className="space-y-6">
            {/* Grade Distribution Pie Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Grade Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={gradeData} cx="50%" cy="50%" labelLine={false}
                    label={({name, value}) => `${name}: ${value}`} outerRadius={100} fill="#8884d8" dataKey="value">
                    {gradeData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Class Performance Bar Chart */}
            {classPerformance.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Class-wise Average Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={classPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="class" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="avgScore" fill="#8b5cf6" name="Average Score %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Subject Performance Bar Chart */}
            {subjectPerformance.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Subject-wise Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectPerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="subject" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="avgScore" fill="#3b82f6" name="Average Score %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Term Trend Line Chart */}
            {termTrend.length > 1 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Trend Across Terms</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={termTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="term" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="avgScore" stroke="#10b981" strokeWidth={3} name="Average Score %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Top & Bottom Performers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🏆 Top 5 Performers</h3>
                <div className="space-y-3">
                  {topPerformers.map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                          i===0 ? 'bg-yellow-500' : i===1 ? 'bg-gray-400' : i===2 ? 'bg-orange-600' : 'bg-green-500'
                        }`}>{i+1}</div>
                        <div>
                          <div className="font-semibold">{r.studentName}</div>
                          <div className="text-xs text-gray-600">{r.subject} • {r.term}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{r.percentage.toFixed(1)}%</div>
                        <div className="text-xs text-gray-500">{r.grade}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📉 Needs Attention (Bottom 5)</h3>
                <div className="space-y-3">
                  {bottomPerformers.map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <div className="font-semibold">{r.studentName}</div>
                        <div className="text-xs text-gray-600">{r.subject} • {r.term}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-red-600">{r.percentage.toFixed(1)}%</div>
                        <div className="text-xs text-gray-500">{r.grade}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Data Grid */
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Term</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Theory</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Practical</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">%</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredResults.length === 0 ? (
                    <tr><td colSpan={10} className="px-4 py-8 text-center text-gray-500">No results found.</td></tr>
                  ) : (
                    filteredResults.map((result, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{result.studentName}</div>
                          <div className="text-xs text-gray-500">{result.studentId}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{result.class}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{result.term}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{result.subject}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{result.theory_marks}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{result.practical_marks}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{result.total_marks}/{result.max_marks}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-sm font-semibold text-purple-600">{result.percentage.toFixed(1)}%</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            result.grade === 'A+' || result.grade === 'A' ? 'bg-green-100 text-green-800' :
                            result.grade === 'B+' || result.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                            result.grade === 'C' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}>{result.grade}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            result.publish_status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                          }`}>{result.publish_status}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
