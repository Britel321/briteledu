'use client'
import { cn } from '@/utils/ui'
import useClickableCard from '@/utils/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'
import { formatDateTime } from '@/utils/formatDateTime'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<
  Post,
  'slug' | 'categories' | 'meta' | 'title' | 'publishedAt' | 'populatedAuthors'
>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, publishedAt, populatedAuthors } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  // Get first author
  const firstAuthor = populatedAuthors && populatedAuthors.length > 0 ? populatedAuthors[0] : null
  const authorName = firstAuthor?.name || 'Anonymous'

  return (
    <article
      className={cn(
        'group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      {/* Image Container */}
      <div className="relative w-full h-48 overflow-hidden">
        {!metaImage && (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 flex items-center justify-center">
            <div className="text-white text-lg font-semibold">No Image</div>
          </div>
        )}
        {metaImage && typeof metaImage !== 'string' && (
          <div className="relative w-full h-full">
            <Media
              resource={metaImage}
              size="33vw"
              imgClassName="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        {/* Category Badge */}
        {showCategories && hasCategories && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {categories?.slice(0, 2).map((category, index) => {
              if (typeof category === 'object') {
                const { title: titleFromCategory } = category
                const categoryTitle = titleFromCategory || 'Untitled category'

                return (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 rounded-full backdrop-blur-sm"
                  >
                    {categoryTitle}
                  </span>
                )
              }
              return null
            })}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta Information */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {authorName.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium">{authorName}</span>
            </div>
          </div>
          {publishedAt && (
            <time dateTime={publishedAt} className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{formatDateTime(publishedAt)}</span>
            </time>
          )}
        </div>

        {/* Title */}
        {titleToUse && (
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            <Link href={href} ref={link.ref} className="hover:underline">
              {titleToUse}
            </Link>
          </h3>
        )}

        {/* Description */}
        {description && (
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 mb-4">
            {sanitizedDescription}
          </p>
        )}

        {/* Read More */}
        <div className="flex items-center justify-between">
          <Link
            href={href}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 group-hover:translate-x-1"
          >
            Read More
            <svg
              className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Reading Time Estimate */}
          <div className="flex items-center text-sm text-gray-400 dark:text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>5 min read</span>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/20 dark:group-hover:border-blue-400/20 transition-colors duration-300 pointer-events-none" />
    </article>
  )
}
