import Papa from 'papaparse'

// Load CSV data helper function
async function loadCSV<T>(filename: string): Promise<T[]> {
  const response = await fetch(`/data/${filename}`)
  const text = await response.text()
  
  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data as T[]),
      error: (error: Error) => reject(error)
    })
  })
}

// Student data loader
export async function loadStudents() {
  return loadCSV<any>('students.csv')
}

// Teacher data loader
export async function loadTeachers() {
  return loadCSV<any>('teachers.csv')
}

// Assessment data loader
export async function loadAssessments() {
  return loadCSV<any>('assessments.csv')
}

// Attendance data loader
export async function loadAttendance() {
  return loadCSV<any>('attendance.csv')
}

// Learning progress loader
export async function loadLearningProgress() {
  return loadCSV<any>('learning_progress.csv')
}

// Vocational courses loader
export async function loadVocationalCourses() {
  return loadCSV<any>('vocational_courses.csv')
}

// NEP compliance loader
export async function loadNEPCompliance() {
  return loadCSV<any>('nep_compliance.csv')
}

// Alerts loader
export async function loadAlerts() {
  return loadCSV<any>('alerts.csv')
}

// Helper: Get student by ID
export async function getStudentById(id: string) {
  const students = await loadStudents()
  return students.find((s) => s.id === id)
}

// Helper: Get assessments for student
export async function getStudentAssessments(studentId: string) {
  const assessments = await loadAssessments()
  return assessments.filter((a) => a.studentId === studentId)
}

// Helper: Get learning progress for student
export async function getStudentProgress(studentId: string) {
  const progress = await loadLearningProgress()
  return progress.filter((p) => p.studentId === studentId)
}

// Helper: Get school-wide statistics
export async function getSchoolStats() {
  const [students, teachers, assessments, attendance] = await Promise.all([
    loadStudents(),
    loadTeachers(),
    loadAssessments(),
    loadAttendance()
  ])

  const studentAttendance = attendance.filter((a) => a.type === 'student')
  const presentCount = studentAttendance.filter((a) => a.status === 'Present').length
  const attendanceRate = (presentCount / studentAttendance.length) * 100

  return {
    totalStudents: students.length,
    totalTeachers: teachers.length,
    attendanceRate: attendanceRate.toFixed(1),
    assessmentCount: assessments.length
  }
}

// Helper: Get class-wise distribution
export async function getClassDistribution() {
  const students = await loadStudents()
  const distribution: Record<string, number> = {}
  
  students.forEach((student) => {
    const className = `Class ${student.class}`
    distribution[className] = (distribution[className] || 0) + 1
  })
  
  return distribution
}

// Subjects data loader
export async function loadSubjects() {
  return loadCSV<any>('subjects.csv')
}

// Chapters data loader
export async function loadChapters() {
  return loadCSV<any>('chapters.csv')
}

// Get chapters by subject
export async function getChaptersBySubject(subjectId: string) {
  const chapters = await loadChapters()
  return chapters.filter((ch: any) => ch.subjectId === subjectId)
}

// Get single chapter
export async function getChapter(subjectId: string, chapterId: string) {
  const chapters = await loadChapters()
  return chapters.find((ch: any) => ch.subjectId === subjectId && ch.chapterId === chapterId)
}
