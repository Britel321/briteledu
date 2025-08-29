'use client'

import React from 'react'
import { useCourse, useRelatedCourses } from '@/hooks/useCourses'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { ErrorMessage } from '../../components/ErrorMessage'
import { CourseCard } from '../../components/CourseCard'
import Link from 'next/link'

interface CourseDetailProps {
  slug: string
}

export function CourseDetail({ slug }: CourseDetailProps) {
  const { data: course, isLoading, error, isError } = useCourse(slug)

  const { data: relatedCourses, isLoading: relatedLoading } = useRelatedCourses(course?.id || 0, 3)

  if (isLoading) {
    return <CourseDetailSkeleton />
  }

  if (isError || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage
          message={
            error?.message ||
            "Course not found. The course you're looking for might have been removed or doesn't exist."
          }
          onRetry={() => window.location.reload()}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                {course.category}
              </span>
              <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                <svg
                  className="w-4 h-4 text-yellow-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium">
                  {course.rating} ({course.studentsEnrolled} students)
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{course.title}</h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl">{course.description}</p>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Duration: {course.duration}
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Level: {course.level}
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Instructor: {course.instructor}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Course Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* What You'll Learn */}
              {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">What You&apos;ll Learn</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Course Curriculum */}
              {course.curriculum && course.curriculum.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
                  <div className="space-y-4">
                    {course.curriculum.map((week, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Week {week.week}: {week.topic}
                          </h3>
                        </div>
                        <p className="text-gray-600">{week.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Requirements */}
              {course.requirements && course.requirements.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Requirements</h2>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <ul className="space-y-3">
                      {course.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {/* Instructor */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Your Instructor</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                      {course.instructor
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{course.instructor}</h3>
                      <p className="text-gray-600">Course Instructor</p>
                    </div>
                  </div>
                  {course.instructorBio && <p className="text-gray-700">{course.instructorBio}</p>}
                </div>
              </section>
            </div>

            {/* Right Column - Course Info & CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{course.price}</div>
                    <p className="text-gray-600">One-time payment</p>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg mb-4 transition-colors duration-200">
                    Enroll Now
                  </button>

                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg mb-6 transition-colors duration-200">
                    Add to Wishlist
                  </button>

                  {/* Course Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 mb-3">This course includes:</h4>
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <svg
                          className="w-4 h-4 text-green-500 mr-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Stats */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Course Statistics</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Students Enrolled</span>
                      <span className="font-medium">{course.studentsEnrolled}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Level</span>
                      <span className="font-medium">{course.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating</span>
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 text-yellow-400 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-medium">{course.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Courses */}
          {relatedCourses && relatedCourses.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Courses</h2>
              {relatedLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner size="large" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedCourses.map((relatedCourse) => (
                    <CourseCard key={relatedCourse.id} course={relatedCourse} />
                  ))}
                </div>
              )}

              <div className="text-center mt-8">
                <Link
                  href="/courses"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  View All Courses
                  <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Loading skeleton for course detail
function CourseDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero skeleton */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="h-8 w-32 bg-white/20 rounded-full animate-pulse" />
              <div className="h-8 w-24 bg-white/20 rounded-full animate-pulse" />
            </div>
            <div className="h-12 bg-white/20 rounded mb-6 animate-pulse" />
            <div className="h-6 bg-white/20 rounded mb-4 animate-pulse" />
            <div className="h-6 bg-white/20 rounded w-3/4 mb-8 animate-pulse" />
            <div className="flex gap-6">
              <div className="h-4 bg-white/20 rounded w-24 animate-pulse" />
              <div className="h-4 bg-white/20 rounded w-24 animate-pulse" />
              <div className="h-4 bg-white/20 rounded w-32 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div className="h-8 bg-gray-300 rounded w-64 animate-pulse" />
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-4 bg-gray-300 rounded animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="h-12 bg-gray-300 rounded mb-4 animate-pulse" />
                <div className="h-12 bg-gray-300 rounded mb-4 animate-pulse" />
                <div className="h-10 bg-gray-300 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
