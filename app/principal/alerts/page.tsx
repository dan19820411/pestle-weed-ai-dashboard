'use client'

import { useState, useEffect } from 'react'
import { loadAlerts } from '@/lib/data-loader'
import { ArrowLeft, AlertTriangle, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import Link from 'next/link'

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAlerts().then(data => {
      setAlerts(data)
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
    </div>
  )

  const filtered = filter === 'all' ? alerts : alerts.filter(a => a.severity === filter || a.status === filter)
  const activeAlerts = alerts.filter(a => a.status === 'Active')
  const highSeverity = alerts.filter(a => a.severity === 'High')
  const mediumSeverity = alerts.filter(a => a.severity === 'Medium')

  return (
    <div className="p-8">
      <Link href="/principal" className="inline-flex items-center text-red-600 hover:text-red-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Intervention Alerts</h1>
        <p className="text-gray-600">AI-powered early warning system for at-risk students</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Alerts</h3>
          <p className="text-4xl font-bold text-gray-800">{alerts.length}</p>
        </div>

        <div className="bg-red-50 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-red-700">High Priority</h3>
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-4xl font-bold text-red-800">{highSeverity.length}</p>
        </div>

        <div className="bg-yellow-50 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-yellow-700">Medium Priority</h3>
            <AlertCircle className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-4xl font-bold text-yellow-800">{mediumSeverity.length}</p>
        </div>

        <div className="bg-blue-50 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-blue-700">Active</h3>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-4xl font-bold text-blue-800">{activeAlerts.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Alerts List</h2>
          <div className="flex space-x-2">
            {['all', 'High', 'Medium', 'Low', 'Active', 'Resolved'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === f
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-4">
          {filtered.map((alert, idx) => (
            <div
              key={idx}
              className={`border-l-4 rounded-lg p-5 ${
                alert.severity === 'High' ? 'border-red-500 bg-red-50' :
                alert.severity === 'Medium' ? 'border-yellow-500 bg-yellow-50' :
                'border-blue-500 bg-blue-50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  {alert.severity === 'High' ? (
                    <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
                  ) : alert.severity === 'Medium' ? (
                    <AlertCircle className="w-6 h-6 text-yellow-600 mt-1" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-blue-600 mt-1" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg text-gray-800">{alert.studentName}</h3>
                      <span className="text-sm text-gray-500">({alert.studentId})</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        alert.severity === 'High' ? 'bg-red-200 text-red-800' :
                        alert.severity === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-blue-200 text-blue-800'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-2">{alert.message}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Type:</span> {alert.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Date:</span> {new Date(alert.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Status:</span>
                        <span className={`${
                          alert.status === 'Active' ? 'text-red-600 font-semibold' : 'text-green-600'
                        }`}>
                          {alert.status}
                        </span>
                      </span>
                    </div>

                    {alert.recommendation && (
                      <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-1">💡 Recommended Action:</p>
                        <p className="text-sm text-gray-600">{alert.recommendation}</p>
                      </div>
                    )}
                  </div>
                </div>

                {alert.status === 'Active' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium">
                    Mark Resolved
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
