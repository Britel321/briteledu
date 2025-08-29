import type { TestimonialsBlock as TestimonialsBlockProps } from 'src/payload-types'

import React from 'react'
import { AnimatedTestimonials } from './animated-testimonials'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
} & TestimonialsBlockProps

export const TestimonialsBlock: React.FC<Props> = ({
  className,
  heading,
  description,
  testimonials: testimonialsData,
  autoplay = true,
  autoplayInterval = 5,
  showNavigation = true,
  showRatings = false,
  style = 'default',
  backgroundColor = 'slate',
  content,
}) => {
  // Background color mapping
  const backgroundClasses = {
    slate: 'bg-slate-100',
    white: 'bg-white',
    gray: 'bg-gray-100',
    blue: 'bg-blue-50',
    transparent: 'bg-transparent',
  }

  // Style configurations
  const styleClasses = {
    default: '',
    dark: 'dark',
    light: 'bg-gray-50',
    minimal: 'bg-white',
    gradient: 'bg-gradient-to-br from-blue-50 via-white to-indigo-50',
  }

  const textClasses = {
    default: 'text-gray-900',
    dark: 'text-white',
    light: 'text-gray-900',
    minimal: 'text-gray-900',
    gradient: 'text-gray-900',
  }

  const descriptionClasses = {
    default: 'text-gray-600',
    dark: 'text-gray-300',
    light: 'text-gray-700',
    minimal: 'text-gray-600',
    gradient: 'text-gray-600',
  }

  return (
    <div
      className={cn(
        'w-full',
        backgroundClasses[backgroundColor as keyof typeof backgroundClasses],
        styleClasses[style as keyof typeof styleClasses],
        className,
      )}
    >
      {(heading || description || content) && (
        <div className="container mx-auto px-4 pt-12 pb-8">
          {heading && (
            <h2
              className={cn(
                'text-3xl md:text-4xl font-bold text-center mb-4',
                textClasses[style as keyof typeof textClasses],
              )}
            >
              {heading}
            </h2>
          )}
          {description && (
            <p
              className={cn(
                'text-lg text-center max-w-2xl mx-auto mb-6',
                descriptionClasses[style as keyof typeof descriptionClasses],
              )}
            >
              {description}
            </p>
          )}
          {content && (
            <div className="max-w-4xl mx-auto">
              <RichText data={content} enableGutter={false} />
            </div>
          )}
        </div>
      )}

      <AnimatedTestimonials
        testimonials={testimonialsData}
        autoplay={autoplay || undefined}
        autoplayInterval={autoplayInterval || undefined}
        showNavigation={showNavigation || undefined}
        showRatings={showRatings || undefined}
        style={style}
      />
    </div>
  )
}
