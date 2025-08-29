'use client'
import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-20">
          <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No posts found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Check back later for new content!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div
                key={index}
                className="flex opacity-0 animate-fade-in-up"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'forwards',
                }}
              >
                <Card className="h-full flex-1" doc={result} relationTo="posts" showCategories />
              </div>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
