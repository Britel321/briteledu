'use client'

import { IconArrowLeft, IconArrowRight, IconStar } from '@tabler/icons-react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import type { TestimonialsBlock, Media } from '@/payload-types'
import { cn } from '@/utilities/ui'

type Testimonial = {
  quote: string
  name: string
  designation: string
  src: string
  company?: string
  rating?: number
}

interface AnimatedTestimonialsProps {
  testimonials?: TestimonialsBlock['testimonials']
  autoplay?: boolean
  autoplayInterval?: number
  showNavigation?: boolean
  showRatings?: boolean
  style?: string
}

export const AnimatedTestimonials: React.FC<AnimatedTestimonialsProps> = ({
  testimonials: testimonialsData,
  autoplay = false,
  autoplayInterval = 5,
  showNavigation = true,
  showRatings = false,
  style = 'default',
}) => {
  // Transform testimonials data or use defaults
  const testimonials: Testimonial[] = React.useMemo(() => {
    if (!testimonialsData || testimonialsData.length === 0) {
      // Default fallback testimonials
      return [
        {
          quote:
            "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
          name: 'Sujata Shrestha',
          designation: 'Product Manager at HimalTech',
          src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3',
        },
        {
          quote:
            "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
          name: 'Prabin Gautam',
          designation: 'CTO at Arya Systems',
          src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3',
        },
        {
          quote:
            "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
          name: 'Aarati Koirala',
          designation: 'Operations Director at Khusiyali Labs',
          src: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3',
        },
        {
          quote:
            "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
          name: 'Nischal Adhikari',
          designation: 'Engineering Lead at Kathmandu DataWorks',
          src: 'https://images.unsplash.com/photo-1511367461989-f85a21fdae15?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3',
        },
        {
          quote:
            'The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.',
          name: 'Binita Maharjan',
          designation: 'VP of Technology at Sagarmatha Networks',
          src: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3',
        },
      ]
    }

    return testimonialsData.map((testimonial) => {
      const image = testimonial.image as Media
      const designation = testimonial.company
        ? `${testimonial.designation} at ${testimonial.company}`
        : testimonial.designation

      return {
        quote: testimonial.quote || '',
        name: testimonial.name || '',
        designation: designation || '',
        src:
          image?.url ||
          testimonial.fallbackImageUrl ||
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3',
        company: testimonial.company || undefined,
        rating: testimonial.rating || undefined,
      }
    })
  }, [testimonialsData])

  const [active, setActive] = useState(0)

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const isActive = (index: number) => {
    return index === active
  }

  useEffect(() => {
    if (autoplay && testimonials.length > 1) {
      const interval = setInterval(handleNext, (autoplayInterval || 5) * 1000)
      return () => clearInterval(interval)
    }
  }, [autoplay, autoplayInterval, testimonials.length, handleNext])

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10
  }

  // Style configurations
  const _containerClasses = {
    default: '',
    dark: 'text-white',
    light: '',
    minimal: '',
    gradient: '',
  }

  const textClasses = {
    default: 'text-black dark:text-white',
    dark: 'text-white',
    light: 'text-gray-900',
    minimal: 'text-gray-900',
    gradient: 'text-gray-900',
  }

  const subtextClasses = {
    default: 'text-gray-500 dark:text-neutral-500',
    dark: 'text-gray-300',
    light: 'text-gray-600',
    minimal: 'text-gray-600',
    gradient: 'text-gray-600',
  }

  const quoteClasses = {
    default: 'text-gray-500 dark:text-neutral-300',
    dark: 'text-gray-200',
    light: 'text-gray-700',
    minimal: 'text-gray-700',
    gradient: 'text-gray-700',
  }

  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <IconStar
            key={star}
            className={cn(
              'w-4 h-4',
              star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300',
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 2 : 1,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: 'easeInOut',
            }}
          >
            {showRatings && testimonials[active].rating && (
              <StarRating rating={testimonials[active].rating!} />
            )}
            <h3
              className={cn('text-2xl font-bold', textClasses[style as keyof typeof textClasses])}
            >
              {testimonials[active].name}
            </h3>
            <p className={cn('text-sm', subtextClasses[style as keyof typeof subtextClasses])}>
              {testimonials[active].designation}
            </p>
            <motion.p
              className={cn('mt-8 text-lg', quoteClasses[style as keyof typeof quoteClasses])}
            >
              {testimonials[active].quote.split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: 'blur(10px)',
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: 'blur(0px)',
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: 'easeInOut',
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          {showNavigation && testimonials.length > 1 && (
            <div className="flex gap-4 pt-12 md:pt-0">
              <button
                onClick={handlePrev}
                className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
              >
                <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
              </button>
              <button
                onClick={handleNext}
                className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
              >
                <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
