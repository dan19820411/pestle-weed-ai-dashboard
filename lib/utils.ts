import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0
  return Math.round(numbers.reduce((sum, num) => sum + num, 0) / numbers.length)
}

export function getCompetencyColor(level: string): string {
  const colors: Record<string, string> = {
    'Beginner': 'text-red-600 bg-red-100',
    'Intermediate': 'text-yellow-600 bg-yellow-100',
    'Advanced': 'text-blue-600 bg-blue-100',
    'Expert': 'text-green-600 bg-green-100'
  }
  return colors[level] || 'text-gray-600 bg-gray-100'
}

export function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    'Low': 'text-blue-600 bg-blue-100 border-blue-500',
    'Medium': 'text-yellow-600 bg-yellow-100 border-yellow-500',
    'High': 'text-red-600 bg-red-100 border-red-500',
    'Critical': 'text-purple-600 bg-purple-100 border-purple-500'
  }
  return colors[severity] || 'text-gray-600 bg-gray-100 border-gray-500'
}
