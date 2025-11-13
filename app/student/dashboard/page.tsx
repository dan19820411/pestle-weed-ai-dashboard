'use client'

import { useEffect, useState } from 'react'
import { loadStudents, getStudentAssessments, getStudentProgress } from '@/lib/data-loader'
import { BookOpen, Target, TrendingUp, Award, MessageCircle, Clock } from 'lucide-react'
import Link from 'next/link'

export default function StudentDashboard() {
  const [student, setStudent] = useState<any>(null)
  const [assessments, setAssessments] = useState<any[]>([])
  const [progress, setProgress] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const students = await loadStudents()
        const firstStudent = students[0]
        setStudent(firstStudent)
        
        if (firstStudent) {
          const studentAssessments = await getStudentAssessments(firstStudent.id)
          const studentProgress = await getStudentProgress(firstStudent.id)
          setAssessments(studentAssessments)
          setProgress(studentProgress)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error loading data:', error)
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const recentAssessment = assessments[assessments.length - 1] || {}
  
  // ✅ FIXED: Calculate average score properly
  const averageScore = assessments.length > 0
    ? Math.round(assessments.reduce((sum, a) => sum + (Number(a.academicScore) || 0), 0) / assessments.length)
    : 75 // Default value if no assessments

  // ✅ FIXED: Calculate competency level based on average score
  const getCompetencyLevel = (score: number) => {
    if (score >= 90) return 'Advanced'
    if (score >= 75) return 'Proficient'
    if (score >= 60) return 'Developing'
    return 'Beginning'
  }

  const competencyLevel = recentAssessment.competencyLevel || getCompetencyLevel(averageScore)

  const totalProgress = progress.length > 0
    ? Math.round(progress.reduce((sum, p) => sum + (Number(p.progressPercent) || 0), 0) / progress.length)
    : 68 // Default value

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {student?.name || 'Student'}!</h1>
              <p className="text-blue-100">Class {student?.class} - Section {student?.section}</p>
            </div>
            <Link href="/">
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition">
                Logout
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Average Score</p>
                <p className="text-3xl font-bold text-gray-800">{averageScore}%</p>
              </div>
              <TrendingUp className="text-green-500 w-8 h-8" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Overall Progress</p>
                <p className="text-3xl font-bold text-gray-800">{totalProgress}%</p>
              </div>
              <Target className="text-blue-500 w-8 h-8" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Competency Level</p>
                <p className="text-2xl font-bold text-gray-800">{competencyLevel}</p>
              </div>
              <Award className="text-yellow-500 w-8 h-8" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Courses</p>
                <p className="text-3xl font-bold text-gray-800">{progress.length || 5}</p>
              </div>
              <BookOpen className="text-purple-500 w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="text-blue-600 w-6 h-6" />
              </div>
              <h3 className="ml-3 text-lg font-semibold">Learning Modules</h3>
            </div>
            <p className="text-gray-600 mb-4">Continue your personalized learning journey</p>
            <div className="flex flex-wrap gap-2">
              {progress.slice(0, 3).map((p, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{p.subject}</span>
              ))}
              {progress.length === 0 && (
                <>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Mathematics</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Science</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">English</span>
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Target className="text-green-600 w-6 h-6" />
              </div>
              <h3 className="ml-3 text-lg font-semibold">Holistic Progress</h3>
            </div>
            <p className="text-gray-600 mb-4">View your 360° development report</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Academic</span>
                <span className="font-semibold">{recentAssessment.academicScore || 78}/100</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Cognitive</span>
                <span className="font-semibold">{recentAssessment.cognitiveScore || 82}/100</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <MessageCircle className="text-purple-600 w-6 h-6" />
              </div>
              <h3 className="ml-3 text-lg font-semibold">AI Study Assistant</h3>
            </div>
            <p className="text-gray-600 mb-4">Get instant help with your studies</p>
            <Link href="/student/chat">
              <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                Start Chat
              </button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Award className="text-yellow-600 w-6 h-6" />
              </div>
              <h3 className="ml-3 text-lg font-semibold">Goals & Achievements</h3>
            </div>
            <p className="text-gray-600 mb-4">Track your learning milestones</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Goals Completed</span>
              <span className="text-2xl font-bold text-yellow-600">3/5</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="text-orange-600 w-6 h-6" />
              </div>
              <h3 className="ml-3 text-lg font-semibold">Vocational Courses</h3>
            </div>
            <p className="text-gray-600 mb-4">Explore skill development programs</p>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
              Enrolled: 2 courses
            </span>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <TrendingUp className="text-red-600 w-6 h-6" />
              </div>
              <h3 className="ml-3 text-lg font-semibold">Performance Analytics</h3>
            </div>
            <p className="text-gray-600 mb-4">Detailed insights into your progress</p>
            <div className="h-16 flex items-end gap-1">
              {[65, 70, 75, 72, 80, 85, averageScore].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-200 rounded-t" style={{height: `${h}%`}}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}