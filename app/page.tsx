'use client'

import Link from 'next/link'
import { GraduationCap, Building2 } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Pestle Weed AI Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            AI Powered Comprehensive Dashboard
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Student Login */}
          <Link href="/student/login">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-transparent hover:border-blue-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-6 rounded-full mb-6">
                  <GraduationCap className="w-16 h-16 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                  Student Portal
                </h2>
                <p className="text-gray-600 mb-6">
                  Access your personalized learning dashboard, progress reports, and AI-powered study assistance
                </p>
                <div className="bg-blue-50 px-6 py-3 rounded-lg">
                  <span className="text-blue-700 font-semibold">Login as Student →</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Principal Login */}
          <Link href="/principal">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-transparent hover:border-indigo-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-indigo-100 p-6 rounded-full mb-6">
                  <Building2 className="w-16 h-16 text-indigo-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                  Principal Portal
                </h2>
                <p className="text-gray-600 mb-6">
                  Monitor school-wide analytics, student interventions, and comprehensive reports
                </p>
                <div className="bg-indigo-50 px-6 py-3 rounded-lg">
                  <span className="text-indigo-700 font-semibold">Login as Principal →</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Powered by AI • Holistic Education Dashboard
          </p>
        </div>
      </div>
    </div>
  )
}
