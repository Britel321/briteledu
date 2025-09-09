import type { TestimonialsBlock as TestimonialsBlockProps } from 'src/payload-types'

import React from 'react'
import { AnimatedTestimonials } from './animated-testimonials'
import RichText from '@/components/RichText'
import { cn } from '@/utils/ui'

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
