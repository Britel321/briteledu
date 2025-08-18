//react-hooks/exhaustive-deps
'use client'

import Image from 'next/image'
import React, { useState, useEffect, useCallback } from 'react'

type Slide = {
  image: {
    url: string
    alt: string
  }
  alt: string
  title: string
  description: string
}

type SliderProps = {
  richText?: any
  slides: Slide[]
  autoplaySpeed?: number
}

const SliderType1 = ({ slides, autoplaySpeed = 3000 }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const prevSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    setTimeout(() => setIsTransitioning(false), 600)
  }, [slides.length, isTransitioning])

  const nextSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsTransitioning(false), 600)
  }, [slides.length, isTransitioning])

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return
      setIsTransitioning(true)
      setCurrentIndex(index)
      setTimeout(() => setIsTransitioning(false), 600)
    },
    [currentIndex, isTransitioning],
  )

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide()
      }
    }, autoplaySpeed)

    return () => clearInterval(interval)
  }, [nextSlide, autoplaySpeed, isTransitioning])

  // If no slides, don't render anything
  if (!slides || slides.length === 0) return null

  return (
    <section className="relative">
      <div className="h-[22vh] md:h-[90vh] w-full overflow-hidden">
        <div className="relative h-full">
          {slides?.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentIndex
                  ? 'opacity-100 scale-100 translate-x-0'
                  : 'opacity-0 scale-105 translate-x-4'
              }`}
              style={{
                transitionDelay: index === currentIndex ? '0ms' : '0ms',
                transform:
                  index === currentIndex
                    ? 'translateX(0) scale(1)'
                    : index < currentIndex
                      ? 'translateX(-100%) scale(1.05)'
                      : 'translateX(100%) scale(1.05)',
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={slide.image?.url || ''}
                  alt={slide.alt || ''}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover brightness-[0.90] transition-transform duration-700 ease-in-out"
                  style={{
                    transform: index === currentIndex ? 'scale(1)' : 'scale(1.1)',
                  }}
                  priority={index === 0}
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div
                  className="absolute bottom-12 left-8 md:bottom-20 md:left-16 text-left max-w-2xl transition-all duration-700 ease-out"
                  style={{
                    opacity: index === currentIndex ? 1 : 0,
                    transform:
                      index === currentIndex
                        ? 'translateY(0) translateX(0)'
                        : 'translateY(20px) translateX(-20px)',
                  }}
                >
                  <h2 className="text-2xl md:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-2xl text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          type="button"
          onClick={prevSlide}
          disabled={isTransitioning}
          className="absolute top-1/2 left-4 md:left-8 z-10 flex items-center justify-center h-10 w-10 md:h-14 md:w-14 -translate-y-1/2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
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
          disabled={isTransitioning}
          className="absolute top-1/2 right-4 md:right-8 z-10 flex items-center justify-center h-10 w-10 md:h-14 md:w-14 -translate-y-1/2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicators */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 z-30 flex -translate-x-1/2 space-x-3 md:space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-500 ease-out ${
                index === currentIndex
                  ? 'bg-white scale-125 shadow-lg shadow-white/50'
                  : 'bg-white/50 hover:bg-white/70 hover:scale-110'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SliderType1
