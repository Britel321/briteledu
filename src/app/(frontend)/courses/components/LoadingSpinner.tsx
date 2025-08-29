'use client'

import React from 'react'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export function LoadingSpinner({ size = 'medium', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export function CourseCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-300" />

      {/* Content skeleton */}
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded mb-2" />
        <div className="h-4 bg-gray-300 rounded mb-4" />
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4" />

        <div className="flex justify-between mb-4">
          <div className="h-4 bg-gray-300 rounded w-20" />
          <div className="h-4 bg-gray-300 rounded w-24" />
        </div>

        <div className="h-4 bg-gray-300 rounded mb-4" />

        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-300 rounded w-16" />
          <div className="h-6 bg-gray-300 rounded w-20" />
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="h-8 bg-gray-300 rounded w-20" />
          <div className="h-10 bg-gray-300 rounded w-24" />
        </div>
      </div>
    </div>
  )
}

export function CoursesListSkeleton() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters skeleton */}
        <div className="mb-12">
          <div className="h-12 bg-gray-300 rounded-lg max-w-md mx-auto mb-6 animate-pulse" />
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-10 w-24 bg-gray-300 rounded-full animate-pulse" />
            ))}
          </div>
        </div>

        {/* Results summary skeleton */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-300 rounded w-48 animate-pulse" />
            <div className="h-8 bg-gray-300 rounded w-32 animate-pulse" />
          </div>
        </div>

        {/* Courses grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <CourseCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
