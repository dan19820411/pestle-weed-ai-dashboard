'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PageTransition, { FadeIn } from '@/components/ui/PageTransition';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import StudentProfileCard from '@/components/progress/StudentProfileCard';
import SubjectPerformanceTable from '@/components/progress/SubjectPerformanceTable';
import AttendanceHeatmap from '@/components/progress/AttendanceHeatmap';
import TeacherCommentsTimeline from '@/components/progress/TeacherCommentsTimeline';
import ProgressChart from '@/components/progress/ProgressChart';
import { User } from 'lucide-react';

export default function StudentDetailPage() {
  const params = useParams();
  const studentId = params?.studentId as string;
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    if (studentId) {
      loadStudentData();
    }
  }, [studentId]);

  const loadStudentData = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockStudent = {
        studentId: studentId,
        name: 'Aarav Sharma',
        class: '10',
        section: 'A',
        rollNo: '1',
        dateOfBirth: '2008-05-15',
        parentContact: '+91 9876543210',
        email: 'aarav.sharma@example.com',
        address: '123 MG Road, Dehradun, Uttarakhand',
        admissionDate: '2020-04-01',
        bloodGroup: 'O+',
        overallPercentage: 85.5,
        attendance: 95,
        rank: 3
      };

      setStudent(mockStudent);
      setLoading(false);
      success(`Loaded ${mockStudent.name}'s profile`);
    } catch (err) {
      console.error('Error loading student:', err);
      
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSkeleton.Dashboard />;
  }

  if (!student) {
    return (
      <div className="text-center py-12">
        <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
          <User className="w-16 h-16 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Student Not Found</h3>
        <p className="text-gray-600">No student data available for ID: {studentId}</p>
      </div>
    );
  }

  return (
    <PageTransition>
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Progress Tracking</h1>
          <p className="text-gray-600 mt-2">Comprehensive view of student's academic journey</p>
        </div>
      </FadeIn>

      <div className="space-y-6">
        <FadeIn delay={0.1}>
          <StudentProfileCard student={student} />
        </FadeIn>

        <FadeIn delay={0.2}>
          <ProgressChart studentId={studentId} />
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FadeIn delay={0.3}>
            <SubjectPerformanceTable studentId={studentId} />
          </FadeIn>

          <FadeIn delay={0.4}>
            <AttendanceHeatmap studentId={studentId} />
          </FadeIn>
        </div>

        <FadeIn delay={0.5}>
          <TeacherCommentsTimeline studentId={studentId} />
        </FadeIn>
      </div>
    </PageTransition>
  );
}
