'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Image from 'next/image'
import type { QuoteCarouselBlock as QuoteCarouselBlockProps } from '@/payload-types'

// Custom hooks
import { useCarousel } from '@/hooks/useCarousel'
import { useAutoPlay } from '@/hooks/useAutoPlay'
import { useImageSrc } from '@/hooks/useImageSrc'

// Utilities
import {
  getBackgroundClasses,
  getTextClasses,
  getDotClasses,
  type BackgroundColor,
} from '@/utils/theme'
import {
  createAriaLabel,
  shouldShowNavigation,
  createButtonClasses,
  validateQuoteData,
} from '@/utils/component'
import {
  quoteVariants,
  headerVariants,
  defaultTransition,
  headerTransition,
} from '@/utils/animations'

export const QuoteCarouselBlock: React.FC<QuoteCarouselBlockProps> = ({
  quotes = [],
  title,
  subtitle,
  autoPlay = true,
  interval = 5000,
  showDots = true,
  showArrows = true,
  backgroundColor = 'light',
}) => {
  // Validate data early
  if (!validateQuoteData(quotes)) return null

  // Custom hooks
  const { currentIndex, isTransitioning, next, previous, goTo } = useCarousel({
    itemsLength: quotes.length,
  })

  const { handleMouseEnter, handleMouseLeave } = useAutoPlay({
    isEnabled: autoPlay || false,
    interval: interval || 5000,
    onNext: next,
    isTransitioning,
  })

  const currentQuote = quotes[currentIndex]
  // Import ImageType from the hook file
  type ImageType = string | { url?: string; alt?: string } | null
  const imageInfo = useImageSrc(currentQuote?.image as ImageType, currentQuote?.author)

  // Utility classes
  const bgClass = getBackgroundClasses(backgroundColor as BackgroundColor)
  const textClass = getTextClasses(backgroundColor as BackgroundColor)

  return (
    <section
      className={`py-12 md:py-16 lg:py-20 ${bgClass}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        {(title || subtitle) && (
          <motion.div
            className="text-center mb-12"
            variants={headerVariants}
            initial="initial"
            whileInView="animate"
            transition={headerTransition}
            viewport={{ once: true }}
          >
            {title && (
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textClass}`}>{title}</h2>
            )}
            {subtitle && <p className={`text-lg md:text-xl ${textClass} opacity-80`}>{subtitle}</p>}
          </motion.div>
        )}

        {/* Quote Carousel */}
        <div className="relative">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={quoteVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={defaultTransition}
                className="text-center"
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className={`w-12 h-12 mx-auto ${textClass} opacity-30`} />
                </div>

                {/* Quote Text */}
                <blockquote className="mb-8">
                  <p
                    className={`text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed ${textClass} italic`}
                  >
                    &ldquo;{currentQuote.quote}&rdquo;
                  </p>
                </blockquote>

                {/* Author Information */}
                <div className="flex items-center justify-center space-x-4">
                  {imageInfo && (
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                      <Image
                        src={imageInfo.src}
                        alt={imageInfo.alt}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="text-left">
                    <cite className={`text-lg font-semibold not-italic ${textClass}`}>
                      {currentQuote.author}
                    </cite>
                    {(currentQuote.title || currentQuote.organization) && (
                      <p className={`text-sm ${textClass} opacity-70`}>
                        {currentQuote.title}
                        {currentQuote.title && currentQuote.organization && ', '}
                        {currentQuote.organization}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          {shouldShowNavigation(quotes.length, showArrows || false) && (
            <>
              <button
                onClick={previous}
                disabled={isTransitioning}
                className={`absolute top-1/2 left-4 md:left-8 -translate-y-1/2 ${createButtonClasses(backgroundColor || 'light', isTransitioning)}`}
                aria-label={createAriaLabel('previous')}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={next}
                disabled={isTransitioning}
                className={`absolute top-1/2 right-4 md:right-8 -translate-y-1/2 ${createButtonClasses(backgroundColor || 'light', isTransitioning)}`}
                aria-label={createAriaLabel('next')}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Dots Indicator */}
        {shouldShowNavigation(quotes.length, showDots || false) && (
          <div className="flex justify-center mt-8 space-x-2">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                disabled={isTransitioning}
                className={getDotClasses(
                  backgroundColor as BackgroundColor,
                  index === currentIndex,
                  isTransitioning,
                )}
                aria-label={createAriaLabel('next', index)}
              />
            ))}
          </div>
        )}

        {/* Quote Counter */}
        {quotes.length > 1 && (
          <div className="text-center mt-6">
            <span className={`text-sm ${textClass} opacity-70`}>
              {currentIndex + 1} of {quotes.length}
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
