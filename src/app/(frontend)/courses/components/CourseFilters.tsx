'use client'

import React, { useState } from 'react'
import { CoursesQueryParams, CourseCategory, COURSE_LEVELS } from '@/types/course'

interface CourseFiltersProps {
  categories: CourseCategory[]
  filters: CoursesQueryParams
  onFiltersChange: (filters: Partial<CoursesQueryParams>) => void
  isLoading?: boolean
}

export function CourseFilters({
  categories,
  filters,
  onFiltersChange,
  isLoading,
}: CourseFiltersProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      category: category === 'All Courses' ? undefined : category,
    })
  }

  const handleSearchChange = (search: string) => {
    onFiltersChange({ search: search || undefined })
  }

  const handleLevelChange = (level: string) => {
    onFiltersChange({
      level: level === 'All Levels' ? undefined : level,
    })
  }

  const handlePriceRangeChange = (min: number, max: number) => {
    onFiltersChange({
      priceRange: min === 0 && max === 50000 ? undefined : { min, max },
    })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      category: undefined,
      level: undefined,
      search: undefined,
      priceRange: undefined,
    })
  }

  const hasActiveFilters = !!(
    filters.category ||
    filters.level ||
    filters.search ||
    filters.priceRange
  )

  return (
    <div className="mb-12">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search courses..."
            value={filters.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="mb-6">
        <div className="flex flex-wrap justify-center gap-4">
          {isLoading
            ? // Loading skeleton for categories
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
              ))
            : categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.name)}
                  className={`px-6 py-2 rounded-full transition-colors font-medium ${
                    filters.category === category.name ||
                    (!filters.category && category.name === 'All Courses')
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.name}
                  <span className="ml-1 text-sm opacity-75">({category.count})</span>
                </button>
              ))}
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="text-center mb-4">
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center mx-auto"
        >
          {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
          <svg
            className={`ml-1 h-4 w-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course Level</label>
              <select
                value={filters.level || 'All Levels'}
                onChange={(e) => handleLevelChange(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All Levels">All Levels</option>
                {COURSE_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range (NPR)
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="5000"
                  value={filters.priceRange?.max || 50000}
                  onChange={(e) => {
                    const max = parseInt(e.target.value)
                    const min = filters.priceRange?.min || 0
                    handlePriceRangeChange(min, max)
                  }}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>NPR 0</span>
                  <span>NPR {(filters.priceRange?.max || 50000).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters & Clear Button */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="text-sm text-gray-600">Active filters:</span>

          {filters.category && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {filters.category}
              <button
                onClick={() => onFiltersChange({ category: undefined })}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          )}

          {filters.level && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {filters.level}
              <button
                onClick={() => onFiltersChange({ level: undefined })}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          )}

          {filters.search && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              &quot;{filters.search}&quot;
              <button
                onClick={() => onFiltersChange({ search: undefined })}
                className="ml-2 text-purple-600 hover:text-purple-800"
              >
                ×
              </button>
            </span>
          )}

          {filters.priceRange && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              NPR {filters.priceRange.min.toLocaleString()} -{' '}
              {filters.priceRange.max.toLocaleString()}
              <button
                onClick={() => onFiltersChange({ priceRange: undefined })}
                className="ml-2 text-yellow-600 hover:text-yellow-800"
              >
                ×
              </button>
            </span>
          )}

          <button
            onClick={clearAllFilters}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
