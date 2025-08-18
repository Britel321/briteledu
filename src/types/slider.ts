import { ReactNode, CSSProperties } from 'react'

// Base slide interface supporting multiple media types
export interface BaseSlide {
  id?: string
  alt: string
  title?: string
  subtitle?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  buttonAction?: () => void
  customOverlay?: ReactNode
  textPosition?: 'left' | 'center' | 'right' | 'custom'
  textAlignment?: 'left' | 'center' | 'right'
  overlayOpacity?: number
  priority?: boolean // For image loading priority
}

// Image slide interface
export interface ImageSlide extends BaseSlide {
  type: 'image'
  backgroundImage: string
  thumbnail?: string // For preloading/thumbnails
  srcSet?: string
  sizes?: string
}

// Video slide interface
export interface VideoSlide extends BaseSlide {
  type: 'video'
  videoUrl: string
  posterImage?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
}

// Union type for all slide types
export type SlideData = ImageSlide | VideoSlide

// Animation presets
export type AnimationPreset = 'fade' | 'slide' | 'zoom' | 'flip' | 'cube' | 'custom'

// Custom animation configuration
export interface CustomAnimation {
  enter: any
  center: any
  exit: any
  transition?: any
}

// Progress indicator styles
export type ProgressIndicatorStyle = 'dots' | 'bars' | 'numbers' | 'thumbnails' | 'progress-bar'

// Main props interface
export interface HeroSliderProps {
  slides?: SlideData[]
  autoPlay?: boolean
  interval?: number
  pauseOnHover?: boolean
  pauseOnFocus?: boolean
  showDots?: boolean
  showArrows?: boolean
  showProgressBar?: boolean
  showPlayPause?: boolean
  showThumbnails?: boolean
  infiniteLoop?: boolean
  startFromSlide?: number
  className?: string

  // Visual customization
  height?: string | number
  aspectRatio?: string
  animation?: AnimationPreset
  customAnimation?: CustomAnimation
  transitionDuration?: number
  progressIndicatorStyle?: ProgressIndicatorStyle
  arrowStyle?: 'default' | 'minimal' | 'bold' | 'custom'
  dotStyle?: 'default' | 'minimal' | 'large' | 'custom'

  // Accessibility
  ariaLabel?: string
  ariaLabelledBy?: string
  announceSlideChanges?: boolean

  // Performance
  preloadImages?: number // Number of images to preload
  lazyLoad?: boolean
  enableImageOptimization?: boolean

  // Mobile/Touch
  enableSwipe?: boolean
  swipeThreshold?: number
  enableKeyboardNavigation?: boolean

  // Callbacks
  onSlideChange?: (currentSlide: number, slideData: SlideData) => void
  onPlay?: () => void
  onPause?: () => void
  onLoad?: () => void
  onError?: (error: Error) => void

  // Advanced features
  parallaxEffect?: boolean
  kenBurnsEffect?: boolean
  rtlSupport?: boolean
  fullscreen?: boolean
  enableAnalytics?: boolean

  // Custom styling
  containerStyles?: CSSProperties
  slideStyles?: CSSProperties
  contentStyles?: CSSProperties
  overlayStyles?: CSSProperties
}

// Hook configuration
export interface UseAutoSliderConfig {
  totalSlides: number
  interval: number
  pauseOnHover?: boolean
  pauseOnFocus?: boolean
  infiniteLoop?: boolean
  startFromSlide?: number
}

// Error types
export interface SliderError extends Error {
  type: 'IMAGE_LOAD_ERROR' | 'VIDEO_LOAD_ERROR' | 'INVALID_SLIDE_DATA' | 'NAVIGATION_ERROR'
  slideIndex?: number
  originalError?: Error
}

// Analytics event types
export interface AnalyticsEvent {
  event: 'slide_view' | 'slide_click' | 'navigation_used' | 'autoplay_paused' | 'fullscreen_toggled'
  slideIndex: number
  slideData: SlideData
  timestamp: number
  userAgent?: string
}
