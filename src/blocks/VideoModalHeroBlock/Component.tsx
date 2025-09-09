import type { VideoModalHeroBlock as VideoModalHeroBlockProps } from 'src/payload-types'

import React from 'react'
import VideoModal from './VideoModal'
import RichText from '@/components/RichText'
import { cn } from '@/utils/ui'

type Props = {
  className?: string
} & VideoModalHeroBlockProps

export const VideoModalHeroBlock: React.FC<Props> = ({
  className,
  content,
  style = 'default',
  heading,
  description,
  videoUrl,
  thumbnailImage,
  fallbackThumbnailUrl,
  ctaText,
  ctaUrl,
}) => {
  // Style configurations
  const styleClasses = {
    default: 'bg-white dark:bg-gray-900',
    dark: 'bg-gray-900',
    light: 'bg-gray-50',
    gradient:
      'bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900',
  }

  const textClasses = {
    default: 'text-gray-900 dark:text-white',
    dark: 'text-white',
    light: 'text-gray-900',
    gradient: 'text-gray-900 dark:text-white',
  }

  const descriptionClasses = {
    default: 'text-gray-500 dark:text-gray-400',
    dark: 'text-gray-300',
    light: 'text-gray-600',
    gradient: 'text-gray-600 dark:text-gray-300',
  }

  return (
    <section className={cn(styleClasses[style as keyof typeof styleClasses], className)}>
      <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
        <VideoModal
          videoUrl={
            videoUrl ||
            'https://92jtks0v7t.ufs.sh/f/4Xt4MyTqQ7crjZhi2G8m9TP6rN4uxHAJfXKVlyq3pgOCLbD0'
          }
          thumbnailImage={thumbnailImage}
          fallbackThumbnailUrl={fallbackThumbnailUrl || undefined}
        />
        <div className="mt-4 md:mt-0">
          {heading && (
            <h2
              className={cn(
                'mb-4 text-4xl tracking-tight font-extrabold',
                textClasses[style as keyof typeof textClasses],
              )}
            >
              {heading}
            </h2>
          )}

          {description && (
            <p
              className={cn(
                'mb-6 font-light md:text-lg',
                descriptionClasses[style as keyof typeof descriptionClasses],
              )}
            >
              {description}
            </p>
          )}

          {content && (
            <div className="mb-6">
              <RichText data={content} enableGutter={false} />
            </div>
          )}

          {ctaText && ctaUrl && (
            <a
              href={ctaUrl}
              className="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 transition-all duration-200"
            >
              {ctaText}
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
