'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageTransition, { FadeIn, StaggerChildren } from '@/components/ui/PageTransition';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { 
  FileText,
  Calendar,
  GraduationCap,
  ClipboardList,  // ✅ FIXED: was ClipboardDocumentListIcon
  BarChart3,
  ArrowRight  // ✅ FIXED: was ArrowRightIcon
} from 'lucide-react';

const reportCategories = [
  {
    id: 'attendance',
    title: 'Attendance Reports',
    description: 'Generate comprehensive attendance reports for students and classes',
    icon: Calendar,
    color: 'blue',
    href: '/principal/reports/attendance',
    reports: [
      'Daily Attendance Summary',
      'Monthly Attendance Report',
      'Class-wise Attendance',
      'Student Attendance History'
    ]
  },
  {
    id: 'academic',
    title: 'Academic Reports',
    description: 'Access detailed academic performance and subject-wise analysis',
    icon: GraduationCap,
    color: 'green',
    href: '/principal/reports/academic',
    reports: [
      'Subject Performance Analysis',
      'Grade Distribution',
      'Topper Lists',
      'Comparative Analysis'
    ]
  },
  {
    id: 'administrative',
    title: 'Administrative Reports',
    description: 'Generate administrative and operational reports',
    icon: ClipboardList,  // ✅ FIXED: was ClipboardDocumentListIcon
    color: 'purple',
    href: '/principal/reports/administrative',
    reports: [
      'Fee Collection Report',
      'Teacher Performance',
      'Enrollment Statistics',
      'Infrastructure Usage'
    ]
  }
];

export default function ReportsOverviewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      
    }, 600);
  }, []);  // ✅ FIXED: removed 'success' from dependency array

  if (loading) {
    return <LoadingSkeleton.Dashboard />;
  }

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; icon: string; border: string; hover: string }> = {
      blue: {
        bg: 'bg-blue-50',
        icon: 'text-blue-600',
        border: 'border-blue-200',
        hover: 'hover:border-blue-400'
      },
      green: {
        bg: 'bg-green-50',
        icon: 'text-green-600',
        border: 'border-green-200',
        hover: 'hover:border-green-400'
      },
      purple: {
        bg: 'bg-purple-50',
        icon: 'text-purple-600',
        border: 'border-purple-200',
        hover: 'hover:border-purple-400'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <PageTransition>
      <FadeIn>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="mt-2 text-sm text-gray-600">
            Generate and access comprehensive reports for your school
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Reports</dt>
                  <dd className="text-2xl font-semibold text-gray-900">27</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Categories</dt>
                  <dd className="text-2xl font-semibold text-gray-900">3</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">This Month</dt>
                  <dd className="text-2xl font-semibold text-gray-900">0</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
                <ClipboardList className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Favorites</dt>
                  <dd className="text-2xl font-semibold text-gray-900">0</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access to Report Corner */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Report Corner</h3>
              <p className="text-blue-100">
                Access saved report templates, favorites, and recent reports
              </p>
            </div>
            <button
              onClick={() => router.push('/principal/report-corner')}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              Open Report Corner
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Report Categories */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Report Categories</h2>
          
          <StaggerChildren>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportCategories.map((category) => {
                const colors = getColorClasses(category.color);
                const Icon = category.icon;

                return (
                  <div
                    key={category.id}
                    onClick={() => router.push(category.href)}
                    className={`
                      bg-white rounded-lg shadow-md border-2 ${colors.border} ${colors.hover}
                      cursor-pointer transition-all transform hover:scale-105 hover:shadow-lg
                    `}
                  >
                    <div className="p-6">
                      {/* Icon */}
                      <div className={`${colors.bg} rounded-lg p-3 w-fit mb-4`}>
                        <Icon className={`h-8 w-8 ${colors.icon}`} />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {category.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4">
                        {category.description}
                      </p>

                      {/* Available Reports */}
                      <div className="space-y-2 mb-4">
                        <p className="text-xs font-medium text-gray-500 uppercase">
                          Available Reports:
                        </p>
                        <ul className="space-y-1">
                          {category.reports.map((report, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start">
                              <span className="text-gray-400 mr-2">•</span>
                              {report}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Button */}
                      <button className={`
                        w-full py-2 px-4 rounded-lg font-medium transition-colors
                        ${colors.icon} bg-gray-50 hover:bg-gray-100
                        flex items-center justify-center gap-2
                      `}>
                        Generate Reports
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </StaggerChildren>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Need Help?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-700 mb-1">Report Formats</p>
              <p>All reports can be exported as CSV or PDF formats for easy sharing and archiving.</p>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-1">Customization</p>
              <p>Use filters to customize reports by class, section, date range, and other parameters.</p>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-1">Scheduling</p>
              <p>Save frequently used report configurations as templates in Report Corner.</p>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-1">Data Accuracy</p>
              <p>Reports reflect real-time data from the system's database for accurate insights.</p>
            </div>
          </div>
        </div>
      </FadeIn>
    </PageTransition>
  );
}