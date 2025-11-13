'use client'

import { useState, useEffect } from 'react'
import { loadTeachers } from '@/lib/data-loader'
import { ArrowLeft, Award, BookOpen, TrendingUp, Star } from 'lucide-react'
import Link from 'next/link'

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTeachers().then(data => {
      setTeachers(data)
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  )

  const avgPerformance = Math.round(teachers.reduce((sum, t) => sum + Number(t.performanceScore), 0) / teachers.length)
  const avgCPD = Math.round(teachers.reduce((sum, t) => sum + Number(t.cpdHours), 0) / teachers.length)

  return (
    <div className="p-8">
      <Link href="/principal" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Teacher Performance & Development</h1>
        <p className="text-gray-600">Track teaching staff performance and professional development</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Teachers</h3>
          <p className="text-4xl font-bold text-gray-800">{teachers.length}</p>
        </div>

        <div className="bg-purple-50 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-purple-700">Avg Performance</h3>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-4xl font-bold text-purple-800">{avgPerformance}%</p>
        </div>

        <div className="bg-blue-50 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-blue-700">Avg CPD Hours</h3>
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-4xl font-bold text-blue-800">{avgCPD}</p>
          <p className="text-xs text-blue-600 mt-1">Target: 50 hours/year</p>
        </div>

        <div className="bg-yellow-50 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-yellow-700">Top Performers</h3>
            <Star className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-4xl font-bold text-yellow-800">{teachers.filter(t => Number(t.performanceScore) >= 90).length}</p>
        </div>
      </div>

      {/* Teachers List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Teaching Staff</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qualification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CPD Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {teachers.map((teacher, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{teacher.name}</div>
                    <div className="text-sm text-gray-500">{teacher.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {teacher.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {teacher.qualification}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{teacher.cpdHours} hrs</div>
                    <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full ${
                          Number(teacher.cpdHours) >= 50 ? 'bg-green-500' :
                          Number(teacher.cpdHours) >= 30 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${Math.min((Number(teacher.cpdHours) / 50) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">{teacher.performanceScore}%</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(Number(teacher.performanceScore) / 20)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      Number(teacher.performanceScore) >= 90 ? 'bg-green-100 text-green-700' :
                      Number(teacher.performanceScore) >= 75 ? 'bg-blue-100 text-blue-700' :
                      Number(teacher.performanceScore) >= 60 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {Number(teacher.performanceScore) >= 90 ? 'Excellent' :
                       Number(teacher.performanceScore) >= 75 ? 'Good' :
                       Number(teacher.performanceScore) >= 60 ? 'Average' :
                       'Needs Improvement'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
