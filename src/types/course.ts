export interface CourseWeek {
  week: number
  topic: string
  description: string
}

export interface Course {
  id: number
  slug: string
  title: string
  description: string
  image: string
  duration: string
  level: string
  price: string
  category: string
  instructor: string
  instructorBio?: string
  rating: number
  studentsEnrolled: number
  features: string[]
  curriculum?: CourseWeek[]
  requirements?: string[]
  whatYouWillLearn?: string[]
}

export interface CoursesResponse {
  courses: Course[]
  total: number
  page: number
  limit: number
}

export interface CourseFilters {
  category?: string
  level?: string
  priceRange?: {
    min: number
    max: number
  }
  search?: string
  sortBy?: 'title' | 'price' | 'rating' | 'studentsEnrolled' | 'duration'
  sortOrder?: 'asc' | 'desc'
}

export interface CoursesQueryParams extends CourseFilters {
  page?: number
  limit?: number
}

export interface CourseCategory {
  id: string
  name: string
  count: number
}

export type CourseLevel =
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced'
  | 'All Levels'
  | 'High School'
  | 'Graduate Level'
  | 'Beginner to Intermediate'
  | 'Intermediate to Advanced'

export const COURSE_CATEGORIES = [
  'All Courses',
  'Language Proficiency',
  'Test Preparation',
  'Graduate Tests',
  'Language Learning',
  'Counseling',
] as const

export const COURSE_LEVELS: CourseLevel[] = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'All Levels',
  'High School',
  'Graduate Level',
  'Beginner to Intermediate',
  'Intermediate to Advanced',
]
