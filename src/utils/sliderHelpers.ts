/**
 * Utility functions for the slider component
 */

import type { SlideData, SliderError } from '../types/slider'

/**
 * Validates slide data structure
 */
export const validateSlideData = (slides: any[]): { isValid: boolean; errors: SliderError[] } => {
  const errors: SliderError[] = []

  if (!Array.isArray(slides)) {
    errors.push({
      type: 'INVALID_SLIDE_DATA',
      message: 'Slides must be an array',
    })
    return { isValid: false, errors }
  }

  if (slides.length === 0) {
    errors.push({
      type: 'INVALID_SLIDE_DATA',
      message: 'At least one slide is required',
    })
    return { isValid: false, errors }
  }

  slides.forEach((slide, index) => {
    if (!slide) {
      errors.push({
        type: 'INVALID_SLIDE_DATA',
        message: `Slide at index ${index} is null or undefined`,
        slideIndex: index,
      })
      return
    }

    if (!slide.type || !['image', 'video'].includes(slide.type)) {
      errors.push({
        type: 'INVALID_SLIDE_DATA',
        message: `Slide at index ${index} must have a valid type (image or video)`,
        slideIndex: index,
      })
    }

    if (!slide.alt || typeof slide.alt !== 'string') {
      errors.push({
        type: 'INVALID_SLIDE_DATA',
        message: `Slide at index ${index} must have an alt text for accessibility`,
        slideIndex: index,
      })
    }

    if (
      slide.type === 'image' &&
      (!slide.backgroundImage || typeof slide.backgroundImage !== 'string')
    ) {
      errors.push({
        type: 'INVALID_SLIDE_DATA',
        message: `Image slide at index ${index} must have a valid backgroundImage URL`,
        slideIndex: index,
      })
    }

    if (slide.type === 'video' && (!slide.videoUrl || typeof slide.videoUrl !== 'string')) {
      errors.push({
        type: 'INVALID_SLIDE_DATA',
        message: `Video slide at index ${index} must have a valid videoUrl`,
        slideIndex: index,
      })
    }
  })

  return { isValid: errors.length === 0, errors }
}

/**
 * Preloads an image and returns a promise
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = (error) => reject(new Error(`Failed to load image: ${src}`))
    img.src = src
  })
}

/**
 * Preloads multiple images
 */
export const preloadImages = async (
  sources: string[],
): Promise<{ loaded: string[]; failed: string[] }> => {
  const results = await Promise.allSettled(
    sources.map(async (src) => {
      await preloadImage(src)
      return src
    }),
  )

  const loaded: string[] = []
  const failed: string[] = []

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      loaded.push(result.value)
    } else {
      failed.push(sources[index])
    }
  })

  return { loaded, failed }
}

/**
 * Generates image srcSet for responsive images
 */
export const generateSrcSet = (
  baseUrl: string,
  sizes: number[] = [640, 768, 1024, 1280, 1920],
): string => {
  if (!baseUrl.includes('cloudinary.com') && !baseUrl.includes('imagekit.io')) {
    return baseUrl
  }

  // For Cloudinary URLs
  if (baseUrl.includes('cloudinary.com')) {
    return sizes
      .map((size) => `${baseUrl.replace('/upload/', `/upload/w_${size}/`)} ${size}w`)
      .join(', ')
  }

  // For ImageKit URLs
  if (baseUrl.includes('imagekit.io')) {
    return sizes.map((size) => `${baseUrl}?tr=w-${size} ${size}w`).join(', ')
  }

  return baseUrl
}

/**
 * Calculates optimal image sizes string for responsive loading
 */
export const generateSizes = (): string => {
  return '(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw'
}

/**
 * Debounces a function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttles a function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), wait)
    }
  }
}

/**
 * Detects if device supports touch
 */
export const isTouchDevice = (): boolean => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/**
 * Detects if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Gets the optimal image quality based on device and connection
 */
export const getOptimalImageQuality = (): number => {
  if (typeof window === 'undefined') return 85

  // @ts-ignore - connection is experimental
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection

  if (!connection) return 85

  const effectiveType = connection.effectiveType

  switch (effectiveType) {
    case '4g':
      return 90
    case '3g':
      return 75
    case '2g':
      return 60
    default:
      return 85
  }
}

/**
 * Formats slide data for analytics
 */
export const formatSlideForAnalytics = (slide: SlideData, index: number) => {
  return {
    slide_index: index,
    slide_type: slide.type,
    slide_title: slide.title || '',
    slide_has_cta: !!(slide.buttonText && (slide.buttonLink || slide.buttonAction)),
    slide_text_position: slide.textPosition || 'left',
  }
}

/**
 * Creates intersection observer for lazy loading
 */
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {},
): IntersectionObserver | null => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null
  }

  return new IntersectionObserver(callback, {
    rootMargin: '50px 0px',
    threshold: 0.1,
    ...options,
  })
}

/**
 * Safe focus management
 */
export const focusElement = (element: HTMLElement | null, preventScroll = true) => {
  if (element && typeof element.focus === 'function') {
    element.focus({ preventScroll })
  }
}

/**
 * Keyboard navigation key mapping
 */
export const SLIDER_KEYS = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  SPACE: ' ',
  ENTER: 'Enter',
  HOME: 'Home',
  END: 'End',
  ESCAPE: 'Escape',
} as const

/**
 * Error boundary fallback component props
 */
export const createErrorFallback = (error: Error, retry?: () => void) => ({
  error,
  retry,
  title: 'Something went wrong',
  description: 'Unable to load the slider content',
  retryText: 'Try again',
})
