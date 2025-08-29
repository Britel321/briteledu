'use client'

import React from 'react'
import Link from 'next/link'
import { Course } from '@/types/course'
import { usePrefetchCourse } from '@/hooks/useCourses'

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const { prefetchCourse } = usePrefetchCourse()

  const handleMouseEnter = () => {
    prefetchCourse(course.slug)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Course Image */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
            {course.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 text-gray-800 px-2 py-1 rounded-lg text-sm font-medium flex items-center">
            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {course.rating}
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

        {/* Course Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {course.duration}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {course.studentsEnrolled} students
          </span>
        </div>

        {/* Instructor */}
        <div className="text-sm text-gray-600 mb-4">
          <span className="font-medium">Instructor:</span> {course.instructor}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {course.features.slice(0, 2).map((feature, index) => (
            <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs">
              {feature}
            </span>
          ))}
          {course.features.length > 2 && (
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
              +{course.features.length - 2} more
            </span>
          )}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-2xl font-bold text-blue-600">{course.price}</div>
          <Link
            href={`/courses/${course.slug}`}
            onMouseEnter={handleMouseEnter}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}
