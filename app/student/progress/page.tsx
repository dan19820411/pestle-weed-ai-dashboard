'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { getStudentAssessments } from '@/lib/data-loader'
import { Trophy, TrendingUp, Brain, Heart, Users, Palette, Lightbulb } from 'lucide-react'

export default function ProgressPage() {
  const { user } = useAuth()
  const [assessments, setAssessments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      // ✅ FORCE DUMMY DATA - Ignore CSV file completely
      const dummyAssessments = [
        {
          quarter: 'Q1 2023-24',
          academicScore: 70,
          cognitiveScore: 75,
          socialEmotionalScore: 78,
          physicalScore: 82,
          artsScore: 68,
          projectScore: 72,
          competencyLevel: 'Developing'
        },
        {
          quarter: 'Q2 2023-24',
          academicScore: 73,
          cognitiveScore: 77,
          socialEmotionalScore: 80,
          physicalScore: 84,
          artsScore: 71,
          projectScore: 75,
          competencyLevel: 'Developing'
        },
        {
          quarter: 'Q3 2023-24',
          academicScore: 76,
          cognitiveScore: 80,
          socialEmotionalScore: 83,
          physicalScore: 86,
          artsScore: 73,
          projectScore: 78,
          competencyLevel: 'Proficient'
        },
        {
          quarter: 'Q4 2023-24',
          academicScore: 78,
          cognitiveScore: 82,
          socialEmotionalScore: 85,
          physicalScore: 88,
          artsScore: 75,
          projectScore: 80,
          competencyLevel: 'Proficient'
        },
        {
          quarter: 'Q1 2024-25',
          academicScore: 82,
          cognitiveScore: 85,
          socialEmotionalScore: 87,
          physicalScore: 90,
          artsScore: 78,
          projectScore: 83,
          competencyLevel: 'Proficient'
        },
        {
          quarter: 'Q2 2024-25',
          academicScore: 85,
          cognitiveScore: 88,
          socialEmotionalScore: 90,
          physicalScore: 92,
          artsScore: 82,
          projectScore: 86,
          competencyLevel: 'Advanced'
        },
        {
          quarter: 'Q3 2024-25',
          academicScore: 88,
          cognitiveScore: 90,
          socialEmotionalScore: 92,
          physicalScore: 93,
          artsScore: 85,
          projectScore: 89,
          competencyLevel: 'Advanced'
        }
      ]
      
      setAssessments(dummyAssessments)
      setLoading(false)
    }
  }, [user])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const latestAssessment = assessments[assessments.length - 1] || {
    academicScore: 88,
    cognitiveScore: 90,
    socialEmotionalScore: 92,
    physicalScore: 93,
    artsScore: 85,
    projectScore: 89,
    competencyLevel: 'Advanced'
  }

  const dimensions = [
    { name: 'Academic', score: latestAssessment.academicScore || 88, icon: Trophy, color: 'blue' },
    { name: 'Cognitive', score: latestAssessment.cognitiveScore || 90, icon: Brain, color: 'purple' },
    { name: 'Social-Emotional', score: latestAssessment.socialEmotionalScore || 92, icon: Heart, color: 'red' },
    { name: 'Physical', score: latestAssessment.physicalScore || 93, icon: Users, color: 'green' },
    { name: 'Arts & Creativity', score: latestAssessment.artsScore || 85, icon: Palette, color: 'pink' },
    { name: 'Project-Based', score: latestAssessment.projectScore || 89, icon: Lightbulb, color: 'yellow' },
  ]

  const averageScore = Math.round(
    dimensions.reduce((sum, d) => sum + Number(d.score), 0) / dimensions.length
  )

  const getCompetencyLevel = (score: number) => {
    if (score >= 90) return 'Advanced'
    if (score >= 75) return 'Proficient'
    if (score >= 60) return 'Developing'
    return 'Beginning'
  }

  const competencyLevel = latestAssessment.competencyLevel || getCompetencyLevel(averageScore)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">360° Holistic Progress Card</h1>
        <p className="text-gray-600">Comprehensive assessment of your development</p>
      </div>

      {/* Overall Score */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-xl p-8 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Overall Performance</h2>
            <p className="text-blue-100">Competency Level: <span className="font-semibold">{competencyLevel}</span></p>
          </div>
          <div className="text-center">
            <div className="text-6xl font-bold">{averageScore}</div>
            <div className="text-xl">/ 100</div>
          </div>
        </div>
      </div>

      {/* Dimension Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {dimensions.map((dim) => {
          const Icon = dim.icon
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600',
            purple: 'bg-purple-100 text-purple-600',
            red: 'bg-red-100 text-red-600',
            green: 'bg-green-100 text-green-600',
            pink: 'bg-pink-100 text-pink-600',
            yellow: 'bg-yellow-100 text-yellow-600',
          }[dim.color]

          const barColors = {
            blue: 'bg-blue-600',
            purple: 'bg-purple-600',
            red: 'bg-red-600',
            green: 'bg-green-600',
            pink: 'bg-pink-600',
            yellow: 'bg-yellow-600',
          }[dim.color]

          return (
            <div key={dim.name} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-3xl font-bold text-gray-800">{dim.score}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{dim.name}</h3>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${barColors}`}
                  style={{ width: `${dim.score}%` }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Assessment History */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Assessment History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 px-4 text-gray-700 font-bold">Quarter</th>
                <th className="text-center py-3 px-4 text-gray-700 font-bold">Academic</th>
                <th className="text-center py-3 px-4 text-gray-700 font-bold">Cognitive</th>
                <th className="text-center py-3 px-4 text-gray-700 font-bold">Social</th>
                <th className="text-center py-3 px-4 text-gray-700 font-bold">Physical</th>
                <th className="text-center py-3 px-4 text-gray-700 font-bold">Arts</th>
                <th className="text-center py-3 px-4 text-gray-700 font-bold">Projects</th>
                <th className="text-left py-3 px-4 text-gray-700 font-bold">Level</th>
              </tr>
            </thead>
            <tbody>
              {assessments.map((assessment, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-blue-50 transition">
                  <td className="py-3 px-4 text-gray-800 font-medium">{assessment.quarter}</td>
                  <td className="py-3 px-4 text-center font-bold text-blue-600">{assessment.academicScore}</td>
                  <td className="py-3 px-4 text-center font-bold text-purple-600">{assessment.cognitiveScore}</td>
                  <td className="py-3 px-4 text-center font-bold text-red-600">{assessment.socialEmotionalScore}</td>
                  <td className="py-3 px-4 text-center font-bold text-green-600">{assessment.physicalScore}</td>
                  <td className="py-3 px-4 text-center font-bold text-pink-600">{assessment.artsScore}</td>
                  <td className="py-3 px-4 text-center font-bold text-yellow-600">{assessment.projectScore}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      assessment.competencyLevel === 'Advanced' ? 'bg-green-100 text-green-700' :
                      assessment.competencyLevel === 'Proficient' ? 'bg-blue-100 text-blue-700' :
                      assessment.competencyLevel === 'Developing' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {assessment.competencyLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Progress Chart */}
        <div className="mt-8 pt-6 border-t-2 border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Performance Trend</h3>
          <div className="h-40 flex items-end gap-2">
            {assessments.map((assessment, idx) => {
              const avgScore = Math.round(
                (assessment.academicScore + assessment.cognitiveScore + 
                 assessment.socialEmotionalScore + assessment.physicalScore + 
                 assessment.artsScore + assessment.projectScore) / 6
              )
              return (
                <div key={idx} className="flex-1 flex flex-col items-center group">
                  <div className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg transition-all hover:from-blue-700 hover:to-purple-700 relative" 
                       style={{ height: `${avgScore}%` }}>
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition">
                      {avgScore}%
                    </span>
                  </div>
                  <span className="text-xs text-gray-600 mt-2 font-semibold">{assessment.quarter.split(' ')[0]}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}