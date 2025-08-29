import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="bg-white pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-50 to-transparent rounded-full opacity-30 transform translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-50 to-transparent rounded-full opacity-40 transform -translate-x-16 translate-y-16" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 mb-4">
                {categories.map((category, index) => {
                  if (typeof category === 'object' && category !== null) {
                    const { title: categoryTitle } = category
                    const titleToUse = categoryTitle || 'Untitled category'

                    return (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
                      >
                        {titleToUse}
                      </span>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          )}

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tight">
              {title}
            </h1>
          </div>

          {/* Meta information */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-black">
            {hasAuthors && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-black">
                    {formatAuthors(populatedAuthors)}
                  </p>
                  <p className="text-xs text-gray-600">Author</p>
                </div>
              </div>
            )}

            {hasAuthors && publishedAt && <div className="hidden sm:block w-px h-8 bg-gray-300" />}

            {publishedAt && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <time className="text-sm font-medium text-black" dateTime={publishedAt}>
                    {formatDateTime(publishedAt)}
                  </time>
                  <p className="text-xs text-gray-600">Published</p>
                </div>
              </div>
            )}
          </div>

          {/* Decorative line */}
          <div className="mt-12 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-blue-300" />
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <div className="w-16 h-px bg-gradient-to-r from-blue-300 to-indigo-300" />
              <div className="w-2 h-2 bg-indigo-500 rounded-full" />
              <div className="w-8 h-px bg-gradient-to-r from-indigo-300 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
