'use client'

import { useState } from 'react'
import { BookOpen, Brain, FileText, Video, Image as ImageIcon, CheckCircle } from 'lucide-react'

interface LessonViewerProps {
  chapter: {
    id: string
    name: string
    subject: string
    description: string
    videoUrl?: string
    content: string
  }
}

export default function LessonViewer({ chapter }: LessonViewerProps) {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'notes'>('learn')
  const [notes, setNotes] = useState('')
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})

  const quizQuestions = [
    {
      id: 1,
      question: `What is the main concept in ${chapter.name}?`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correct: 1
    },
    {
      id: 2,
      question: 'Which of the following is true?',
      options: ['Statement 1', 'Statement 2', 'Statement 3', 'Statement 4'],
      correct: 2
    },
    {
      id: 3,
      question: 'Apply your knowledge:',
      options: ['Choice A', 'Choice B', 'Choice C', 'Choice D'],
      correct: 0
    }
  ]

  const tabs = [
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Brain },
    { id: 'notes', label: 'Notes', icon: FileText }
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {activeTab === 'learn' && (
          <div className="space-y-6">
            {/* Video Section */}
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Video Lesson</h3>
              <p className="text-gray-500 mb-4">Watch and learn about {chapter.name}</p>
              <div className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <Video className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm opacity-75">Video Player (Demo)</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{chapter.name}</h2>
              <p className="text-gray-600 mb-6">{chapter.description}</p>
              
              <div className="prose max-w-none">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                  <h4 className="text-blue-900 font-semibold mb-2">Key Concepts</h4>
                  <p className="text-blue-800">{chapter.content}</p>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">Detailed Explanation</h3>
                <p className="text-gray-700 mb-4">
                  In this chapter, you will learn about the fundamental principles and applications of {chapter.name}. 
                  This knowledge builds upon your previous understanding and prepares you for more advanced topics.
                </p>

                {/* Diagram Placeholder */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 text-center my-6">
                  <ImageIcon className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">Interactive Diagram</h4>
                  <p className="text-gray-500">Visual representation of concepts (Demo)</p>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">Examples</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Example 1: Practical application in real-world scenarios</li>
                  <li>• Example 2: Step-by-step problem solving</li>
                  <li>• Example 3: Common mistakes and how to avoid them</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Practice Quiz</h2>
              <p className="text-gray-600">Test your understanding of {chapter.name}</p>
            </div>

            {quizQuestions.map((q, idx) => (
              <div key={q.id} className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4">
                  {idx + 1}. {q.question}
                </h3>
                <div className="space-y-3">
                  {q.options.map((option, optIdx) => (
                    <label
                      key={optIdx}
                      className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                        quizAnswers[q.id] === String(optIdx)
                          ? optIdx === q.correct
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={optIdx}
                        checked={quizAnswers[q.id] === String(optIdx)}
                        onChange={(e) => setQuizAnswers({ ...quizAnswers, [q.id]: e.target.value })}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">{option}</span>
                      {quizAnswers[q.id] === String(optIdx) && optIdx === q.correct && (
                        <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                      )}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <p className="text-blue-800 font-medium">
                Score: {Object.values(quizAnswers).filter((ans, idx) => Number(ans) === quizQuestions[idx]?.correct).length}/{quizQuestions.length}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Personal Notes</h2>
              <p className="text-gray-600">Take notes while learning {chapter.name}</p>
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Start typing your notes here..."
              className="w-full h-96 p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
            />

            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Save Notes
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
