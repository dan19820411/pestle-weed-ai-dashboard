'use client';
import { useState } from 'react';
import AdministrativeReportGenerator from '@/components/reports/AdministrativeReportGenerator';
import PageTransition, { FadeIn } from '@/components/ui/PageTransition';

const dummyAdminData = [
  { category: 'Fee Collection', month: 'October', collected: 450000, pending: 50000, total: 500000, percentage: 90 },
  { category: 'Fee Collection', month: 'November', collected: 425000, pending: 75000, total: 500000, percentage: 85 },
  { category: 'Teacher Performance', teacher: 'Mr. Kumar', rating: 4.5, classes: 25, feedback: 'Excellent' },
  { category: 'Teacher Performance', teacher: 'Mrs. Sharma', rating: 4.8, classes: 30, feedback: 'Outstanding' },
  { category: 'Enrollment', class: '10A', enrolled: 30, capacity: 35, percentage: 85.7 },
  { category: 'Enrollment', class: '10B', enrolled: 28, capacity: 35, percentage: 80.0 },
];

export default function AdministrativeReportsPage() {
  return (
    <PageTransition>
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Administrative Reports</h1>
          <p className="text-gray-600 mt-2">Generate operational and administrative reports</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm text-gray-600 mb-2">Total Fee Collection</h3>
            <p className="text-3xl font-bold text-green-600">₹8.75L</p>
            <p className="text-sm text-gray-500 mt-1">This term</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm text-gray-600 mb-2">Pending Fees</h3>
            <p className="text-3xl font-bold text-orange-600">₹1.25L</p>
            <p className="text-sm text-gray-500 mt-1">Outstanding</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm text-gray-600 mb-2">Collection Rate</h3>
            <p className="text-3xl font-bold text-blue-600">87.5%</p>
            <p className="text-sm text-gray-500 mt-1">Overall</p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-semibold">Preview: Administrative Data</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Fee Collection Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>October 2025</span>
                  <span className="font-semibold">₹4.50L / ₹5.00L (90%)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>November 2025</span>
                  <span className="font-semibold">₹4.25L / ₹5.00L (85%)</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Teacher Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Mr. Kumar</span>
                  <span className="font-semibold">4.5⭐ (25 classes)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Mrs. Sharma</span>
                  <span className="font-semibold">4.8⭐ (30 classes)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <AdministrativeReportGenerator initialData={dummyAdminData} />
      </FadeIn>
    </PageTransition>
  );
}
