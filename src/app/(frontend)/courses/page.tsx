import type { Metadata } from 'next'
import React from 'react'
import PageClient from './page.client'
import { CoursesList } from './components/CoursesList'

export const metadata: Metadata = {
  title: 'Courses - BriteEdu',
  description:
    'Explore our comprehensive range of educational courses designed to help you achieve your academic and career goals.',
}

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageClient />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Explore Our Courses</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Discover comprehensive educational programs designed to help you achieve your academic
              and career goals
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">Expert Instructors</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Flexible Learning</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Proven Results</span>
            </div>
          </div>
        </div>
      </div>

      {/* Courses List with TanStack Query */}
      <CoursesList />
    </div>
  )
}
