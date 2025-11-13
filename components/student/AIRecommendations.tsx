'use client'

import { Sparkles, TrendingUp, BookOpen, Target, AlertCircle } from 'lucide-react'

interface AIRecommendationsProps {
  studentData: {
    weakSubjects?: string[]
    strongSubjects?: string[]
    upcomingTests?: string[]
    missedClasses?: number
    avgScore?: number
  }
}

export default function AIRecommendations({ studentData }: AIRecommendationsProps) {
  const generateRecommendations = () => {
    const recommendations = []

    // Academic recommendations based on performance
    if (studentData.avgScore && studentData.avgScore < 70) {
      recommendations.push({
        type: 'focus',
        icon: Target,
        color: 'red',
        title: 'Focus on Weak Areas',
        message: `Your average score is ${studentData.avgScore}%. I recommend spending 30 minutes daily on ${studentData.weakSubjects?.[0] || 'challenging subjects'}.`,
        action: 'View Study Plan'
      })
    }

    // Subject-specific recommendations
    if (studentData.weakSubjects && studentData.weakSubjects.length > 0) {
      recommendations.push({
        type: 'improve',
        icon: TrendingUp,
        color: 'yellow',
        title: 'Improvement Opportunity',
        message: `You can improve in ${studentData.weakSubjects.join(', ')}. Try our practice quizzes!`,
        action: 'Start Practice'
      })
    }

    // Positive reinforcement
    if (studentData.strongSubjects && studentData.strongSubjects.length > 0) {
      recommendations.push({
        type: 'strength',
        icon: Sparkles,
        color: 'green',
        title: 'Great Progress!',
        message: `You're excelling in ${studentData.strongSubjects[0]}! Keep up the excellent work.`,
        action: 'View Progress'
      })
    }

    // Attendance recommendations
    if (studentData.missedClasses && studentData.missedClasses > 3) {
      recommendations.push({
        type: 'warning',
        icon: AlertCircle,
        color: 'red',
        title: 'Attendance Alert',
        message: `You've missed ${studentData.missedClasses} classes this month. This may affect your learning progress.`,
        action: 'View Schedule'
      })
    }

    // Study recommendations
    recommendations.push({
      type: 'study',
      icon: BookOpen,
      color: 'blue',
      title: 'Recommended Study Time',
      message: 'Based on your upcoming tests, dedicate 2 hours to Mathematics this week.',
      action: 'Create Schedule'
    })

    return recommendations
  }

  const recommendations = generateRecommendations()

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-800">AI Recommendations</h3>
      </div>

      {recommendations.map((rec, idx) => {
        const Icon = rec.icon
        const bgColor = {
          red: 'bg-red-50 border-red-200',
          yellow: 'bg-yellow-50 border-yellow-200',
          green: 'bg-green-50 border-green-200',
          blue: 'bg-blue-50 border-blue-200'
        }[rec.color]

        const iconColor = {
          red: 'text-red-600',
          yellow: 'text-yellow-600',
          green: 'text-green-600',
          blue: 'text-blue-600'
        }[rec.color]

        const buttonColor = {
          red: 'bg-red-600 hover:bg-red-700',
          yellow: 'bg-yellow-600 hover:bg-yellow-700',
          green: 'bg-green-600 hover:bg-green-700',
          blue: 'bg-blue-600 hover:bg-blue-700'
        }[rec.color]

        return (
          <div key={idx} className={`border rounded-lg p-4 ${bgColor} animate-slide-up`}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg bg-white`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1">{rec.title}</h4>
                <p className="text-sm text-gray-700 mb-3">{rec.message}</p>
                <button className={`px-4 py-2 ${buttonColor} text-white rounded-lg text-sm font-medium transition`}>
                  {rec.action}
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
