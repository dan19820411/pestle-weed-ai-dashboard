'use client'

import { CheckCircle, Lock, Clock, PlayCircle } from 'lucide-react'
import Link from 'next/link'
import { Chapter } from '@/lib/types'

interface ChapterListProps {
  chapters: Chapter[]
  subjectId: string
  studentProgress: any[]
}

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-blue-100 text-blue-700',
  Advanced: 'bg-orange-100 text-orange-700',
  Expert: 'bg-red-100 text-red-700',
}

export function ChapterList({ chapters, subjectId, studentProgress }: ChapterListProps) {
  return (
    <div className="space-y-4">
      {chapters.map((chapter, index) => {
        const progress = studentProgress.find(
          (p: any) => p.currentTopic?.toLowerCase().includes(chapter.chapterTitle.toLowerCase())
        )
        const progressPercent = Number(progress?.progressPercent || 0)
        const isCompleted = progressPercent === 100
        const isInProgress = progressPercent > 0 && progressPercent < 100
        const isLocked = index > 0 && !chapters[index - 1] // Simple logic: locked if previous chapter not started
        
        return (
          <Link
            key={chapter.chapterId}
            href={`/student/learning/${subjectId}/${chapter.chapterId}`}
            className={`block ${isLocked ? 'pointer-events-none opacity-60' : ''}`}
          >
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-6 border-l-4 border-blue-500">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Chapter Number Circle */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                    isCompleted ? 'bg-green-500' : isInProgress ? 'bg-blue-500' : 'bg-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : isLocked ? (
                      <Lock className="w-6 h-6" />
                    ) : (
                      chapter.chapterNumber
                    )}
                  </div>

                  {/* Chapter Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {chapter.chapterTitle}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{chapter.description}</p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className={`px-3 py-1 rounded-full ${difficultyColors[chapter.difficulty]}`}>
                        {chapter.difficulty}
                      </span>
                      <span className="flex items-center text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {chapter.estimatedMinutes} mins
                      </span>
                      {isInProgress && (
                        <span className="flex items-center text-blue-600">
                          <PlayCircle className="w-4 h-4 mr-1" />
                          In Progress ({progressPercent}%)
                        </span>
                      )}
                      {isCompleted && (
                        <span className="flex items-center text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress Bar (if started) */}
                {progressPercent > 0 && (
                  <div className="ml-4">
                    <div className="w-24 h-24 relative">
                      <svg className="transform -rotate-90" width="96" height="96">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke={isCompleted ? '#10b981' : '#3b82f6'}
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - progressPercent / 100)}`}
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-gray-700">{progressPercent}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
