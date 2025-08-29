'use client'
import React, { useState, useEffect } from 'react'
import type { PhotoGalleryBlock as PhotoGalleryBlockProps, Media } from '@/payload-types'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
} & PhotoGalleryBlockProps

export const PhotoGalleryBlock: React.FC<Props> = ({
  className,
  heading,
  description,
  layout = 'grid',
  columns = '3',
  photos,
  showImageCount = true,
  buttonText = 'Show All Images',
  style = 'default',
}) => {
  const [, setSelectedImageIndex] = useState<number | null>(null)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Transform photos data for internal use
  const images = React.useMemo(() => {
    if (!photos || photos.length === 0) return []

    return photos
      .map((photo) => {
        const image = photo.image as Media
        return {
          src: image?.url || '',
          alt: photo.alt || photo.title || image?.alt || image?.filename || 'Gallery image',
          title: photo.title || image?.filename || 'Untitled',
          description: photo.description || '',
        }
      })
      .filter((img) => img.src) // Only include images with valid URLs
  }, [photos])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
      },
    },
  }

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const slideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }

  const handleImageClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedImageIndex(index)
    setCurrentSlideIndex(index)
    setIsModalOpen(true)
  }

  const closeGallery = () => {
    setSelectedImageIndex(null)
    setIsModalOpen(false)
  }

  const showAllImages = () => {
    setSelectedImageIndex(0)
    setCurrentSlideIndex(0)
    setIsModalOpen(true)
  }

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeGallery()
    } else if (e.key === 'ArrowRight') {
      nextSlide()
    } else if (e.key === 'ArrowLeft') {
      prevSlide()
    }
  }

  // Style configurations
  const styleClasses = {
    default: 'bg-white',
    dark: 'bg-gray-900',
    light: 'bg-gray-50',
    minimal: 'bg-transparent',
  }

  const textClasses = {
    default: 'text-gray-900',
    dark: 'text-white',
    light: 'text-gray-900',
    minimal: 'text-gray-900',
  }

  const descriptionClasses = {
    default: 'text-gray-600',
    dark: 'text-gray-300',
    light: 'text-gray-700',
    minimal: 'text-gray-600',
  }

  // Grid column classes
  const gridClasses = {
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  // Ensure we have images to display
  if (!images || images.length === 0) {
    return null
  }

  return (
    <>
      <section
        id="photo-gallery"
        className={cn('py-10', styleClasses[style as keyof typeof styleClasses], className)}
      >
        <div className="container">
          {/* Section Header */}
          {(heading || description) && (
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {heading && (
                <h2
                  className={cn(
                    'text-3xl md:text-4xl font-bold mb-4',
                    textClasses[style as keyof typeof textClasses],
                  )}
                >
                  {heading}
                </h2>
              )}
              {description && (
                <p
                  className={cn(
                    'text-lg max-w-2xl mx-auto mb-4',
                    descriptionClasses[style as keyof typeof descriptionClasses],
                  )}
                >
                  {description}
                </p>
              )}
              <div className="section-divider w-24 h-1 bg-blue-600 mx-auto"></div>
            </motion.div>
          )}

          {/* Image Grid */}
          <motion.div
            className={cn(
              'grid gap-4 lg:gap-6 w-full',
              layout === 'grid'
                ? gridClasses[columns as keyof typeof gridClasses]
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
            )}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                variants={cardVariants}
                onClick={(e) => handleImageClick(index, e)}
                style={{ cursor: 'pointer' }}
              >
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 pointer-events-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  draggable={false}
                />

                {/* Overlay with description */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                    {image.description && (
                      <p className="text-sm text-gray-200 line-clamp-2">{image.description}</p>
                    )}
                  </div>
                </div>

                {/* Click indicator */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>

                {/* Clickable overlay for better touch targets */}
                <div
                  className="absolute inset-0 z-10 cursor-pointer"
                  onClick={(e) => handleImageClick(index, e)}
                  style={{ cursor: 'pointer' }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Show All Images Button */}
          {showImageCount && (
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.button
                onClick={showAllImages}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Images size={20} />
                {buttonText} ({images.length})
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Image Gallery Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-95 z-[9999] flex items-center justify-center p-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeGallery}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
            }}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 backdrop-blur-sm rounded-full p-3"
              onClick={closeGallery}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>

            {/* Navigation Buttons - Fixed positioning to prevent layout shifts */}
            <motion.button
              className="text-white hover:text-gray-300 z-10 bg-black/50 backdrop-blur-sm rounded-full p-3 transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation()
                prevSlide()
              }}
              style={{
                position: 'fixed',
                left: '1rem',
                top: '50%',
                zIndex: 10,
              }}
              initial={{ y: '-50%' }}
              animate={{ y: '-50%' }}
              whileHover={{ y: '-50%', scale: 1.1 }}
              whileTap={{ y: '-50%', scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            <motion.button
              className="text-white hover:text-gray-300 z-10 bg-black/50 backdrop-blur-sm rounded-full p-3 transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation()
                nextSlide()
              }}
              style={{
                position: 'fixed',
                right: '1rem',
                top: '50%',
                zIndex: 10,
              }}
              initial={{ y: '-50%' }}
              animate={{ y: '-50%' }}
              whileHover={{ y: '-50%', scale: 1.1 }}
              whileTap={{ y: '-50%', scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>

            {/* Image Container */}
            <div className="relative max-w-5xl max-h-full" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlideIndex}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <Image
                    src={images[currentSlideIndex]?.src || ''}
                    alt={images[currentSlideIndex]?.alt || ''}
                    width={1000}
                    height={1000}
                    className="max-w-full max-h-[80vh] object-contain"
                  />

                  {/* Image Info */}
                  {(images[currentSlideIndex]?.title || images[currentSlideIndex]?.description) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-2xl font-bold mb-2">
                        {images[currentSlideIndex]?.title}
                      </h3>
                      {images[currentSlideIndex]?.description && (
                        <p className="text-gray-200">{images[currentSlideIndex]?.description}</p>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Slide Indicators */}
              <div className="flex justify-center mt-6 space-x-3">
                {images.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === currentSlideIndex ? 'bg-white' : 'bg-gray-500 hover:bg-gray-400'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentSlideIndex(index)
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>

              {/* Image Counter */}
              <div className="absolute top-4 left-4 text-white bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                {currentSlideIndex + 1} / {images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
