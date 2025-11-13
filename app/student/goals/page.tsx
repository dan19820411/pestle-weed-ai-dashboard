'use client'

import { useState } from 'react'
import { Target, Trophy, Star, Plus, CheckCircle, Clock, X } from 'lucide-react'

export default function GoalsPage() {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Complete Mathematics Chapter 5', progress: 80, deadline: '2025-01-20', status: 'in-progress' },
    { id: 2, title: 'Score 90+ in Science Quiz', progress: 100, deadline: '2025-01-15', status: 'completed' },
    { id: 3, title: 'Finish Reading Assignment', progress: 60, deadline: '2025-01-25', status: 'in-progress' },
    { id: 4, title: 'Practice 10 Math Problems Daily', progress: 40, deadline: '2025-02-01', status: 'in-progress' },
  ])

  const [achievements] = useState([
    { id: 1, title: 'Perfect Attendance - Month', icon: Trophy, color: 'yellow', date: '2025-01-10' },
    { id: 2, title: 'Top Scorer - Science', icon: Star, color: 'blue', date: '2025-01-05' },
    { id: 3, title: 'Best Project Award', icon: Target, color: 'purple', date: '2024-12-20' },
  ])

  // ✅ FIXED: Add modal state and handlers
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: '',
    deadline: '',
    progress: 0
  })

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.deadline) {
      const goal = {
        id: goals.length + 1,
        title: newGoal.title,
        progress: newGoal.progress,
        deadline: newGoal.deadline,
        status: 'in-progress'
      }
      setGoals([...goals, goal])
      setNewGoal({ title: '', deadline: '', progress: 0 })
      setIsModalOpen(false)
    } else {
      alert('Please fill in all required fields')
    }
  }

  const completedGoals = goals.filter(g => g.status === 'completed').length
  const totalGoals = goals.length

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Goals & Achievements</h1>
        <p className="text-gray-600">Track your learning milestones and celebrate successes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Goals Progress</h3>
            <Target className="text-blue-500 w-6 h-6" />
          </div>
          <p className="text-4xl font-bold text-gray-800">{completedGoals}/{totalGoals}</p>
          <p className="text-sm text-gray-500 mt-1">Goals Completed</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Achievements</h3>
            <Trophy className="text-yellow-500 w-6 h-6" />
          </div>
          <p className="text-4xl font-bold text-gray-800">{achievements.length}</p>
          <p className="text-sm text-gray-500 mt-1">Badges Earned</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Success Rate</h3>
            <Star className="text-purple-500 w-6 h-6" />
          </div>
          <p className="text-4xl font-bold text-gray-800">{Math.round((completedGoals / totalGoals) * 100)}%</p>
          <p className="text-sm text-gray-500 mt-1">Completion Rate</p>
        </div>
      </div>

      {/* Active Goals */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">My Goals</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="w-5 h-5" />
            <span>Add Goal</span>
          </button>
        </div>

        <div className="space-y-4">
          {goals.map(goal => (
            <div key={goal.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{goal.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                    </div>
                    {goal.status === 'completed' && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Completed</span>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-2xl font-bold text-gray-800">{goal.progress}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    goal.status === 'completed' ? 'bg-green-500' : 'bg-blue-600'
                  }`}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map(achievement => {
            const Icon = achievement.icon
            const colorClasses = {
              yellow: 'bg-yellow-100 text-yellow-600',
              blue: 'bg-blue-100 text-blue-600',
              purple: 'bg-purple-100 text-purple-600',
            }[achievement.color]

            return (
              <div key={achievement.id} className="bg-white rounded-lg shadow p-6 text-center">
                <div className={`inline-flex p-4 rounded-full ${colorClasses} mb-4`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-500">{new Date(achievement.date).toLocaleDateString()}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* ✅ FIXED: Add Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Add New Goal</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goal Title *
                </label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Complete Math Assignment"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline *
                </label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Progress (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newGoal.progress}
                  onChange={(e) => setNewGoal({ ...newGoal, progress: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGoal}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}