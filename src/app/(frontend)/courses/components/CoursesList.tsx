'use client'

import React, { useState } from 'react'
import { useCourses, useCourseCategories } from '@/hooks/useCourses'
import { CoursesQueryParams } from '@/types/course'
import { CourseCard } from './CourseCard'
import { CourseFilters } from './CourseFilters'
import { LoadingSpinner } from './LoadingSpinner'
import { ErrorMessage } from './ErrorMessage'

export function CoursesList() {
  const [filters, setFilters] = useState<CoursesQueryParams>({
    page: 1,
    limit: 12,
    sortBy: 'title',
    sortOrder: 'asc',
  })

  const {
    data: coursesData,
    isLoading: coursesLoading,
    isError: coursesIsError,
  } = useCourses(filters)

  const { data: categories, isLoading: categoriesLoading } = useCourseCategories()

  const handleFiltersChange = (newFilters: Partial<CoursesQueryParams>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset to first page when filters change
    }))
  }

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }))
  }

  if (coursesIsError) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorMessage
            message="Failed to load courses. Please try again later."
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Section */}
        <CourseFilters
          categories={categories || []}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isLoading={categoriesLoading}
        />

        {/* Loading State */}
        {coursesLoading && (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="large" />
          </div>
        )}

        {/* Courses Grid */}
        {!coursesLoading && coursesData && (
          <>
            {/* Results Summary */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-gray-600">
                  Showing {coursesData.courses.length} of {coursesData.total} courses
                  {filters.category && filters.category !== 'All Courses' && (
                    <span className="ml-1">in {filters.category}</span>
                  )}
                </p>

                {/* Sort Options */}
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm text-gray-600">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={`${filters.sortBy}-${filters.sortOrder}`}
                    onChange={(e) => {
                      const [sortBy, sortOrder] = e.target.value.split('-') as [
                        string,
                        'asc' | 'desc',
                      ]
                      handleFiltersChange({
                        sortBy: sortBy as
                          | 'title'
                          | 'price'
                          | 'rating'
                          | 'studentsEnrolled'
                          | 'duration',
                        sortOrder,
                      })
                    }}
                    className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="title-asc">Title (A-Z)</option>
                    <option value="title-desc">Title (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                    <option value="rating-desc">Rating (High to Low)</option>
                    <option value="studentsEnrolled-desc">Most Popular</option>
                    <option value="duration-asc">Duration (Short to Long)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Courses Grid */}
            {coursesData.courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {coursesData.courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-4">
                  No courses found matching your criteria.
                </div>
                <button
                  onClick={() =>
                    setFilters({
                      page: 1,
                      limit: 12,
                      sortBy: 'title',
                      sortOrder: 'asc',
                    })
                  }
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {coursesData.total > coursesData.limit && (
              <Pagination
                currentPage={coursesData.page}
                totalPages={Math.ceil(coursesData.total / coursesData.limit)}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

// Pagination Component
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const showPages = pages.filter((page) => {
    return page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)
  })

  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {showPages.map((page, index) => {
        const prevPage = showPages[index - 1]
        const showEllipsis = prevPage && page - prevPage > 1

        return (
          <React.Fragment key={page}>
            {showEllipsis && (
              <span className="px-3 py-2 text-sm font-medium text-gray-500">...</span>
            )}
            <button
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                currentPage === page
                  ? 'text-white bg-blue-600 border border-blue-600'
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          </React.Fragment>
        )
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  )
}
