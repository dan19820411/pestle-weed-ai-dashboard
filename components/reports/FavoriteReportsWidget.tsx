'use client';

import React, { useState, useEffect } from 'react';

interface FavoriteReport {
  id: string;
  name: string;
  category: 'Attendance' | 'Academic' | 'Administrative' | 'Results';
  lastUsed: string;
  usageCount: number;
  icon: string;
}

export default function FavoriteReportsWidget() {
  const [favorites, setFavorites] = useState<FavoriteReport[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    // In real app, load from localStorage or API
    const mockFavorites: FavoriteReport[] = [
      {
        id: '1',
        name: 'Daily Attendance Summary',
        category: 'Attendance',
        lastUsed: '2 hours ago',
        usageCount: 45,
        icon: '📊'
      },
      {
        id: '2',
        name: 'Class Performance Report',
        category: 'Academic',
        lastUsed: '1 day ago',
        usageCount: 32,
        icon: '📈'
      },
      {
        id: '3',
        name: 'Student Progress Cards',
        category: 'Results',
        lastUsed: '3 days ago',
        usageCount: 28,
        icon: '📋'
      },
      {
        id: '4',
        name: 'Fee Collection Status',
        category: 'Administrative',
        lastUsed: '5 days ago',
        usageCount: 19,
        icon: '💰'
      }
    ];

    setFavorites(mockFavorites);
  };

  const handleGenerate = (reportId: string) => {
    console.log('Generating favorite report:', reportId);
    alert(`Generating report ${reportId}...`);
  };

  const handleUnfavorite = (reportId: string) => {
    setFavorites(favorites.filter(f => f.id !== reportId));
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: { bg: string; text: string } } = {
      'Attendance': { bg: 'bg-blue-100', text: 'text-blue-800' },
      'Academic': { bg: 'bg-green-100', text: 'text-green-800' },
      'Administrative': { bg: 'bg-purple-100', text: 'text-purple-800' },
      'Results': { bg: 'bg-orange-100', text: 'text-orange-800' }
    };
    return colors[category] || { bg: 'bg-gray-100', text: 'text-gray-800' };
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
              </svg>
              Favorite Reports
            </h3>
            <p className="text-purple-100 text-sm mt-1">Quick access to your most used reports</p>
          </div>
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center font-bold text-lg">
            {favorites.length}
          </div>
        </div>
      </div>

      <div className="p-4">
        {favorites.length === 0 ? (
          <div className="text-center py-8">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <p className="text-gray-600 font-medium">No favorite reports yet</p>
            <p className="text-sm text-gray-500 mt-1">Star reports you use frequently for quick access</p>
          </div>
        ) : (
          <div className="space-y-3">
            {favorites.map((report) => {
              const colors = getCategoryColor(report.category);
              
              return (
                <div
                  key={report.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                >
                  <div className="text-3xl">{report.icon}</div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm truncate">
                      {report.name}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span className={`px-2 py-0.5 ${colors.bg} ${colors.text} rounded-full font-medium`}>
                        {report.category}
                      </span>
                      <span>•</span>
                      <span>Used {report.usageCount}x</span>
                      <span>•</span>
                      <span>{report.lastUsed}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleGenerate(report.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Generate"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleUnfavorite(report.id)}
                      className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                      title="Remove from favorites"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {favorites.length > 0 && (
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
          <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm w-full text-center">
            Manage Favorites →
          </button>
        </div>
      )}
    </div>
  );
}
