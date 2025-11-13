'use client';

import React, { ReactNode, ComponentType, SVGProps } from 'react';

interface EmptyStateProps {
  icon?: ReactNode | ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className = '',
  size = 'md'
}: EmptyStateProps) {
  const sizeClasses = {
    sm: {
      container: 'py-8',
      icon: 'w-12 h-12 mb-3',
      title: 'text-base',
      description: 'text-sm',
      button: 'py-2 px-4 text-sm'
    },
    md: {
      container: 'py-12',
      icon: 'w-16 h-16 mb-4',
      title: 'text-lg',
      description: 'text-base',
      button: 'py-2 px-6 text-base'
    },
    lg: {
      container: 'py-16',
      icon: 'w-20 h-20 mb-6',
      title: 'text-xl',
      description: 'text-lg',
      button: 'py-3 px-8 text-lg'
    }
  };

  const sizes = sizeClasses[size];

  const defaultIcon = (
    <svg className={`${sizes.icon} text-gray-300 mx-auto`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
  );

  // Render icon - handle both component and element
  const renderIcon = () => {
    if (!icon) return defaultIcon;
    
    // If icon is a function/component, render it
    if (typeof icon === 'function') {
      const IconComponent = icon as ComponentType<SVGProps<SVGSVGElement>>;
      return <IconComponent className={`${sizes.icon} text-gray-300 mx-auto`} />;
    }
    
    // Otherwise render as-is (ReactNode)
    return icon;
  };

  return (
    <div className={`text-center ${sizes.container} ${className}`}>
      {renderIcon()}
      
      <h3 className={`font-semibold text-gray-900 mb-2 ${sizes.title}`}>
        {title}
      </h3>
      
      {description && (
        <p className={`text-gray-600 mb-6 max-w-md mx-auto ${sizes.description}`}>
          {description}
        </p>
      )}
      
      {action && (
        <button
          onClick={action.onClick}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors ${sizes.button}`}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// Preset empty states for common scenarios
export function NoDataFound({ onRefresh }: { onRefresh?: () => void }) {
  return (
    <EmptyState
      icon={
        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      }
      title="No Data Found"
      description="There is no data to display at the moment. Try adjusting your filters or refresh the page."
      action={onRefresh ? { label: 'Refresh', onClick: onRefresh } : undefined}
    />
  );
}

export function NoResults({ searchTerm, onClear }: { searchTerm?: string; onClear?: () => void }) {
  return (
    <EmptyState
      icon={
        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      }
      title="No Results Found"
      description={
        searchTerm
          ? `No results found for "${searchTerm}". Try adjusting your search.`
          : "No results match your current filters."
      }
      action={onClear ? { label: 'Clear Filters', onClick: onClear } : undefined}
    />
  );
}

export function NoStudents({ onAddStudent }: { onAddStudent?: () => void }) {
  return (
    <EmptyState
      icon={
        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      }
      title="No Students Yet"
      description="Get started by adding your first student to the system."
      action={onAddStudent ? { label: 'Add Student', onClick: onAddStudent } : undefined}
    />
  );
}

export function NoReports({ onGenerateReport }: { onGenerateReport?: () => void }) {
  return (
    <EmptyState
      icon={
        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      }
      title="No Reports Generated"
      description="You haven't generated any reports yet. Create your first report to see it here."
      action={onGenerateReport ? { label: 'Generate Report', onClick: onGenerateReport } : undefined}
    />
  );
}

export function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <EmptyState
      icon={
        <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      }
      title="Something Went Wrong"
      description={message || "We encountered an error loading this data. Please try again."}
      action={onRetry ? { label: 'Try Again', onClick: onRetry } : undefined}
    />
  );
}

export function ComingSoon({ feature }: { feature: string }) {
  return (
    <EmptyState
      icon={
        <svg className="w-16 h-16 text-blue-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      }
      title="Coming Soon"
      description={`${feature} is currently under development. Stay tuned for updates!`}
    />
  );
}
