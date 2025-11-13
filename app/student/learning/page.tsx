'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { getStudentProgress } from '@/lib/data-loader'
import { BookOpen, Clock, TrendingUp, Lock, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function LearningPage() {
  const { user } = useAuth()
  const [progress, setProgress] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      getStudentProgress((user as any).id).then(data => {
        setProgress(data)
        setLoading(false)
      })
    }
  }, [user])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Group progress by subject
  const subjectProgress = progress.reduce((acc: any, item) => {
    if (!acc[item.subject]) {
      acc[item.subject] = []
    }
    acc[item.subject].push(item)
    return acc
  }, {})

  const subjects = Object.keys(subjectProgress)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Learning Modules</h1>
        <p className="text-gray-600">Continue your personalized learning journey</p>
      </div>

      {/* Overall Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Total Progress</h3>
            <TrendingUp className="text-green-500 w-6 h-6" />
          </div>
          <p className="text-4xl font-bold text-gray-800">
            {Math.round(progress.reduce((sum, p) => sum + Number(p.progressPercent), 0) / progress.length)}%
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Total Time</h3>
            <Clock className="text-blue-500 w-6 h-6" />
          </div>
          <p className="text-4xl font-bold text-gray-800">
            {Math.round(progress.reduce((sum, p) => sum + Number(p.timeSpent), 0))}
            <span className="text-lg text-gray-500 ml-2">mins</span>
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Active Subjects</h3>
            <BookOpen className="text-purple-500 w-6 h-6" />
          </div>
          <p className="text-4xl font-bold text-gray-800">{subjects.length}</p>
        </div>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map(subject => {
          const items = subjectProgress[subject]
          const avgProgress = Math.round(
            items.reduce((sum: number, item: any) => sum + Number(item.progressPercent), 0) / items.length
          )
          
          return (
            <div key={subject} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{subject}</h3>
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span className="font-semibold">{avgProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${avgProgress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {items.slice(0, 3).map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        {Number(item.progressPercent) === 100 ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : Number(item.progressPercent) > 0 ? (
                          <Clock className="w-4 h-4 text-blue-500" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="text-gray-700 truncate">{item.currentTopic}</span>
                      </div>
                      <span className="text-gray-500">{item.progressPercent}%</span>
                    </div>
                  ))}
                </div>

                <Link href={`/student/learning/${encodeURIComponent(subject)}`}>
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Continue Learning
                  </button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
