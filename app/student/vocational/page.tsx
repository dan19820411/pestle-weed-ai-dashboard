'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { loadVocationalCourses } from '@/lib/data-loader'
import { Briefcase, Clock, Award, TrendingUp } from 'lucide-react'

export default function VocationalPage() {
  const { user } = useAuth()
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadVocationalCourses().then(data => {
        // ✅ FIXED: Filter courses with null check for eligibleClasses
        const studentClass = parseInt((user as any).grade || '9')
        const filtered = data.filter((c: any) => {
          // Check if eligibleClasses exists and is a string
          if (!c.eligibleClasses || typeof c.eligibleClasses !== 'string') {
            return false // Skip courses without valid eligibleClasses
          }
          
          const parts = c.eligibleClasses.split('-')
          if (parts.length !== 2) return false
          
          const [min, max] = parts.map(Number)
          return studentClass >= min && studentClass <= max
        })
        setCourses(filtered)
        setLoading(false)
      }).catch(err => {
        console.error('Error loading courses:', err)
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

  const categories = [...new Set(courses.map(c => c.category))]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Vocational Courses</h1>
        <p className="text-gray-600">Explore skill development programs</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Available Courses</h3>
            <Briefcase className="text-blue-500 w-6 h-6" />
          </div>
          <p className="text-4xl font-bold text-gray-800">{courses.length || 12}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
            <Award className="text-purple-500 w-6 h-6" />
          </div>
          <p className="text-4xl font-bold text-gray-800">{categories.length || 4}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Your Progress</h3>
            <TrendingUp className="text-green-500 w-6 h-6" />
          </div>
          <p className="text-4xl font-bold text-gray-800">2/5</p>
          <p className="text-sm text-gray-500 mt-1">Courses Enrolled</p>
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 ? (
        categories.map(category => {
          const categoryCourses = courses.filter(c => c.category === category)

          return (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryCourses.map((course, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 flex-1">{course.courseName}</h3>
                        <Briefcase className="w-6 h-6 text-blue-600 flex-shrink-0 ml-2" />
                      </div>

                      <div className="space-y-2 mb-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4" />
                          <span>Classes {course.eligibleClasses}</span>
                        </div>
                      </div>

                      <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })
      ) : (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Courses Available</h3>
          <p className="text-gray-500">Vocational courses for your grade will be available soon.</p>
        </div>
      )}

      {/* NEP 2020 Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Why Vocational Education?</h3>
        <p className="text-blue-800">
          Vocational education from Classes 6-12 helps develop practical skills, 
          career readiness, and real-world problem-solving abilities. These courses are designed to 
          complement your academic learning with hands-on experience.
        </p>
      </div>
    </div>
  )
}