'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { useAutoSlider } from '../../hooks/useAutoSlider'
import { HeroSliderProps } from '../../types/slider'
import Image from 'next/image'

// Dummy data for testing - remove when you have real data
const dummySlides = [
  {
    backgroundImage:
      'https://res.cloudinary.com/dz3facqgc/image/upload/v1750606682/fiddpw5sumypg3kcatsa.jpg',
    alt: 'Political campaign rally',
    title: 'Building a Better Future',
    description:
      'Join us in creating positive change for our community through innovative policies and dedicated leadership.',
    buttonText: 'Learn More',
    buttonLink: '#about',
  },
  {
    backgroundImage:
      'https://res.cloudinary.com/dz3facqgc/image/upload/v1750606702/fzrx0p7q00xumqrfq3q2.jpg',
    alt: 'Community meeting',
    title: 'Community First',
    description:
      "Your voice matters. We're committed to listening to our constituents and addressing their real concerns.",
    buttonText: 'Get Involved',
    buttonLink: '#contact',
  },
  {
    backgroundImage:
      'https://res.cloudinary.com/dz3facqgc/image/upload/v1750606723/nccnszxj8fitoxewyxrp.jpg',
    alt: 'Policy discussion',
    title: 'Proven Leadership',
    description:
      'With years of experience in public service, I bring the expertise needed to deliver real results.',
    buttonText: 'View Experience',
    buttonLink: '#experience',
  },
  {
    backgroundImage:
      'https://res.cloudinary.com/dz3facqgc/image/upload/v1750606750/ubeqgxdmmaatptx1nikd.jpg',
    alt: 'Handshake agreement',
    title: 'Transparency & Trust',
    description:
      'Open communication and accountability are the foundation of effective governance.',
    buttonText: 'Our Values',
    buttonLink: '#values',
  },
]

const SimpleSliderBlock: React.FC<HeroSliderProps> = ({
  slides = dummySlides,
  autoPlay = true,
  interval = 5000,
  showDots = true,
  showArrows = true,
  className = '',
}) => {
  const { currentSlide, nextSlide, prevSlide, goToSlide, isPlaying, pauseSlider, resumeSlider } =
    useAutoSlider({
      totalSlides: slides.length,
      interval,
      pauseOnHover: true,
    })

  // Touch/swipe functionality
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0]?.clientX || null)
    setIsDragging(true)
    if (autoPlay) pauseSlider()
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0]?.clientX || null)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }

    setTouchStart(null)
    setTouchEnd(null)
    setIsDragging(false)

    // Resume autoplay after a short delay
    setTimeout(() => {
      if (autoPlay) resumeSlider()
    }, 1000)
  }

  const slideVariants = {
    enter: {
      opacity: 0,
    },
    center: {
      zIndex: 1,
      opacity: 1,
    },
    exit: {
      zIndex: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: 'easeOut' as const,
        delay: 0.2,
      },
    },
  }

  const handlePrevSlide = () => {
    prevSlide()
  }

  const handleNextSlide = () => {
    nextSlide()
  }

  const handleMouseEnter = () => {
    if (autoPlay) pauseSlider()
  }

  const handleMouseLeave = () => {
    if (autoPlay) resumeSlider()
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseSlider()
    } else {
      resumeSlider()
    }
  }

  if (!slides.length) return null

  const currentSlideData = slides[currentSlide]

  if (!currentSlideData) return null

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[40vh] sm:h-[90vh] overflow-hidden bg-gray-900 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-label="Hero image carousel"
    >
      {/* Background Images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.6, ease: 'easeInOut' },
          }}
          className="absolute inset-0 z-10"
        >
          <div className="relative w-full h-full">
            <Image
              src={currentSlideData.backgroundImage || ''}
              alt={currentSlideData.alt || ''}
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Gradient Overlay - Mobile optimized */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70 sm:from-black/40 sm:via-black/20 sm:to-black/60" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay - Mobile & Desktop */}
      <div className="absolute inset-0 flex items-end justify-start z-30">
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 text-left text-white pb-8 sm:pb-16 md:pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentSlide}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="max-w-xs sm:max-w-xl md:max-w-2xl relative z-40"
            >
              <motion.h1
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-tight"
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
              >
                {currentSlideData.title}
              </motion.h1>

              <motion.p
                className="text-sm sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl mb-3 sm:mb-4 md:mb-6 lg:mb-8 leading-relaxed opacity-90"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                {currentSlideData.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows - Mobile & Desktop */}
      {showArrows && slides.length > 1 && (
        <>
          <button
            onClick={handlePrevSlide}
            className="absolute left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 z-30 pointer-events-auto border border-white/20"
            aria-label="Previous slide"
            type="button"
          >
            <ChevronLeft size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
          </button>

          <button
            onClick={handleNextSlide}
            className="absolute right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 z-30 pointer-events-auto border border-white/20"
            aria-label="Next slide"
            type="button"
          >
            <ChevronRight size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
          </button>
        </>
      )}

      {/* Mobile Dots Indicator */}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex space-x-2 sm:space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  goToSlide(index)
                }}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer ${
                  index === currentSlide
                    ? 'bg-white scale-125 shadow-lg'
                    : 'bg-white/50 hover:bg-white/70 hover:scale-110'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SimpleSliderBlock

export { SimpleSliderBlock }
