'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  {
    title: 'Documentation for visa',
    icon: '🛂',
    description: 'Complete visa documentation assistance for a smooth application process.',
    bgColor: 'from-pink-100 to-pink-50',
    step: 'Step 1',
  },
  {
    title: 'Documentation for university',
    icon: '📚',
    description: 'Comprehensive university application support to secure your admission.',
    bgColor: 'from-yellow-100 to-yellow-50',
    step: 'Step 2',
  },
  {
    title: 'Airport Pickup',
    icon: '✈️',
    description: 'Hassle-free airport transfer service to your accommodation upon arrival.',
    bgColor: 'from-blue-100 to-blue-50',
    step: 'Step 3',
  },
  {
    title: 'Sim Card Arrangement',
    icon: '📱',
    description: 'Local sim card setup to keep you connected from day one.',
    bgColor: 'from-green-100 to-green-50',
    step: 'Step 4',
  },
  {
    title: 'Medical Documentation',
    icon: '🏥',
    description: 'Complete 6-year medical documentation guidance and support.',
    bgColor: 'from-purple-100 to-purple-50',
    step: 'Step 5',
  },
  {
    title: 'Ongoing Student Support',
    icon: '👋',
    description: 'Continuous support throughout your academic journey until graduation.',
    bgColor: 'from-indigo-100 to-indigo-50',
    step: 'Step 6',
  },
]

export const CustomType1 = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sliderRef = useRef(null)

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

  const goToSlide = (index) => {
    setCurrentIndex(index * 2)
  }

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(nextSlide, 5000)
      return () => clearInterval(interval)
    }
  }, [currentIndex, isPaused])

  return (
    <main className="px-4 p-8 md:py-10 bg-gradient-to-b from-[#F8F7FF] to-white">
      <div className="max-w-7xl mx-auto my-10">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-2 text-center">
            Your Journey With Us
          </h2>
          <h3 className="text-sm md:text-xl text-gray-600 text-center">
            Experience our comprehensive support services for medical study in Georgia
          </h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="w-full lg:w-1/2 pt-4">
            <div className="relative before:content-[''] before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-gradient-to-b before:from-[#1E0E62] before:to-[#6C63FF] before:rounded-full pl-6">
              <h3 className="text-xl md:text-3xl font-bold text-[#1E0E62] mb-4 leading-tight">
                Your Medical Education Journey
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                From application to graduation, we&apos;re with you every step of the way. Our
                comprehensive support ensures your study abroad experience is seamless and
                successful.
              </p>
              <button className="bg-[#1E0E62] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2d1691] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Start Your Journey →
              </button>
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
                          <span className="text-xs font-semibold bg-white/70 px-2 py-1 rounded-full text-[#1E0E62]">
                            {service.step}
                          </span>
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
