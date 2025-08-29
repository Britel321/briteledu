'use client'
import React, { useState } from 'react'
import { CollectionArchive } from '@/components/CollectionArchive'
import { BlogFilter } from '@/components/BlogFilter'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { CardPostData } from '@/components/Card'

interface BlogPageClientProps {
  posts: CardPostData[]
  categories: any[]
  pagination: {
    page: number
    totalPages: number
    totalDocs: number
    limit: number
  }
}

export const BlogPageClient: React.FC<BlogPageClientProps> = ({
  posts,
  categories,
  pagination,
}) => {
  const [filteredPosts, setFilteredPosts] = useState<CardPostData[]>(posts)

  return (
    <div>
      {/* Filter Component */}
      <BlogFilter posts={posts} categories={categories} onFilteredPosts={setFilteredPosts} />

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Page Range - Show only when no filters are active */}
          {filteredPosts.length === posts.length && (
            <div className="mb-8">
              <PageRange
                collection="posts"
                currentPage={pagination.page}
                limit={pagination.limit}
                totalDocs={pagination.totalDocs}
              />
            </div>
          )}

          <CollectionArchive posts={filteredPosts} />

          {/* Pagination - Show only when no filters are active */}
          {filteredPosts.length === posts.length && (
            <div className="mt-16">
              {pagination.totalPages > 1 && (
                <Pagination page={pagination.page} totalPages={pagination.totalPages} />
              )}
            </div>
          )}

          {/* Load More Button for Filtered Results */}
          {filteredPosts.length < posts.length && filteredPosts.length > 0 && (
            <div className="mt-16 text-center">
              <div className="inline-flex items-center px-6 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filtered results - Clear filters to see all posts
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
