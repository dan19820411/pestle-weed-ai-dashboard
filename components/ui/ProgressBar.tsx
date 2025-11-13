'use client';

import React, { useState, useEffect } from 'react';

interface ProgressBarProps {
  isLoading?: boolean;
  color?: string;
  height?: number;
}

export default function ProgressBar({ 
  isLoading = false, 
  color = '#2563eb',
  height = 3 
}: ProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
      setProgress(0);

      // Simulate progress
      const intervals: NodeJS.Timeout[] = [];
      
      // Fast initial progress
      intervals.push(setTimeout(() => setProgress(30), 100));
      intervals.push(setTimeout(() => setProgress(50), 300));
      intervals.push(setTimeout(() => setProgress(70), 600));
      intervals.push(setTimeout(() => setProgress(85), 1000));

      return () => {
        intervals.forEach(clearTimeout);
      };
    } else {
      // Complete the progress
      setProgress(100);
      
      // Hide after animation
      const timer = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!isVisible && progress === 0) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div
        className="transition-all duration-300 ease-out"
        style={{
          height: `${height}px`,
          width: `${progress}%`,
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`
        }}
      />
    </div>
  );
}

// Linear indeterminate progress bar
export function IndeterminateProgressBar({ color = '#2563eb', height = 3 }: { color?: string; height?: number }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 overflow-hidden" style={{ height: `${height}px` }}>
      <div
        className="h-full animate-progress-indeterminate"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
          width: '30%'
        }}
      />
      <style jsx>{`
        @keyframes progress-indeterminate {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(400%);
          }
        }
        .animate-progress-indeterminate {
          animation: progress-indeterminate 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Circular progress
export function CircularProgress({ 
  size = 40, 
  strokeWidth = 4,
  progress = 0,
  color = '#2563eb',
  showPercentage = true
}: {
  size?: number;
  strokeWidth?: number;
  progress?: number;
  color?: string;
  showPercentage?: boolean;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-300"
        />
      </svg>
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold" style={{ color }}>
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
}

// Spinner
export function Spinner({ 
  size = 'md', 
  color = 'blue' 
}: { 
  size?: 'sm' | 'md' | 'lg'; 
  color?: 'blue' | 'white' | 'gray';
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'border-blue-600',
    white: 'border-white',
    gray: 'border-gray-600'
  };

  return (
    <div
      className={`${sizeClasses[size]} border-2 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`}
    />
  );
}
