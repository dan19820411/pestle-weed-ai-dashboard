'use client';

import React, { useState } from 'react';

export interface FilterOptions {
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  class?: string;
  section?: string;
  subject?: string;
  teacher?: string;
  term?: string;
  status?: string;
  search?: string;
}

interface ReportFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  availableFilters?: {
    showDateRange?: boolean;
    showClass?: boolean;
    showSubject?: boolean;
    showTeacher?: boolean;
    showTerm?: boolean;
    showStatus?: boolean;
    showSearch?: boolean;
  };
  classes?: string[];
  subjects?: string[];
  teachers?: string[];
  terms?: string[];
  statuses?: string[];
}

export default function ReportFilters({
  onFilterChange,
  availableFilters = {
    showDateRange: true,
    showClass: true,
    showSubject: false,
    showTeacher: false,
    showTerm: false,
    showStatus: false,
    showSearch: true,
  },
  classes = ['9-A', '9-B', '9-C', '10-A', '10-B', '10-C', '11-A', '11-B', '11-C', '12-A', '12-B', '12-C'],
  subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer Science', 'Physics', 'Chemistry'],
  teachers = [],
  terms = ['Term1', 'Term2'],
  statuses = ['Paid', 'Partial', 'Pending'],
}: ReportFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: {
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
    },
    class: 'All',
    subject: 'All',
    teacher: 'All',
    term: 'All',
    status: 'All',
    search: '',
  });

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDateChange = (type: 'startDate' | 'endDate', value: string) => {
    const newDateRange = { ...filters.dateRange!, [type]: value };
    const newFilters = { ...filters, dateRange: newDateRange };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      dateRange: {
        startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
      },
      class: 'All',
      subject: 'All',
      teacher: 'All',
      term: 'All',
      status: 'All',
      search: '',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  // Quick date presets
  const setDatePreset = (preset: 'today' | 'week' | 'month' | 'term' | 'year') => {
    const today = new Date();
    let startDate: Date;
    let endDate = today;

    switch (preset) {
      case 'today':
        startDate = today;
        break;
      case 'week':
        startDate = new Date(today.setDate(today.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(today.setMonth(today.getMonth() - 1));
        break;
      case 'term':
        startDate = new Date(today.setMonth(today.getMonth() - 6));
        break;
      case 'year':
        startDate = new Date(today.setFullYear(today.getFullYear() - 1));
        break;
    }

    const newDateRange = {
      startDate: startDate.toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
    };
    const newFilters = { ...filters, dateRange: newDateRange };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        <button
          onClick={handleReset}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Date Range */}
        {availableFilters.showDateRange && (
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date Range
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="date"
                  value={filters.dateRange?.startDate || ''}
                  onChange={(e) => handleDateChange('startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <span className="flex items-center text-gray-500">to</span>
              <div className="flex-1">
                <input
                  type="date"
                  value={filters.dateRange?.endDate || ''}
                  onChange={(e) => handleDateChange('endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
            {/* Quick presets */}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setDatePreset('today')}
                className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
              >
                Today
              </button>
              <button
                onClick={() => setDatePreset('week')}
                className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
              >
                Last 7 Days
              </button>
              <button
                onClick={() => setDatePreset('month')}
                className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
              >
                Last Month
              </button>
              <button
                onClick={() => setDatePreset('term')}
                className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
              >
                This Term
              </button>
            </div>
          </div>
        )}

        {/* Class Filter */}
        {availableFilters.showClass && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Class
            </label>
            <select
              value={filters.class || 'All'}
              onChange={(e) => handleFilterChange('class', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="All">All Classes</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Subject Filter */}
        {availableFilters.showSubject && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subject
            </label>
            <select
              value={filters.subject || 'All'}
              onChange={(e) => handleFilterChange('subject', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="All">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Teacher Filter */}
        {availableFilters.showTeacher && teachers.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Teacher
            </label>
            <select
              value={filters.teacher || 'All'}
              onChange={(e) => handleFilterChange('teacher', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="All">All Teachers</option>
              {teachers.map((teacher) => (
                <option key={teacher} value={teacher}>
                  {teacher}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Term Filter */}
        {availableFilters.showTerm && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Term
            </label>
            <select
              value={filters.term || 'All'}
              onChange={(e) => handleFilterChange('term', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="All">All Terms</option>
              {terms.map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Status Filter */}
        {availableFilters.showStatus && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filters.status || 'All'}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="All">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Search Box */}
        {availableFilters.showSearch && (
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.search || ''}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search by name or ID..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <svg
                className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      <div className="mt-4 flex flex-wrap gap-2">
        {filters.class && filters.class !== 'All' && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            Class: {filters.class}
            <button onClick={() => handleFilterChange('class', 'All')} className="hover:text-blue-900">
              ×
            </button>
          </span>
        )}
        {filters.subject && filters.subject !== 'All' && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            Subject: {filters.subject}
            <button onClick={() => handleFilterChange('subject', 'All')} className="hover:text-green-900">
              ×
            </button>
          </span>
        )}
        {filters.term && filters.term !== 'All' && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
            Term: {filters.term}
            <button onClick={() => handleFilterChange('term', 'All')} className="hover:text-purple-900">
              ×
            </button>
          </span>
        )}
        {filters.status && filters.status !== 'All' && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
            Status: {filters.status}
            <button onClick={() => handleFilterChange('status', 'All')} className="hover:text-yellow-900">
              ×
            </button>
          </span>
        )}
        {filters.search && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
            Search: "{filters.search}"
            <button onClick={() => handleFilterChange('search', '')} className="hover:text-gray-900">
              ×
            </button>
          </span>
        )}
      </div>
    </div>
  );
}
