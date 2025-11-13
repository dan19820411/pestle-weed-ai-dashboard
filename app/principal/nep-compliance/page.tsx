'use client'

import { useState, useEffect } from 'react'
import { loadNEPCompliance } from '@/lib/data-loader'
import { ArrowLeft, CheckCircle, AlertTriangle, Clock, Target } from 'lucide-react'
import Link from 'next/link'

export default function NEPCompliancePage() {
  const [metrics, setMetrics] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadNEPCompliance().then(data => {
      setMetrics(data)
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
  )

  const onTrack = metrics.filter(m => m.status === 'On Track').length
  const needsAttention = metrics.filter(m => m.status === 'Needs Attention').length
  const critical = metrics.filter(m => m.status === 'Critical').length

  return (
    <div className="p-8">
      <Link href="/principal" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">NEP 2020 Compliance Tracking</h1>
        <p className="text-gray-600">Monitor implementation of National Education Policy 2020</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Metrics</h3>
          <p className="text-4xl font-bold text-gray-800">{metrics.length}</p>
        </div>

        <div className="bg-green-50 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-green-700">On Track</h3>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-4xl font-bold text-green-800">{onTrack}</p>
          <p className="text-xs text-green-600 mt-1">{Math.round((onTrack / metrics.length) * 100)}% compliant</p>
        </div>

        <div className="bg-yellow-50 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-yellow-700">Needs Attention</h3>
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-4xl font-bold text-yellow-800">{needsAttention}</p>
          <p className="text-xs text-yellow-600 mt-1">Requires action</p>
        </div>

        <div className="bg-red-50 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-red-700">Critical</h3>
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-4xl font-bold text-red-800">{critical}</p>
          <p className="text-xs text-red-600 mt-1">Immediate action needed</p>
        </div>
      </div>

      {/* Metrics List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Compliance Metrics</h2>
        </div>
        
        <div className="p-6 space-y-4">
          {metrics.map((metric, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {metric.status === 'On Track' ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : metric.status === 'Needs Attention' ? (
                      <Clock className="w-6 h-6 text-yellow-500" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-red-500" />
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{metric.category}</h3>
                      <p className="text-sm text-gray-600">{metric.metric}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 ml-9">{metric.description}</p>
                  
                  <div className="ml-9 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Current Status:</span>
                      <span className="font-semibold text-gray-800">
                        {metric.currentValue}{metric.unit === 'percentage' ? '%' : metric.unit === 'ratio' ? ':1' : ''}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Target:</span>
                      <span className="font-semibold text-gray-800">
                        {metric.targetValue}{metric.unit === 'percentage' ? '%' : metric.unit === 'ratio' ? ':1' : ''}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${
                          metric.status === 'On Track' ? 'bg-green-500' :
                          metric.status === 'Needs Attention' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ 
                          width: metric.unit === 'percentage' 
                            ? `${(Number(metric.currentValue) / Number(metric.targetValue)) * 100}%`
                            : `${Math.min((Number(metric.currentValue) / Number(metric.targetValue)) * 100, 100)}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  metric.status === 'On Track' ? 'bg-green-100 text-green-700' :
                  metric.status === 'Needs Attention' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {metric.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
