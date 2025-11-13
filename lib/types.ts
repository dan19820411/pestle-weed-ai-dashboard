// Student Types
export interface Student {
  id: string;
  name: string;
  grade: number;
  section: string;
  rollNo: string;
  gender: string;
  dob: string;
  parentName: string;
  parentContact: string;
  parentEmail: string;
  address: string;
  admissionDate: string;
  bloodGroup: string;
}

// Teacher Types
export interface Teacher {
  id: string;
  name: string;
  subject: string;
  qualification: string;
  experience: number;
  email: string;
  phone: string;
  joiningDate: string;
  specialization: string;
  gradesTaught: string;
}

// Assessment Types (360° Holistic Progress Card)
export interface Assessment {
  studentId: string;
  subject: string;
  cognitive: number;
  creative: number;
  emotional: number;
  physical: number;
  social: number;
  overall: number;
  proficiencyLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  quarter: string;
  assessmentDate: string;
}

// Attendance Types
export interface Attendance {
  id: string;
  type: 'student' | 'teacher';
  date: string;
  status: 'Present' | 'Absent' | 'Late';
  remarks: string;
}

// Learning Progress Types
export interface LearningProgress {
  studentId: string;
  subject: string;
  chaptersCompleted: number;
  totalChapters: number;
  currentTopic: string;
  timeSpent: number;
  lastAccessed: string;
  progressPercent: number;
  strengthAreas: string;
  improvementAreas: string;
}

// Vocational Course Types
export interface VocationalCourse {
  courseId: string;
  courseName: string;
  category: string;
  duration: string;
  enrolledStudents: number;
  instructor: string;
  startDate: string;
  endDate: string;
  skillLevel: string;
  certificationAvailable: string;
  description: string;
}

// NEP Compliance Types
export interface NEPCompliance {
  metricId: string;
  category: string;
  metricName: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  status: 'Achieved' | 'On Track' | 'Needs Improvement';
  lastUpdated: string;
  quarter: string;
  compliancePercent: number;
  notes: string;
}

// Alert Types
export interface Alert {
  alertId: string;
  studentId: string;
  studentName: string;
  grade: number;
  alertType: 'Academic' | 'Attendance' | 'Behavioral' | 'Engagement';
  severity: 'Low' | 'Medium' | 'High';
  description: string;
  recommendedAction: string;
  createdDate: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Completed' | 'Monitoring';
  assignedTo: string;
}

// Dashboard Data Types
export interface StudentDashboardData {
  student: Student;
  assessments: Assessment[];
  learningProgress: LearningProgress[];
  attendance: Attendance[];
  vocationalCourses: VocationalCourse[];
}

export interface PrincipalDashboardData {
  students: Student[];
  teachers: Teacher[];
  assessments: Assessment[];
  attendance: Attendance[];
  learningProgress: LearningProgress[];
  vocationalCourses: VocationalCourse[];
  nepCompliance: NEPCompliance[];
  alerts: Alert[];
}

// Chart Data Types
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

// Filter Types
export interface FilterOptions {
  grade?: number;
  section?: string;
  subject?: string;
  status?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

// Stats Types
export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  averageAttendance: number;
  averagePerformance: number;
  activeAlerts: number;
  nepComplianceScore: number;
}

// Subject Types
export interface Subject {
  subjectId: string;
  subjectName: string;
  icon: string;
  color: string;
  totalChapters: number;
  description: string;
}

// Chapter Types
export interface Chapter {
  chapterId: string;
  subjectId: string;
  chapterNumber: number;
  chapterTitle: string;
  description: string;
  estimatedMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}
