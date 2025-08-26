//react-hooks/exhaustive-deps
'use client'

import Image from 'next/image'
import React, { useState, useEffect, useCallback } from 'react'
import type { BasicSlider as BasicSliderType, Media } from '@/payload-types'

type Slide = {
  image: string | Media
  alt: string
  title: string
  description?: string | null
  id?: string | null
}

type BasicSliderProps = {
  richText?: BasicSliderType['richText']
  slides?: Slide[] | null
  autoplaySpeed?: number | null
}

// Helper function to safely get image URL
const getImageUrl = (image: string | Media): string => {
  if (typeof image === 'string') {
    return image
  }
  if (image && typeof image === 'object' && 'url' in image && image.url) {
    return image.url
  }
  return ''
}

// Helper function to safely get image alt text
const getImageAlt = (image: string | Media, fallbackAlt?: string | null): string => {
  if (typeof image === 'object' && image && 'alt' in image && image.alt) {
    return image.alt
  }
  return fallbackAlt || 'Slide image'
}

export const BasicSlider = ({ slides, autoplaySpeed = 3000 }: BasicSliderProps) => {
  // Ensure slides is a valid array
  const validSlides =
    slides?.filter(
      (slide): slide is Slide =>
        slide !== null &&
        slide !== undefined &&
        slide.image !== null &&
        slide.image !== undefined &&
        typeof slide.title === 'string' &&
        slide.title.length > 0,
    ) ?? []

  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = useCallback(() => {
    if (validSlides.length === 0) return
    setCurrentIndex((prev) => (prev === 0 ? validSlides.length - 1 : prev - 1))
  }, [validSlides.length])

  const nextSlide = useCallback(() => {
    if (validSlides.length === 0) return
    setCurrentIndex((prev) => (prev === validSlides.length - 1 ? 0 : prev + 1))
  }, [validSlides.length])

  // Autoplay functionality
  useEffect(() => {
    if (validSlides.length <= 1 || autoplaySpeed === null || autoplaySpeed <= 0) return

    const interval = setInterval(() => {
      nextSlide()
    }, autoplaySpeed)

    return () => clearInterval(interval)
  }, [nextSlide, autoplaySpeed, validSlides.length])

  // If no valid slides, don't render anything
  if (validSlides.length === 0) return null

  return (
    <section className="relative">
      <div className="h-[60vh] md:h-[85vh] xl:h-[90vh] w-full overflow-hidden">
        <div className="relative h-full">
          {validSlides.map((slide, index) => {
            const imageUrl = getImageUrl(slide.image)
            const imageAlt = getImageAlt(slide.image, slide.alt)

            return (
              <div
                key={slide.id || index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover brightness-[0.90]"
                    priority={index === 0}
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="absolute bottom-12 left-8 md:bottom-20 md:left-16 text-left max-w-2xl">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
                      {slide.title}
                    </h2>
                    {slide.description && (
                      <p className="text-xl md:text-2xl text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] leading-relaxed">
                        {slide.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Navigation Buttons */}
        {validSlides.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              className="absolute top-1/2 left-4 md:left-8 z-10 flex items-center justify-center h-10 w-10 md:h-14 md:w-14 -translate-y-1/2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-all duration-300 group"
              aria-label="Previous slide"
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={nextSlide}
              className="absolute top-1/2 right-4 md:right-8 z-10 flex items-center justify-center h-10 w-10 md:h-14 md:w-14 -translate-y-1/2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-all duration-300 group"
              aria-label="Next slide"
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Indicators */}
        {validSlides.length > 1 && (
          <div className="absolute bottom-8 md:bottom-12 left-1/2 z-30 flex -translate-x-1/2 space-x-3 md:space-x-4">
            {validSlides.map((slide, index) => (
              <button
                key={slide.id || index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white scale-110 shadow-lg shadow-white/50'
                    : 'bg-white/50 hover:bg-white/70 hover:scale-110'
                }`}
                aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
