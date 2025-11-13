'use client'

import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import { Subject } from '@/lib/types'

interface SubjectCardProps {
  subject: Subject
  progress: number
  chapters: any[]
}

const colorMap: Record<string, string> = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  purple: 'from-purple-500 to-purple-600',
  orange: 'from-orange-500 to-orange-600',
  cyan: 'from-cyan-500 to-cyan-600',
  pink: 'from-pink-500 to-pink-600',
}

export function SubjectCard({ subject, progress, chapters }: SubjectCardProps) {
  const gradientColor = colorMap[subject.color] || colorMap.blue

  return (
    <Link href={`/student/learning/${subject.subjectId}`}>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer">
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${gradientColor} p-6 text-white`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-4xl">{subject.icon}</span>
            <BookOpen className="w-6 h-6 opacity-80" />
          </div>
          <h3 className="text-2xl font-bold mb-1">{subject.subjectName}</h3>
          <p className="text-sm opacity-90">{subject.totalChapters} Chapters</p>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-600 text-sm mb-4">{subject.description}</p>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span className="font-semibold">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${gradientColor} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Chapters Info */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              {chapters.filter((ch: any) => Number(ch.progressPercent || 0) === 100).length} / {subject.totalChapters} completed
            </span>
            <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
              Continue →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
