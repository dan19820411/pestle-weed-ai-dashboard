'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Home, BookOpen, Target, MessageCircle, Award, Briefcase, LogOut, User, FileText } from 'lucide-react'

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { user, userType, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Redirect to login if not authenticated or wrong user type
    if (!user || userType !== 'student') {
      if (!pathname.includes('/login')) {
        router.push('/student/login')
      }
    }
  }, [user, userType, router, pathname])

  // Don't show navigation on login page
  if (pathname.includes('/login')) {
    return <>{children}</>
  }

  if (!user) {
    return null
  }

  const student = user as any

  const navItems = [
    { name: 'Dashboard', href: '/student/dashboard', icon: Home },
    { name: 'Learning', href: '/student/learning', icon: BookOpen },
    { name: 'Progress Card', href: '/student/progress', icon: Target },
    { name: 'Results', href: '/student/results', icon: FileText },
    { name: 'AI Assistant', href: '/student/chat', icon: MessageCircle },
    { name: 'Goals', href: '/student/goals', icon: Award },
    { name: 'Vocational', href: '/student/vocational', icon: Briefcase },
  ]

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{student.name}</h3>
              <p className="text-sm text-gray-500">Class {student.grade}-{student.section}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
