'use client'
import React, { useState, useMemo } from 'react'
import { CardPostData } from '@/components/Card'

interface BlogFilterProps {
  posts: CardPostData[]
  categories: any[]
  onFilteredPosts: (filteredPosts: CardPostData[]) => void
}

export const BlogFilter: React.FC<BlogFilterProps> = ({ posts, categories, onFilteredPosts }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const filteredPosts = useMemo(() => {
    let filtered = posts

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (post) =>
          post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.meta?.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((post) => {
        if (!post.categories) return false
        return post.categories.some((category: any) => {
          if (typeof category === 'object' && category !== null) {
            return category.id === selectedCategory
          }
          return false
        })
      })
    }

    return filtered
  }, [posts, searchTerm, selectedCategory])

  React.useEffect(() => {
    onFilteredPosts(filteredPosts)
  }, [filteredPosts, onFilteredPosts])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory(null)
  }

  const hasActiveFilters = searchTerm.trim() || selectedCategory

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20 backdrop-blur-md bg-white/90 dark:bg-gray-900/90">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <div
              className={`relative transition-all duration-200 ${isSearchFocused ? 'transform scale-105' : ''}`}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
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
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Categories:
            </span>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                !selectedCategory
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All
            </button>
            {categories.slice(0, 6).map((category: any) => (
              <button
                key={category.id}
                onClick={() =>
                  setSelectedCategory(category.id === selectedCategory ? null : category.id)
                }
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>Clear filters</span>
            </button>
          )}
        </div>

        {/* Results Summary */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div>
            Showing {filteredPosts.length} of {posts.length} articles
            {searchTerm.trim() && (
              <span className="ml-2">
                for "
                <span className="font-medium text-gray-900 dark:text-gray-100">{searchTerm}</span>"
              </span>
            )}
            {selectedCategory && (
              <span className="ml-2">
                in{' '}
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {categories.find((cat) => cat.id === selectedCategory)?.title}
                </span>
              </span>
            )}
          </div>

          {filteredPosts.length === 0 && hasActiveFilters && (
            <div className="flex items-center space-x-2 text-orange-600 dark:text-orange-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <span>No articles found</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
