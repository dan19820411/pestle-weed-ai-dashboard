'use client';
import { useState } from 'react';
import AttendanceReportGenerator from '@/components/reports/AttendanceReportGenerator';
import PageTransition, { FadeIn } from '@/components/ui/PageTransition';

const dummyAttendanceData = [
  { date: '2025-11-11', class: '10A', present: 28, absent: 2, total: 30, percentage: 93.3 },
  { date: '2025-11-11', class: '10B', present: 25, absent: 3, total: 28, percentage: 89.3 },
  { date: '2025-11-12', class: '10A', present: 29, absent: 1, total: 30, percentage: 96.7 },
  { date: '2025-11-12', class: '10B', present: 27, absent: 1, total: 28, percentage: 96.4 },
  { date: '2025-11-13', class: '10A', present: 27, absent: 3, total: 30, percentage: 90.0 },
  { date: '2025-11-13', class: '10B', present: 26, absent: 2, total: 28, percentage: 92.9 },
];

export default function AttendanceReportsPage() {
  const [filters, setFilters] = useState({ class: 'All', dateRange: 'Last 7 Days' });

  return (
    <PageTransition>
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Attendance Reports</h1>
          <p className="text-gray-600 mt-2">Generate comprehensive attendance reports and analysis</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Report Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
              <select value={filters.class} onChange={(e) => setFilters({...filters, class: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                <option>All Classes</option>
                <option>Class 10A</option>
                <option>Class 10B</option>
                <option>Class 9A</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select value={filters.dateRange} onChange={(e) => setFilters({...filters, dateRange: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Month</option>
                <option>Custom Range</option>
              </select>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-semibold">Preview: Recent Attendance Data</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Present</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Absent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dummyAttendanceData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{row.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.class}</td>
                    <td className="px-6 py-4 text-sm text-green-600 font-semibold">{row.present}</td>
                    <td className="px-6 py-4 text-sm text-red-600 font-semibold">{row.absent}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.total}</td>
                    <td className="px-6 py-4 text-sm font-semibold">{row.percentage.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <AttendanceReportGenerator initialData={dummyAttendanceData} />
      </FadeIn>
    </PageTransition>
  );
}
