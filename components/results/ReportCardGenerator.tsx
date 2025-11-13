'use client';

import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface SubjectResult {
  subject: string;
  theory_marks: number;
  practical_marks: number;
  total_marks: number;
  max_marks: number;
  percentage: number;
  grade: string;
  teacher_remarks: string;
}

interface ReportCardData {
  studentId: string;
  studentName: string;
  class: string;
  term: string;
  subjects: SubjectResult[];
  overallPercentage: number;
  overallGrade: string;
  rank?: number;
  totalStudents?: number;
  attendance?: number;
  conductGrade?: string;
  coScholastic?: {
    activity: string;
    grade: string;
  }[];
  principalRemarks?: string;
  nextTermStarts?: string;
}

interface ReportCardGeneratorProps {
  data?: ReportCardData | ReportCardData[];
  studentId?: string;
  term?: string;
  schoolName?: string;
  schoolAddress?: string;
  schoolLogo?: string;
}

// Default report card data
const defaultReportCardData: ReportCardData = {
  studentId: 'ST001',
  studentName: 'Aarav Sharma',
  class: '10-A',
  term: 'Term 1 - 2025',
  subjects: [
    { subject: 'Mathematics', theory_marks: 85, practical_marks: 18, total_marks: 103, max_marks: 120, percentage: 85.8, grade: 'A', teacher_remarks: 'Excellent performance' },
    { subject: 'Science', theory_marks: 78, practical_marks: 16, total_marks: 94, max_marks: 120, percentage: 78.3, grade: 'B+', teacher_remarks: 'Good understanding' },
    { subject: 'English', theory_marks: 82, practical_marks: 19, total_marks: 101, max_marks: 120, percentage: 84.2, grade: 'A', teacher_remarks: 'Very good' },
    { subject: 'Hindi', theory_marks: 75, practical_marks: 17, total_marks: 92, max_marks: 120, percentage: 76.7, grade: 'B+', teacher_remarks: 'Good progress' },
    { subject: 'Social Studies', theory_marks: 80, practical_marks: 18, total_marks: 98, max_marks: 120, percentage: 81.7, grade: 'A', teacher_remarks: 'Well done' }
  ],
  overallPercentage: 81.3,
  overallGrade: 'A',
  rank: 5,
  totalStudents: 30,
  attendance: 95,
  conductGrade: 'A',
  coScholastic: [
    { activity: 'Sports', grade: 'A' },
    { activity: 'Music', grade: 'B+' },
    { activity: 'Art', grade: 'A' }
  ],
  principalRemarks: 'Excellent performance. Keep up the good work!',
  nextTermStarts: 'January 10, 2025'
};

