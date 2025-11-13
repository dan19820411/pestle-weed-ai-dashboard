'use client'

import { useState, useEffect } from 'react'
import { loadStudents, loadAttendance, loadAssessments } from '@/lib/data-loader'
import { ArrowLeft, Users, TrendingUp, TrendingDown, Calendar } from 'lucide-react'
import Link from 'next/link'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function AnalyticsPage() {
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const [students, attendance, assessments] = await Promise.all([
        loadStudents(),
        loadAttendance(),
        loadAssessments()
      ])

      // Enrollment by class
      const enrollmentData = students.reduce((acc: any, s) => {
        const cls = `Class ${s.grade}`
        acc[cls] = (acc[cls] || 0) + 1
        return acc
      }, {})

      // Performance by class
      const performanceData = Object.keys(enrollmentData).map(cls => {
        const grade = cls.split(' ')[1]
        const classStudents = students.filter(s => s.grade === grade)
        const classAssessments = assessments.filter(a => 
          classStudents.some(s => s.id === a.studentId)
        )
        const avgScore = classAssessments.length > 0
          ? Math.round(classAssessments.reduce((sum, a) => sum + Number(a.academicScore), 0) / classAssessments.length)
          : 0
        return { name: cls, score: avgScore }
      })

      // Attendance trend (mock monthly data)
      const attendanceTrend = [
        { month: 'Sep', rate: 92 },
        { month: 'Oct', rate: 94 },
        { month: 'Nov', rate: 93 },
        { month: 'Dec', rate: 91 },
        { month: 'Jan', rate: 95 }
      ]

      setData({
        totalStudents: students.length,
        enrollment: Object.entries(enrollmentData).map(([name, value]) => ({ name, value })),
        performance: performanceData,
        attendanceTrend,
        genderData: [
          { name: 'Male', value: Math.round(students.length * 0.52) },
          { name: 'Female', value: Math.round(students.length * 0.48) }
        ]
      })
      setLoading(false)
    }
    loadData()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  )

  const COLORS = ['#3B82F6', '#EC4899']

  return (
    <div className="p-8">
      <Link href="/principal" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">School Analytics</h1>
        <p className="text-gray-600">Comprehensive enrollment, attendance, and performance insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Enrollment</h3>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{data.totalStudents}</p>
          <p className="text-xs text-green-600 mt-1 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            +5.2% from last year
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Avg Attendance</h3>
            <Calendar className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-800">93.5%</p>
          <p className="text-xs text-green-600 mt-1 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            +1.8% this month
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Avg Performance</h3>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-800">87%</p>
          <p className="text-xs text-green-600 mt-1 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            +3.1% from last term
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Dropout Rate</h3>
            <TrendingDown className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-gray-800">1.2%</p>
          <p className="text-xs text-green-600 mt-1 flex items-center">
            <TrendingDown className="w-3 h-3 mr-1" />
            -0.5% improvement
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Enrollment Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Enrollment by Class</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.enrollment}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance by Class */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Average Performance by Class</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.performance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Attendance Trend (Last 5 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[85, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gender Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Demographics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.genderData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.genderData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
