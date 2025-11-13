'use client'

import { ArrowLeft, BookOpen } from 'lucide-react'
import Link from 'next/link'
import LessonViewer from '@/components/student/LessonViewer'
import { useParams } from 'next/navigation'

const CHAPTER_CONTENT: Record<string, any> = {
  'MATH_CH1': {
    id: 'MATH_CH1',
    name: 'Number Systems',
    subject: 'Mathematics',
    description: 'Learn about different types of numbers including integers, fractions, decimals, and their properties.',
    content: 'Natural numbers, whole numbers, integers, rational and irrational numbers form the foundation of mathematics. Understanding number systems helps in performing operations and solving real-world problems.'
  },
  'MATH_CH2': {
    id: 'MATH_CH2',
    name: 'Algebra Basics',
    subject: 'Mathematics',
    description: 'Introduction to algebraic expressions, variables, and simple equations.',
    content: 'Algebra uses letters and symbols to represent numbers and quantities in formulas and equations. Master the basics of simplifying expressions, solving equations, and understanding variables.'
  },
  'MATH_CH3': {
    id: 'MATH_CH3',
    name: 'Geometry Fundamentals',
    subject: 'Mathematics',
    description: 'Explore basic geometric shapes, angles, and fundamental theorems.',
    content: 'Geometry deals with shapes, sizes, and properties of space. Learn about points, lines, angles, triangles, quadrilaterals, and circles along with their properties and relationships.'
  },
  'MATH_CH4': {
    id: 'MATH_CH4',
    name: 'Measurements',
    subject: 'Mathematics',
    description: 'Understanding units of measurement for length, area, volume, and conversions.',
    content: 'Measurement is essential for quantifying physical quantities. Learn metric and imperial units, conversions between units, and calculating perimeter, area, and volume.'
  },
  'SCI_CH1': {
    id: 'SCI_CH1',
    name: 'Matter and Its Properties',
    subject: 'Science',
    description: 'Discover the three states of matter and their unique characteristics.',
    content: 'Matter exists in three states: solid, liquid, and gas. Each state has distinct properties based on particle arrangement and movement. Learn about melting, freezing, evaporation, and condensation.'
  },
  'SCI_CH2': {
    id: 'SCI_CH2',
    name: 'Force and Motion',
    subject: 'Science',
    description: 'Understanding Newton\'s laws of motion and different types of forces.',
    content: 'Force is a push or pull that can change the motion of an object. Study Newton\'s three laws of motion, friction, gravity, and how forces affect the movement of objects.'
  },
  'SCI_CH3': {
    id: 'SCI_CH3',
    name: 'Light and Reflection',
    subject: 'Science',
    description: 'Learn about the properties of light and principles of reflection.',
    content: 'Light travels in straight lines and can be reflected, refracted, and absorbed. Understand the laws of reflection, mirrors, and how light interacts with different surfaces.'
  },
  'SCI_CH4': {
    id: 'SCI_CH4',
    name: 'Living Organisms',
    subject: 'Science',
    description: 'Classification and characteristics of living things.',
    content: 'Living organisms share common characteristics: growth, reproduction, response to stimuli, and metabolism. Learn about the five kingdoms and how scientists classify life.'
  },
  'ENG_CH1': {
    id: 'ENG_CH1',
    name: 'Grammar Essentials',
    subject: 'English',
    description: 'Master the building blocks of language: parts of speech and sentence structure.',
    content: 'Grammar provides the rules for constructing meaningful sentences. Learn about nouns, verbs, adjectives, adverbs, and how to form correct sentences with proper punctuation.'
  },
  'ENG_CH2': {
    id: 'ENG_CH2',
    name: 'Comprehension Skills',
    subject: 'English',
    description: 'Develop strategies for reading and understanding various texts.',
    content: 'Comprehension involves understanding, analyzing, and interpreting what you read. Learn techniques like skimming, scanning, identifying main ideas, and making inferences.'
  },
  'ENG_CH3': {
    id: 'ENG_CH3',
    name: 'Writing Techniques',
    subject: 'English',
    description: 'Learn to write effective essays, letters, and creative pieces.',
    content: 'Good writing communicates ideas clearly and engagingly. Master the writing process: planning, drafting, revising, and editing. Explore different formats and styles.'
  },
  'ENG_CH4': {
    id: 'ENG_CH4',
    name: 'Vocabulary Building',
    subject: 'English',
    description: 'Expand your word power and learn effective word usage.',
    content: 'A strong vocabulary enhances communication. Learn new words through context clues, prefixes, suffixes, synonyms, antonyms, and regular reading practice.'
  },
  'SS_CH1': {
    id: 'SS_CH1',
    name: 'Ancient Civilizations',
    subject: 'Social Studies',
    description: 'Journey through early human societies and their cultural achievements.',
    content: 'Ancient civilizations like Mesopotamia, Egypt, Indus Valley, and others laid the foundation for modern society. Discover their innovations in writing, architecture, and governance.'
  },
  'SS_CH2': {
    id: 'SS_CH2',
    name: 'Modern India',
    subject: 'Social Studies',
    description: 'Study India\'s independence movement and nation-building process.',
    content: 'India gained independence in 1947 after years of struggle. Learn about key freedom fighters, the partition, framing of the constitution, and India\'s development as a democratic nation.'
  },
  'SS_CH3': {
    id: 'SS_CH3',
    name: 'Geography Basics',
    subject: 'Social Studies',
    description: 'Understand maps, continents, and different climate zones.',
    content: 'Geography studies Earth\'s physical features and human populations. Learn to read maps, understand coordinates, identify continents and oceans, and explore various climate zones.'
  },
  'SS_CH4': {
    id: 'SS_CH4',
    name: 'Civic Responsibilities',
    subject: 'Social Studies',
    description: 'Learn about government structure and duties of citizens.',
    content: 'Civic education teaches about rights and responsibilities in a democracy. Understand the three branches of government, voting, laws, and how citizens can participate in society.'
  }
}

export default function ChapterPage() {
  const params = useParams()
  const subject = decodeURIComponent(params.subject as string)
  const chapterId = params.chapter as string
  
  const chapter = CHAPTER_CONTENT[chapterId] || {
    id: chapterId,
    name: 'Chapter Not Found',
    subject: subject,
    description: 'This chapter is under development.',
    content: 'Content coming soon!'
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href={`/student/learning/${encodeURIComponent(subject)}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {subject}
        </Link>
        
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{chapter.name}</h1>
            <p className="text-gray-600">{subject}</p>
          </div>
        </div>
      </div>

      {/* Lesson Viewer */}
      <LessonViewer chapter={chapter} />
    </div>
  )
}