export default function ReportCardGenerator({ 
  data = defaultReportCardData,
  studentId,
  term,
  schoolName = 'Pestle Weed School',
  schoolAddress = 'Dehradun, Uttarakhand',
  schoolLogo 
}: ReportCardGeneratorProps) {
  const [generating, setGenerating] = useState(false);
  const [generationType, setGenerationType] = useState<'single' | 'bulk'>('single');
  
  // If studentId and term are provided but not data, use default data with those values
  if (studentId && term && !data) {
    data = { ...defaultReportCardData, studentId, term };
  }

  const generateReportCard = (studentData: ReportCardData, existingDoc?: jsPDF) => {
    const doc = existingDoc || new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Header
    doc.setFillColor(37, 99, 235); // Blue background
    doc.rect(0, 0, pageWidth, 35, 'F');
    
    // School name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(schoolName, pageWidth / 2, 15, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(schoolAddress, pageWidth / 2, 22, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('STUDENT REPORT CARD', pageWidth / 2, 30, { align: 'center' });
    
    // Reset text color
    doc.setTextColor(0, 0, 0);
    
    // Student Information Box
    const infoStartY = 45;
    doc.setFillColor(240, 240, 240);
    doc.rect(15, infoStartY, pageWidth - 30, 35, 'F');
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Student Information', 20, infoStartY + 8);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Name: ${studentData.studentName}`, 20, infoStartY + 16);
    doc.text(`Student ID: ${studentData.studentId}`, 20, infoStartY + 23);
    doc.text(`Class: ${studentData.class}`, 20, infoStartY + 30);
    
    doc.text(`Term: ${studentData.term}`, pageWidth / 2 + 10, infoStartY + 16);
    if (studentData.attendance) {
      doc.text(`Attendance: ${studentData.attendance}%`, pageWidth / 2 + 10, infoStartY + 23);
    }
    if (studentData.rank && studentData.totalStudents) {
      doc.text(`Rank: ${studentData.rank} / ${studentData.totalStudents}`, pageWidth / 2 + 10, infoStartY + 30);
    }
    
    // Academic Performance Table
    let currentY = infoStartY + 45;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Academic Performance', 20, currentY);
    
    currentY += 5;
    
    // Prepare table data
    const tableData = studentData.subjects.map(subject => [
      subject.subject,
      subject.theory_marks.toString(),
      subject.practical_marks.toString(),
      subject.total_marks.toString(),
      subject.max_marks.toString(),
      subject.percentage.toFixed(1) + '%',
      subject.grade,
    ]);
    
    autoTable(doc, {
      startY: currentY,
      head: [['Subject', 'Theory', 'Practical', 'Total', 'Max', 'Percentage', 'Grade']],
      body: tableData,
      theme: 'grid',
      headStyles: { 
        fillColor: [37, 99, 235],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: { 
        halign: 'center' 
      },
      columnStyles: {
        0: { halign: 'left', fontStyle: 'bold' },
      },
      margin: { left: 15, right: 15 },
    });
    
    currentY = (doc as any).lastAutoTable.finalY + 10;
    
    // Overall Performance Box
    doc.setFillColor(37, 99, 235);
    doc.rect(15, currentY, pageWidth - 30, 20, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('OVERALL RESULT', 20, currentY + 8);
    
    doc.setFontSize(16);
    doc.text(`${studentData.overallPercentage.toFixed(2)}%`, pageWidth / 2 + 20, currentY + 8);
    doc.text(`Grade: ${studentData.overallGrade}`, pageWidth / 2 + 20, currentY + 15);
    
    doc.setTextColor(0, 0, 0);
    currentY += 30;
    
    // Teacher Remarks
    if (studentData.subjects.length > 0 && currentY < pageHeight - 60) {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('Subject-wise Teacher Remarks:', 20, currentY);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      currentY += 6;
      
      studentData.subjects.forEach(subject => {
        if (subject.teacher_remarks && currentY < pageHeight - 40) {
          doc.text(`• ${subject.subject}: ${subject.teacher_remarks}`, 22, currentY);
          currentY += 5;
        }
      });
      
      currentY += 5;
    }
    
    // Co-Scholastic Activities (if space available)
    if (studentData.coScholastic && currentY < pageHeight - 50) {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('Co-Scholastic Activities:', 20, currentY);
      
      currentY += 6;
      
      const coScholasticData = studentData.coScholastic.map(item => [
        item.activity,
        item.grade
      ]);
      
      autoTable(doc, {
        startY: currentY,
        head: [['Activity', 'Grade']],
        body: coScholasticData,
        theme: 'grid',
        headStyles: { 
          fillColor: [124, 58, 237],
          textColor: [255, 255, 255],
          halign: 'center'
        },
        columnStyles: {
          0: { halign: 'left' },
          1: { halign: 'center' }
        },
        margin: { left: 15, right: 15 },
      });
      
      currentY = (doc as any).lastAutoTable.finalY + 10;
    }
    
    // Principal's Remarks (if space available)
    if (studentData.principalRemarks && currentY < pageHeight - 35) {
      doc.setFillColor(254, 243, 199);
      doc.rect(15, currentY, pageWidth - 30, 20, 'F');
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text("Principal's Remarks:", 20, currentY + 6);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      const remarksLines = doc.splitTextToSize(studentData.principalRemarks, pageWidth - 40);
      doc.text(remarksLines, 20, currentY + 12);
      
      currentY += 25;
    }
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('_____________________', 20, pageHeight - 20);
    doc.text("Class Teacher's Sign", 20, pageHeight - 15);
    
    doc.text('_____________________', pageWidth / 2 - 20, pageHeight - 20);
    doc.text("Principal's Sign", pageWidth / 2 - 20, pageHeight - 15);
    
    doc.text('_____________________', pageWidth - 60, pageHeight - 20);
    doc.text("Parent's Sign", pageWidth - 60, pageHeight - 15);
    
    doc.setFontSize(7);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 8, { align: 'center' });
    
    if (studentData.nextTermStarts) {
      doc.text(`Next term starts: ${studentData.nextTermStarts}`, pageWidth / 2, pageHeight - 5, { align: 'center' });
    }
    
    return doc;
  };

  const handleGenerate = async (type: 'single' | 'bulk' | 'preview') => {
    setGenerating(true);
    
    try {
      const dataArray = Array.isArray(data) ? data : [data];
      
      if (type === 'preview') {
        // Generate preview for first student
        const doc = generateReportCard(dataArray[0]);
        window.open(doc.output('bloburl'), '_blank');
      } else if (type === 'single') {
        // Generate single PDF
        const doc = generateReportCard(dataArray[0]);
        doc.save(`Report_Card_${dataArray[0].studentId}_${dataArray[0].term}.pdf`);
      } else {
        // Generate bulk PDFs (one file with multiple pages)
        const doc = new jsPDF();
        
        dataArray.forEach((studentData, index) => {
          if (index > 0) {
            doc.addPage();
          }
          
          // Generate report card content for this student on the current page
          generateReportCard(studentData, doc);
        });
        
        doc.save(`Bulk_Report_Cards_${dataArray[0].term}.pdf`);
      }
    } catch (error) {
      console.error('Error generating report card:', error);
      alert('Error generating report card. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const isBulkData = Array.isArray(data);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Report Card Generator</h3>
			<p className="text-sm text-gray-600 mt-1">
			  {isBulkData 
				? `Generate report cards for ${Array.isArray(data) ? data.length : 1} students`
				: 'Generate printable report card'
			  }
			</p>
        </div>
        
        <div className="flex items-center gap-2">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      </div>

      {/* Preview Section */}
      {!isBulkData && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Student Details</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-600">Name:</span>
              <span className="font-medium text-gray-900 ml-2">{(data as ReportCardData).studentName}</span>
            </div>
            <div>
              <span className="text-gray-600">Student ID:</span>
              <span className="font-medium text-gray-900 ml-2">{(data as ReportCardData).studentId}</span>
            </div>
            <div>
              <span className="text-gray-600">Class:</span>
              <span className="font-medium text-gray-900 ml-2">{(data as ReportCardData).class}</span>
            </div>
            <div>
              <span className="text-gray-600">Term:</span>
              <span className="font-medium text-gray-900 ml-2">{(data as ReportCardData).term}</span>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => handleGenerate('preview')}
          disabled={generating}
          className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          {generating ? 'Generating...' : 'Preview Report Card'}
        </button>

        <button
          onClick={() => handleGenerate(isBulkData ? 'bulk' : 'single')}
          disabled={generating}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {generating 
            ? 'Generating...' 
            : isBulkData 
              ? `Download All (${data.length} Report Cards)` 
              : 'Download PDF Report Card'
          }
        </button>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h5 className="font-semibold text-blue-900 text-sm mb-1">Report Card Features</h5>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Professional PDF format with school branding</li>
              <li>• Complete academic performance with grades</li>
              <li>• Subject-wise marks breakdown (Theory + Practical)</li>
              <li>• Teacher remarks and overall assessment</li>
              <li>• Signature sections for teacher, principal, and parents</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
