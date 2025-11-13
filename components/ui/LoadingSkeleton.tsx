'use client';

import React from 'react';

interface LoadingSkeletonProps {
  type?: 'card' | 'table' | 'list' | 'stat' | 'chart' | 'text';
  count?: number;
  className?: string;
}

export default function LoadingSkeleton({ type = 'card', count = 1, className = '' }: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  const CardSkeleton = () => (
    <div className={`bg-white rounded-lg shadow-md p-6 animate-pulse ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );

  const TableSkeleton = () => (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden animate-pulse ${className}`}>
      <div className="bg-gray-300 h-12"></div>
      {skeletons.map((i) => (
        <div key={i} className="flex items-center gap-4 p-4 border-b border-gray-200">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            <div className="h-2 bg-gray-100 rounded w-1/4"></div>
          </div>
          <div className="w-20 h-8 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );

  const ListSkeleton = () => (
    <div className={`space-y-3 ${className}`}>
      {skeletons.map((i) => (
        <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow animate-pulse">
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            <div className="h-2 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const StatSkeleton = () => (
    <div className={`bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg shadow-lg p-6 animate-pulse ${className}`}>
      <div className="h-3 bg-white bg-opacity-30 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-white bg-opacity-40 rounded w-3/4 mb-2"></div>
      <div className="h-2 bg-white bg-opacity-20 rounded w-1/3"></div>
    </div>
  );

  const ChartSkeleton = () => (
    <div className={`bg-white rounded-lg shadow-md p-6 animate-pulse ${className}`}>
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-6"></div>
      <div className="flex items-end justify-between gap-2 h-48">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-gray-200 rounded-t"
            style={{ height: `${Math.random() * 100}%` }}
          ></div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-2 bg-gray-200 rounded w-8"></div>
        ))}
      </div>
    </div>
  );

  const TextSkeleton = () => (
    <div className={`space-y-2 animate-pulse ${className}`}>
      {skeletons.map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-11/12"></div>
          <div className="h-3 bg-gray-200 rounded w-10/12"></div>
        </div>
      ))}
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return skeletons.map((i) => <CardSkeleton key={i} />);
      case 'table':
        return <TableSkeleton />;
      case 'list':
        return <ListSkeleton />;
      case 'stat':
        return skeletons.map((i) => <StatSkeleton key={i} />);
      case 'chart':
        return skeletons.map((i) => <ChartSkeleton key={i} />);
      case 'text':
        return <TextSkeleton />;
      default:
        return skeletons.map((i) => <CardSkeleton key={i} />);
    }
  };

  return <>{renderSkeleton()}</>;
}

// Specific skeleton components for common use cases
export const CardGridSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <LoadingSkeleton type="card" count={count} />
  </div>
);

export const StatsRowSkeleton = ({ count = 4 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <LoadingSkeleton type="stat" count={count} />
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-6">
    <div className="animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-1/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
    </div>
    <StatsRowSkeleton />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <LoadingSkeleton type="chart" />
      <LoadingSkeleton type="chart" />
    </div>
    <LoadingSkeleton type="table" count={5} />
  </div>
);

// Add static properties to default export (after all declarations)
LoadingSkeleton.Card = () => <LoadingSkeleton type="card" count={1} />;
LoadingSkeleton.CardGrid = CardGridSkeleton;
LoadingSkeleton.StatsRow = StatsRowSkeleton;
LoadingSkeleton.Dashboard = DashboardSkeleton;
