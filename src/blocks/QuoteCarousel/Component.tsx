'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Image from 'next/image'
import type { QuoteCarouselBlock as QuoteCarouselBlockProps } from '@/payload-types'

type Quote = {
  quote: string
  author: string
  title?: string
  organization?: string
  image?: {
    url: string
    alt: string
  }
}

export const QuoteCarouselBlock: React.FC<QuoteCarouselBlockProps> = ({
  quotes = [],
  title,
  subtitle,
  autoPlay = true,
  interval = 5000,
  showDots = true,
  showArrows = true,
  showPlayPause = true,
  layout = 'centered',
  backgroundColor = 'light',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextQuote = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev === quotes.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsTransitioning(false), 600)
  }, [quotes.length, isTransitioning])

  const prevQuote = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev === 0 ? quotes.length - 1 : prev - 1))
    setTimeout(() => setIsTransitioning(false), 600)
  }, [quotes.length, isTransitioning])

  const goToQuote = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return
      setIsTransitioning(true)
      setCurrentIndex(index)
      setTimeout(() => setIsTransitioning(false), 600)
    },
    [currentIndex, isTransitioning],
  )

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Autoplay functionality
  useEffect(() => {
    if (!isPlaying || !autoPlay || !interval) return

    const intervalId = setInterval(() => {
      if (!isTransitioning) {
        nextQuote()
      }
    }, interval)

    return () => clearInterval(intervalId)
  }, [isPlaying, autoPlay, interval, nextQuote, isTransitioning])

  // Pause on hover
  const handleMouseEnter = () => {
    if (autoPlay) setIsPlaying(false)
  }

  const handleMouseLeave = () => {
    if (autoPlay) setIsPlaying(true)
  }

  if (!quotes || quotes.length === 0) return null

  const currentQuote = quotes[currentIndex]
  if (!currentQuote) return null

  const bgClasses: Record<string, string> = {
    light: 'bg-gray-50',
    dark: 'bg-gray-900 text-white',
    blue: 'bg-blue-50',
    white: 'bg-white',
  }

  const textClasses: Record<string, string> = {
    light: 'text-gray-900',
    dark: 'text-white',
    blue: 'text-gray-900',
    white: 'text-gray-900',
  }

  const quoteVariants = {
    enter: {
      opacity: 0,
      y: 20,
    },
    center: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -20,
    },
  }

  return (
    <section
      className={`py-12 md:py-16 lg:py-20 ${bgClasses[backgroundColor || 'light']}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        {(title || subtitle) && (
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {title && (
              <h2
                className={`text-3xl md:text-4xl font-bold mb-4 ${textClasses[backgroundColor || 'light']}`}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={`text-lg md:text-xl ${textClasses[backgroundColor || 'light']} opacity-80`}
              >
                {subtitle}
              </p>
            )}
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
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="text-center"
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote
                    className={`w-12 h-12 mx-auto ${textClasses[backgroundColor || 'light']} opacity-30`}
                  />
                </div>

                {/* Quote Text */}
                <blockquote className="mb-8">
                  <p
                    className={`text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed ${textClasses[backgroundColor || 'light']} italic`}
                  >
                    &ldquo;{currentQuote.quote}&rdquo;
                  </p>
                </blockquote>

                {/* Author Information */}
                <div className="flex items-center justify-center space-x-4">
                  {currentQuote.image && (
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                      <Image
                        src={
                          typeof currentQuote.image === 'string'
                            ? currentQuote.image
                            : currentQuote.image.url || ''
                        }
                        alt={
                          typeof currentQuote.image === 'string'
                            ? currentQuote.author
                            : currentQuote.image.alt || currentQuote.author
                        }
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="text-left">
                    <cite
                      className={`text-lg font-semibold not-italic ${textClasses[backgroundColor || 'light']}`}
                    >
                      {currentQuote.author}
                    </cite>
                    {(currentQuote.title || currentQuote.organization) && (
                      <p
                        className={`text-sm ${textClasses[backgroundColor || 'light']} opacity-70`}
                      >
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
          {showArrows && quotes.length > 1 && (
            <>
              <button
                onClick={prevQuote}
                disabled={isTransitioning}
                className={`absolute top-1/2 left-4 md:left-8 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${textClasses[backgroundColor || 'light']}`}
                aria-label="Previous quote"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextQuote}
                disabled={isTransitioning}
                className={`absolute top-1/2 right-4 md:right-8 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${textClasses[backgroundColor || 'light']}`}
                aria-label="Next quote"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Play/Pause Button */}
          {showPlayPause && autoPlay && quotes.length > 1 && (
            <div className="absolute top-4 right-4">
              <button
                onClick={togglePlayPause}
                className={`p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 ${textClasses[backgroundColor || 'light']}`}
                aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
              >
                {isPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Dots Indicator */}
        {showDots && quotes.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => goToQuote(index)}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? `${backgroundColor === 'dark' ? 'bg-white' : 'bg-blue-600'} scale-125`
                    : `${backgroundColor === 'dark' ? 'bg-white/30' : 'bg-gray-300'} hover:scale-110`
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label={`Go to quote ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Quote Counter */}
        {quotes.length > 1 && (
          <div className="text-center mt-6">
            <span className={`text-sm ${textClasses[backgroundColor || 'light']} opacity-70`}>
              {currentIndex + 1} of {quotes.length}
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
