'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  Users, 
  BarChart3, 
  FileText,
  CheckCircle,
  Clock,
  Trophy,
  AlertCircle
} from 'lucide-react';
import Papa from 'papaparse';

const attendanceData = [
  { day: 'Mon', attendance: 95, absent: 5 },
  { day: 'Tue', attendance: 92, absent: 8 },
  { day: 'Wed', attendance: 96, absent: 4 },
  { day: 'Thu', attendance: 94, absent: 6 },
  { day: 'Fri', attendance: 93, absent: 7 },
  { day: 'Sat', attendance: 97, absent: 3 },
];

const performanceData = [
  { subject: 'Math', avgScore: 85 },
  { subject: 'Science', avgScore: 78 },
  { subject: 'English', avgScore: 82 },
  { subject: 'History', avgScore: 76 },
  { subject: 'Geography', avgScore: 80 },
];

const gradeDistribution = [
  { grade: 'A+', count: 12, color: '#10b981' },
  { grade: 'A', count: 18, color: '#3b82f6' },
  { grade: 'B+', count: 15, color: '#8b5cf6' },
  { grade: 'B', count: 10, color: '#f59e0b' },
  { grade: 'C', count: 5, color: '#ef4444' },
];

export default function PrincipalDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [nepMetrics, setNepMetrics] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load NEP Compliance data
      try {
        const nepResponse = await fetch('/data/nep_compliance.csv');
        const nepText = await nepResponse.text();
        const nepParsed = Papa.parse(nepText, { header: true, dynamicTyping: true });
        setNepMetrics(nepParsed.data.filter((item: any) => item.category));
      } catch (err) {
        console.error('Error loading NEP data:', err);
      }

      // Load Alerts data
      try {
        const alertResponse = await fetch('/data/alerts.csv');
        const alertText = await alertResponse.text();
        const alertParsed = Papa.parse(alertText, { header: true, dynamicTyping: true });
        setAlerts(alertParsed.data.filter((a: any) => a.studentId && a.resolved === 'false'));
      } catch (err) {
        console.error('Error loading alerts:', err);
      }
      
      setStats({
        totalStudents: 60,
        presentToday: 57,
        attendanceRate: 95,
        pendingReports: 3,
        averagePerformance: 78.5,
        topPerformers: 12,
      });

      setLoading(false);
    } catch (err) {
      console.error('Error loading dashboard');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const onTrackMetrics = nepMetrics.filter(m => m.status === 'On Track');
  const criticalAlerts = alerts.filter(a => a.severity === 'High');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Principal Dashboard</h1>
          <p className="text-purple-100">Pestle Weed School - Overview & Analytics</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Students" value={stats?.totalStudents || 0} iconBg="blue" trend="+3 this semester">
            <Users className="h-6 w-6 text-white" />
          </StatCard>
          <StatCard title="Present Today" value={stats?.presentToday || 0} iconBg="green" trend={`${stats?.attendanceRate}% attendance rate`}>
            <CheckCircle className="h-6 w-6 text-white" />
          </StatCard>
          <StatCard title="Pending Reports" value={stats?.pendingReports || 0} iconBg="orange" trend="Due this week">
            <Clock className="h-6 w-6 text-white" />
          </StatCard>
          <StatCard title="Avg Performance" value={`${stats?.averagePerformance}%`} iconBg="purple" trend="+3.2% from last term">
            <BarChart3 className="h-6 w-6 text-white" />
          </StatCard>
          <StatCard title="Top Performers" value={stats?.topPerformers || 0} iconBg="green" trend="Above 85%">
            <Trophy className="h-6 w-6 text-white" />
          </StatCard>
          <StatCard title="Reports Generated" value="47" iconBg="blue" trend="This month">
            <FileText className="h-6 w-6 text-white" />
          </StatCard>
        </div>

        {/* NEP 2020 Compliance & Critical Alerts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* NEP 2020 Compliance Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                NEP 2020 Compliance
              </h2>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                {onTrackMetrics.length}/{nepMetrics.length} On Track
              </span>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {nepMetrics.slice(0, 6).map((metric, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex items-center gap-3 flex-1">
                    {metric.status === 'On Track' ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{metric.category}</p>
                      <p className="text-xs text-gray-500">{metric.metric}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{metric.currentValue}{metric.unit === 'percentage' ? '%' : ''}</p>
                    <p className="text-xs text-gray-500">Target: {metric.targetValue}</p>
                  </div>
                </div>
              ))}
            </div>
            {nepMetrics.length === 0 && (
              <p className="text-center text-gray-500 py-8">No NEP compliance data available</p>
            )}
          </div>

          {/* Critical Alerts Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-red-600" />
                Critical Alerts
              </h2>
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                {criticalAlerts.length} High
              </span>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {alerts.slice(0, 6).map((alert, idx) => (
                <div key={idx} className={`p-3 rounded-lg border-l-4 ${
                  alert.severity === 'High' ? 'border-red-500 bg-red-50' : 
                  alert.severity === 'Medium' ? 'border-yellow-500 bg-yellow-50' : 
                  'border-blue-500 bg-blue-50'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-gray-800 text-sm">{alert.studentName}</p>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      alert.severity === 'High' ? 'bg-red-200 text-red-800' : 
                      alert.severity === 'Medium' ? 'bg-yellow-200 text-yellow-800' : 
                      'bg-blue-200 text-blue-800'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.type} • {new Date(alert.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
            {alerts.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <p className="text-gray-600">No active alerts</p>
                <p className="text-sm text-gray-500">All students are doing well!</p>
              </div>
            )}
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Attendance Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="attendance" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Subject Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgScore" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grade Distribution & Quick Actions Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Grade Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={gradeDistribution} dataKey="count" nameKey="grade" cx="50%" cy="50%" outerRadius={100} label>
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <QuickActionButton title="View Attendance" description="Check today's attendance" href="/principal/reports/attendance" color="blue" />
              <QuickActionButton title="Generate Reports" description="Create custom reports" href="/principal/report-corner" color="green" />
              <QuickActionButton title="Student Results" description="Manage exam results & analytics" href="/principal/results" color="purple" />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <ActivityItem title="Attendance Report Generated" description="Daily attendance for Nov 12, 2025" time="2 hours ago" type="success" />
            <ActivityItem title="Class 10A Results Published" description="Term 1 results now available for students" time="5 hours ago" type="info" />
            <ActivityItem title="Fee Collection Report" description="October fee collection summary" time="Yesterday" type="success" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, iconBg, trend, children }: any) {
  const colorClasses: any = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[iconBg]}`}>
          {children}
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      <p className="text-xs text-gray-500">{trend}</p>
    </div>
  );
}

function QuickActionButton({ title, description, href, color }: any) {
  const colorClasses: any = {
    blue: 'hover:border-blue-500 hover:bg-blue-50',
    green: 'hover:border-green-500 hover:bg-green-50',
    purple: 'hover:border-purple-500 hover:bg-purple-50',
  };

  return (
    <Link href={href} className={`block p-4 border border-gray-200 rounded-lg ${colorClasses[color]} transition-all`}>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </Link>
  );
}

function ActivityItem({ title, description, time, type }: any) {
  const dotColor = type === 'success' ? 'bg-green-500' : 'bg-blue-500';

  return (
    <div className="flex items-start space-x-3">
      <div className={`mt-1 h-2 w-2 rounded-full ${dotColor}`} />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-600">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}