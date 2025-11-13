'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ReportShortcutProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'pink';
  count?: number;
  lastGenerated?: string;
  onClick: () => void;
}

export default function ReportShortcut({
  title,
  description,
  icon,
  color,
  count,
  lastGenerated,
  onClick
}: ReportShortcutProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      hoverBg: 'hover:bg-blue-100',
      iconBg: 'bg-blue-600',
      hoverIconBg: 'hover:bg-blue-700',
      text: 'text-blue-600',
      border: 'border-blue-200'
    },
    green: {
      bg: 'bg-green-50',
      hoverBg: 'hover:bg-green-100',
      iconBg: 'bg-green-600',
      hoverIconBg: 'hover:bg-green-700',
      text: 'text-green-600',
      border: 'border-green-200'
    },
    purple: {
      bg: 'bg-purple-50',
      hoverBg: 'hover:bg-purple-100',
      iconBg: 'bg-purple-600',
      hoverIconBg: 'hover:bg-purple-700',
      text: 'text-purple-600',
      border: 'border-purple-200'
    },
    orange: {
      bg: 'bg-orange-50',
      hoverBg: 'hover:bg-orange-100',
      iconBg: 'bg-orange-600',
      hoverIconBg: 'hover:bg-orange-700',
      text: 'text-orange-600',
      border: 'border-orange-200'
    },
    red: {
      bg: 'bg-red-50',
      hoverBg: 'hover:bg-red-100',
      iconBg: 'bg-red-600',
      hoverIconBg: 'hover:bg-red-700',
      text: 'text-red-600',
      border: 'border-red-200'
    },
    pink: {
      bg: 'bg-pink-50',
      hoverBg: 'hover:bg-pink-100',
      iconBg: 'bg-pink-600',
      hoverIconBg: 'hover:bg-pink-700',
      text: 'text-pink-600',
      border: 'border-pink-200'
    }
  };

  const colors = colorClasses[color];

  return (
    <button
      onClick={onClick}
      className={`w-full ${colors.bg} ${colors.hoverBg} border-2 ${colors.border} rounded-lg p-5 transition-all hover:shadow-lg group text-left`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 ${colors.iconBg} ${colors.hoverIconBg} rounded-lg flex items-center justify-center text-white transition-colors shadow-md`}>
          {icon}
        </div>
        
        {count !== undefined && (
          <div className="text-right">
            <div className={`text-2xl font-bold ${colors.text}`}>{count}</div>
            <div className="text-xs text-gray-600">Available</div>
          </div>
        )}
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-gray-700">
        {title}
      </h3>
      
      <p className="text-sm text-gray-600 mb-3">
        {description}
      </p>

      {lastGenerated && (
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Last generated: {lastGenerated}
        </div>
      )}

      <div className={`mt-3 flex items-center gap-2 ${colors.text} font-semibold text-sm`}>
        <span>Generate Report</span>
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}
