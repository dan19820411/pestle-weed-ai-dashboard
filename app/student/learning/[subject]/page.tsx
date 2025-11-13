'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { getStudentProgress } from '@/lib/data-loader'
import { ArrowLeft, BookOpen, Clock, CheckCircle, Lock, Play } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'

const SUBJECT_CHAPTERS: Record<string, any[]> = {
  'Mathematics': [
    { id: 'MATH_CH1', name: 'Number Systems', description: 'Understanding integers, fractions, and decimals', duration: '45 mins' },
    { id: 'MATH_CH2', name: 'Algebra Basics', description: 'Variables, expressions, and simple equations', duration: '50 mins' },
    { id: 'MATH_CH3', name: 'Geometry Fundamentals', description: 'Shapes, angles, and basic theorems', duration: '60 mins' },
    { id: 'MATH_CH4', name: 'Measurements', description: 'Length, area, volume, and conversions', duration: '40 mins' }
  ],
  'Science': [
    { id: 'SCI_CH1', name: 'Matter and Its Properties', description: 'States of matter and their characteristics', duration: '45 mins' },
    { id: 'SCI_CH2', name: 'Force and Motion', description: 'Newton\'s laws and types of motion', duration: '55 mins' },
    { id: 'SCI_CH3', name: 'Light and Reflection', description: 'Properties of light and reflection principles', duration: '50 mins' },
    { id: 'SCI_CH4', name: 'Living Organisms', description: 'Classification and characteristics of life', duration: '60 mins' }
  ],
  'English': [
    { id: 'ENG_CH1', name: 'Grammar Essentials', description: 'Parts of speech and sentence structure', duration: '40 mins' },
    { id: 'ENG_CH2', name: 'Comprehension Skills', description: 'Reading strategies and understanding texts', duration: '45 mins' },
    { id: 'ENG_CH3', name: 'Writing Techniques', description: 'Essays, letters, and creative writing', duration: '50 mins' },
    { id: 'ENG_CH4', name: 'Vocabulary Building', description: 'Word power and usage', duration: '35 mins' }
  ],
  'Social Studies': [
    { id: 'SS_CH1', name: 'Ancient Civilizations', description: 'Early human societies and cultures', duration: '55 mins' },
    { id: 'SS_CH2', name: 'Modern India', description: 'Independence movement and nation building', duration: '60 mins' },
    { id: 'SS_CH3', name: 'Geography Basics', description: 'Maps, continents, and climate zones', duration: '45 mins' },
    { id: 'SS_CH4', name: 'Civic Responsibilities', description: 'Government and citizenship', duration: '40 mins' }
  ]
}

export default function SubjectDetailPage() {
  const params = useParams()
  const subject = decodeURIComponent(params.subject as string)
  const { user } = useAuth()
  const router = useRouter()
  const [progress, setProgress] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      getStudentProgress((user as any).id).then(data => {
        const subjectProgress = data.filter((p: any) => p.subject === subject)
        setProgress(subjectProgress)
        setLoading(false)
      })
    }
  }, [user, subject])

  const chapters = SUBJECT_CHAPTERS[subject] || []

  const getChapterProgress = (chapterId: string) => {
    const chapterProgress = progress.find(p => p.currentTopic?.includes(chapterId.split('_')[1]))
    return chapterProgress ? Number(chapterProgress.progressPercent) : 0
  }

  const avgProgress = progress.length > 0
    ? Math.round(progress.reduce((sum, p) => sum + Number(p.progressPercent), 0) / progress.length)
    : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/student/learning" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Learning
        </Link>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{subject}</h1>
            <p className="text-gray-600">Continue your learning journey</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600 text-sm mb-1">Overall Progress</p>
            <p className="text-4xl font-bold text-blue-600">{avgProgress}%</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">Course Progress</h3>
          <span className="text-sm text-gray-600">{avgProgress}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${avgProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Chapters List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Chapters</h2>
        
        {chapters.map((chapter, index) => {
          const chapterProgress = getChapterProgress(chapter.id)
          const isCompleted = chapterProgress === 100
          const isInProgress = chapterProgress > 0 && chapterProgress < 100
          const isLocked = index > 0 && getChapterProgress(chapters[index - 1].id) < 100

          return (
            <div
              key={chapter.id}
              className={`bg-white rounded-lg shadow-lg hover:shadow-xl transition-all ${
                isLocked ? 'opacity-60' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-100' :
                        isInProgress ? 'bg-blue-100' :
                        isLocked ? 'bg-gray-100' : 'bg-purple-100'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : isLocked ? (
                          <Lock className="w-5 h-5 text-gray-400" />
                        ) : (
                          <BookOpen className={`w-5 h-5 ${isInProgress ? 'text-blue-600' : 'text-purple-600'}`} />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{chapter.name}</h3>
                        <p className="text-sm text-gray-500">Chapter {index + 1}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{chapter.description}</p>

                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{chapter.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Progress:</span>
                        <span className={`font-semibold ${
                          isCompleted ? 'text-green-600' :
                          isInProgress ? 'text-blue-600' : 'text-gray-600'
                        }`}>
                          {chapterProgress}%
                        </span>
                      </div>
                    </div>

                    {!isLocked && (
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            isCompleted ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${chapterProgress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>

                  <div className="ml-6">
                    {isLocked ? (
                      <button
                        disabled
                        className="px-6 py-3 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed"
                      >
                        Locked
                      </button>
                    ) : (
                      <Link href={`/student/learning/${encodeURIComponent(subject)}/${chapter.id}`}>
                        <button className={`px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
                          isCompleted
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : isInProgress
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-purple-600 hover:bg-purple-700 text-white'
                        }`}>
                          <Play className="w-4 h-4" />
                          <span>{isCompleted ? 'Review' : isInProgress ? 'Continue' : 'Start'}</span>
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
