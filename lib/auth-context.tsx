'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Student, Teacher } from './types'

interface AuthContextType {
  user: Student | Teacher | null
  userType: 'student' | 'principal' | null
  login: (user: Student | Teacher, type: 'student' | 'principal') => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Student | Teacher | null>(null)
  const [userType, setUserType] = useState<'student' | 'principal' | null>(null)

  useEffect(() => {
    // Check localStorage for saved session
    const savedUser = localStorage.getItem('user')
    const savedType = localStorage.getItem('userType')
    if (savedUser && savedType) {
      setUser(JSON.parse(savedUser))
      setUserType(savedType as 'student' | 'principal')
    }
  }, [])

  const login = (user: Student | Teacher, type: 'student' | 'principal') => {
    setUser(user)
    setUserType(type)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('userType', type)
  }

  const logout = () => {
    setUser(null)
    setUserType(null)
    localStorage.removeItem('user')
    localStorage.removeItem('userType')
  }

  return (
    <AuthContext.Provider value={{ user, userType, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
