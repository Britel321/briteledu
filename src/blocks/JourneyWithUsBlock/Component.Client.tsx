'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { JourneyWithUsBlock } from '@/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

interface Service {
  title: string
  icon: string
  description: string
  bgColor: string
  stepNumber?: string
}

interface CustomType1Props {
  heading?: string | null
  subheading?: string | null
  leftSectionTitle?: string | null
  leftSectionDescription?: string | null
  ctaButtonText?: string | null
  ctaButtonUrl?: string | null
  services?: JourneyWithUsBlock['services']
  autoSlide?: boolean
  slideInterval?: number
  style?: string
  content?: any
}

export const CustomType1: React.FC<CustomType1Props> = ({
  heading = 'Your Journey With Us',
  subheading = 'Experience our comprehensive support services for medical study in Georgia',
  leftSectionTitle = 'Your Medical Education Journey',
  leftSectionDescription = "From application to graduation, we're with you every step of the way. Our comprehensive support ensures your study abroad experience is seamless and successful.",
  ctaButtonText = 'Start Your Journey →',
  ctaButtonUrl = '#',
  services: servicesData,
  autoSlide = true,
  slideInterval = 5,
  style = 'default',
  content,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sliderRef = useRef(null)

  // Color mapping for background gradients
  const colorMap = {
    pink: 'from-pink-100 to-pink-50',
    yellow: 'from-yellow-100 to-yellow-50',
    blue: 'from-blue-100 to-blue-50',
    green: 'from-green-100 to-green-50',
    purple: 'from-purple-100 to-purple-50',
    indigo: 'from-indigo-100 to-indigo-50',
    red: 'from-red-100 to-red-50',
    orange: 'from-orange-100 to-orange-50',
  }

  // Transform services data or use defaults
  const services: Service[] = React.useMemo(() => {
    if (!servicesData || servicesData.length === 0) {
      // Default fallback services
      return [
        {
          title: 'Documentation for visa',
          icon: '🛂',
          description: 'Complete visa documentation assistance for a smooth application process.',
          bgColor: 'from-pink-100 to-pink-50',
          stepNumber: 'Step 1',
        },
        {
          title: 'Documentation for university',
          icon: '📚',
          description: 'Comprehensive university application support to secure your admission.',
          bgColor: 'from-yellow-100 to-yellow-50',
          stepNumber: 'Step 2',
        },
        {
          title: 'Airport Pickup',
          icon: '✈️',
          description: 'Hassle-free airport transfer service to your accommodation upon arrival.',
          bgColor: 'from-blue-100 to-blue-50',
          stepNumber: 'Step 3',
        },
        {
          title: 'Sim Card Arrangement',
          icon: '📱',
          description: 'Local sim card setup to keep you connected from day one.',
          bgColor: 'from-green-100 to-green-50',
          stepNumber: 'Step 4',
        },
        {
          title: 'Medical Documentation',
          icon: '🏥',
          description: 'Complete 6-year medical documentation guidance and support.',
          bgColor: 'from-purple-100 to-purple-50',
          stepNumber: 'Step 5',
        },
        {
          title: 'Ongoing Student Support',
          icon: '👋',
          description: 'Continuous support throughout your academic journey until graduation.',
          bgColor: 'from-indigo-100 to-indigo-50',
          stepNumber: 'Step 6',
        },
      ]
    }

    return servicesData.map((service) => ({
      title: service.title || '',
      icon: service.icon || '📝',
      description: service.description || '',
      bgColor: colorMap[service.bgColor as keyof typeof colorMap] || 'from-gray-100 to-gray-50',
      stepNumber: service.stepNumber || '',
    }))
  }, [servicesData, colorMap])

  const totalPairs = Math.ceil(services.length / 2)

  const getCurrentPairIndex = () => {
    return Math.floor(currentIndex / 2)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= services.length - 2 ? 0 : prev + 2))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? services.length - 2 : prev - 2))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index * 2)
  }

  useEffect(() => {
    if (!isPaused && autoSlide) {
      const interval = setInterval(nextSlide, (slideInterval || 5) * 1000)
      return () => clearInterval(interval)
    }
  }, [currentIndex, isPaused, autoSlide, slideInterval, nextSlide])

  // Style configurations
  const styleClasses = {
    default: 'bg-gradient-to-b from-[#F8F7FF] to-white',
    dark: 'bg-gradient-to-b from-gray-900 to-gray-800',
    light: 'bg-gradient-to-b from-gray-50 to-white',
    minimal: 'bg-white',
  }

  const textClasses = {
    default: 'text-black',
    dark: 'text-white',
    light: 'text-gray-900',
    minimal: 'text-gray-900',
  }

  const subtextClasses = {
    default: 'text-gray-600',
    dark: 'text-gray-300',
    light: 'text-gray-700',
    minimal: 'text-gray-600',
  }

  return (
    <main className={cn('px-4 p-8 md:py-10', styleClasses[style as keyof typeof styleClasses])}>
      <div className="max-w-7xl mx-auto my-10">
        {(heading || subheading) && (
          <div className="mb-12">
            {heading && (
              <h2
                className={cn(
                  'text-3xl md:text-4xl font-bold mb-2 text-center',
                  textClasses[style as keyof typeof textClasses],
                )}
              >
                {heading}
              </h2>
            )}
            {subheading && (
              <h3
                className={cn(
                  'text-sm md:text-xl text-center',
                  subtextClasses[style as keyof typeof subtextClasses],
                )}
              >
                {subheading}
              </h3>
            )}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="w-full lg:w-1/2 pt-4">
            <div className="relative before:content-[''] before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-gradient-to-b before:from-[#1E0E62] before:to-[#6C63FF] before:rounded-full pl-6">
              {leftSectionTitle && (
                <h3 className="text-xl md:text-3xl font-bold text-[#1E0E62] mb-4 leading-tight">
                  {leftSectionTitle}
                </h3>
              )}
              {leftSectionDescription && (
                <p className="text-gray-600 mb-6 text-lg">{leftSectionDescription}</p>
              )}
              {content && content.root && (
                <div className="mb-6">
                  <RichText data={content} enableGutter={false} />
                </div>
              )}
              {ctaButtonText && ctaButtonUrl && (
                <a
                  href={ctaButtonUrl}
                  className="inline-block bg-[#1E0E62] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2d1691] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {ctaButtonText}
                </a>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/2 pt-4">
            <div
              className="relative"
              ref={sliderRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  className="relative flex space-x-6 items-stretch"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {services.slice(currentIndex, currentIndex + 2).map((service, index) => (
                    <motion.div
                      key={index}
                      className={`flex-1 bg-gradient-to-br ${service.bgColor} rounded-xl overflow-hidden shadow-md`}
                      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-4xl">{service.icon}</span>
                          {service.stepNumber && (
                            <span className="text-xs font-semibold bg-white/70 px-2 py-1 rounded-full text-[#1E0E62]">
                              {service.stepNumber}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-[#1E0E62] mb-2">{service.title}</h3>
                        <p className="text-gray-700 flex-grow mb-4">{service.description}</p>
                        <div className="mt-auto">
                          <span className="text-[#1E0E62] text-sm font-medium hover:underline cursor-pointer">
                            Learn more →
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-1 my-4">
                {Array.from({ length: totalPairs }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      getCurrentPairIndex() === idx ? 'w-6 bg-[#1E0E62]' : 'w-3 bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 z-10"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 19L8 12L15 5"
                    stroke="#1E0E62"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 z-10"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5L16 12L9 19"
                    stroke="#1E0E62"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
