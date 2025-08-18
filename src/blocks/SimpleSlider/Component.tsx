'use client'

import React, { useState, useRef, useEffect, useCallback, useMemo, forwardRef, memo } from 'react'
import { motion, AnimatePresence, Variants, Easing } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import Image from 'next/image'
import { useAutoSlider } from '../../hooks/useAutoSlider'
import type { HeroSliderProps, SlideData, SliderError, AnalyticsEvent } from '../../types/slider'
import { transformConfigToProps, type SimpleSliderConfig } from './configTransformer'

// Error Boundary Component
class SliderErrorBoundary extends React.Component<
  { children: React.ReactNode; onError?: (error: SliderError) => void },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Slider Error:', error, errorInfo)
    const sliderError = new Error(error.message) as SliderError
    sliderError.type = 'NAVIGATION_ERROR'
    sliderError.originalError = error
    this.props.onError?.(sliderError)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
            <p className="text-gray-600 mb-4">Unable to load the slider content</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Loading Component
const SlideLoader = memo(() => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-50">
    <div className="bg-white/10 rounded-lg p-4">
      <Loader2 className="w-8 h-8 text-white animate-spin" />
    </div>
  </div>
))

// Video Slide Component
const VideoSlide = memo(
  ({
    slide,
    isActive,
    onLoad,
    onError,
    muted,
    setMuted,
  }: {
    slide: any
    isActive: boolean
    onLoad: () => void
    onError: (error: SliderError) => void
    muted: boolean
    setMuted: (muted: boolean) => void
  }) => {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
      const video = videoRef.current
      if (!video) return

      const handleLoad = () => onLoad()
      const handleError = () => {
        const error = new Error('Failed to load video') as SliderError
        error.type = 'VIDEO_LOAD_ERROR'
        onError(error)
      }

      video.addEventListener('loadeddata', handleLoad)
      video.addEventListener('error', handleError)

      return () => {
        video.removeEventListener('loadeddata', handleLoad)
        video.removeEventListener('error', handleError)
      }
    }, [onLoad, onError])

    useEffect(() => {
      const video = videoRef.current
      if (!video) return

      if (isActive && slide.autoPlay) {
        video.play().catch(() => {
          // Autoplay failed, likely due to browser policies
        })
      } else {
        video.pause()
      }
    }, [isActive, slide.autoPlay])

    return (
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          src={slide.videoUrl}
          poster={slide.posterImage}
          className="w-full h-full object-cover"
          muted={muted}
          loop={slide.loop}
          playsInline
          preload="metadata"
        />
        {/* Video Controls */}
        <button
          onClick={() => setMuted(!muted)}
          className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
          aria-label={muted ? 'Unmute video' : 'Mute video'}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    )
  },
)

// Main Slider Component accepting both config and direct props
const SimpleSliderBlock = forwardRef<
  HTMLDivElement,
  HeroSliderProps & { config?: SimpleSliderConfig }
>((props, ref) => {
  // Extract config and merge with direct props
  const { config, ...directProps } = props
  const configProps = config ? transformConfigToProps(config) : {}

  // Merge props with config taking precedence, then direct props overriding
  const finalProps = {
    // Default values
    slides: [],
    autoPlay: true,
    interval: 5000,
    pauseOnHover: true,
    pauseOnFocus: true,
    showDots: true,
    showArrows: true,
    showProgressBar: false,
    showPlayPause: false,
    showThumbnails: false,
    infiniteLoop: true,
    startFromSlide: 0,
    className: '',
    height: '60vh',
    animation: 'fade' as const,
    transitionDuration: 0.6,
    progressIndicatorStyle: 'dots' as const,
    arrowStyle: 'default' as const,
    dotStyle: 'default' as const,
    ariaLabel: 'Image carousel',
    announceSlideChanges: true,
    preloadImages: 2,
    lazyLoad: true,
    enableImageOptimization: true,
    enableSwipe: true,
    swipeThreshold: 50,
    enableKeyboardNavigation: true,
    parallaxEffect: false,
    kenBurnsEffect: false,
    rtlSupport: false,
    fullscreen: false,
    enableAnalytics: false,

    // Apply config props
    ...configProps,

    // Apply direct props (highest priority)
    ...directProps,
  }

  const {
    slides,
    autoPlay,
    interval,
    pauseOnHover,
    pauseOnFocus,
    showDots,
    showArrows,
    showProgressBar,
    showPlayPause,
    showThumbnails,
    infiniteLoop,
    startFromSlide,
    className,
    height,
    aspectRatio,
    animation,
    transitionDuration,
    progressIndicatorStyle,
    arrowStyle,
    dotStyle,
    ariaLabel,
    ariaLabelledBy,
    announceSlideChanges,
    preloadImages,
    lazyLoad,
    enableImageOptimization,
    enableSwipe,
    swipeThreshold,
    enableKeyboardNavigation,
    onSlideChange,
    onPlay,
    onPause,
    onLoad,
    onError,
    parallaxEffect,
    kenBurnsEffect,
    rtlSupport,
    fullscreen,
    enableAnalytics,
    containerStyles,
    slideStyles,
    contentStyles,
    overlayStyles,
  } = finalProps
  // Memoized default slides
  const defaultSlides: SlideData[] = useMemo(
    () => [
      {
        type: 'image',
        backgroundImage:
          'https://res.cloudinary.com/dz3facqgc/image/upload/v1750606682/fiddpw5sumypg3kcatsa.jpg',
        alt: 'Political campaign rally',
        title: 'Building a Better Future',
        description:
          'Join us in creating positive change for our community through innovative policies and dedicated leadership.',
        buttonText: 'Learn More',
        buttonLink: '#about',
        priority: true,
      },
      {
        type: 'image',
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
        type: 'image',
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
        type: 'image',
        backgroundImage:
          'https://res.cloudinary.com/dz3facqgc/image/upload/v1750606750/ubeqgxdmmaatptx1nikd.jpg',
        alt: 'Handshake agreement',
        title: 'Transparency & Trust',
        description:
          'Open communication and accountability are the foundation of effective governance.',
        buttonText: 'Our Values',
        buttonLink: '#values',
      },
    ],
    [],
  )

  // Use provided slides or fallback to default
  const finalSlides = useMemo(
    () => (slides.length > 0 ? slides : defaultSlides),
    [slides, defaultSlides],
  )

  // State management
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set())
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [focusedElement, setFocusedElement] = useState<string | null>(null)
  const [announceText, setAnnounceText] = useState<string>('')

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const announcementRef = useRef<HTMLDivElement>(null)

  // Enhanced slider hook
  const {
    currentSlide,
    direction,
    progress,
    nextSlide,
    prevSlide,
    goToSlide,
    isPlaying,
    pauseSlider,
    resumeSlider,
    canGoNext,
    canGoPrev,
    isFirstSlide,
    isLastSlide,
  } = useAutoSlider({
    totalSlides: finalSlides.length,
    interval,
    pauseOnHover,
    pauseOnFocus,
    infiniteLoop,
    startFromSlide,
  })

  // Memoized animation variants
  const slideVariants = useMemo((): Variants => {
    const baseTransition = {
      duration: transitionDuration,
      ease: 'easeInOut' as Easing,
    }

    switch (animation) {
      case 'slide':
        return {
          enter: (direction: string) => ({
            x: direction === 'forward' ? '100%' : '-100%',
            opacity: 1,
          }),
          center: { x: 0, opacity: 1, zIndex: 1 },
          exit: (direction: string) => ({
            x: direction === 'forward' ? '-100%' : '100%',
            opacity: 1,
            zIndex: 0,
            transition: baseTransition,
          }),
        }
      case 'zoom':
        return {
          enter: { scale: 0.8, opacity: 0 },
          center: { scale: 1, opacity: 1, zIndex: 1 },
          exit: { scale: 1.2, opacity: 0, zIndex: 0, transition: baseTransition },
        }
      case 'flip':
        return {
          enter: { rotateY: 90, opacity: 0 },
          center: { rotateY: 0, opacity: 1, zIndex: 1 },
          exit: { rotateY: -90, opacity: 0, zIndex: 0, transition: baseTransition },
        }
      default: // fade
        return {
          enter: { opacity: 0 },
          center: { opacity: 1, zIndex: 1 },
          exit: { opacity: 0, zIndex: 0, transition: baseTransition },
        }
    }
  }, [animation, transitionDuration])

  const textVariants = useMemo(
    (): Variants => ({
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: 'easeOut' as Easing,
          delay: 0.2,
        },
      },
    }),
    [],
  )

  // Enhanced image preloading
  const preloadNearbyImages = useCallback(
    (centerIndex: number) => {
      const imagesToPreload = []

      for (let i = 1; i <= preloadImages; i++) {
        const nextIndex = (centerIndex + i) % finalSlides.length
        const prevIndex = (centerIndex - i + finalSlides.length) % finalSlides.length

        if (!loadedImages.has(nextIndex)) imagesToPreload.push(nextIndex)
        if (!loadedImages.has(prevIndex)) imagesToPreload.push(prevIndex)
      }

      imagesToPreload.forEach((index) => {
        const slide = finalSlides[index]
        if (slide?.type === 'image' && slide.backgroundImage) {
          const img = new window.Image()
          img.onload = () => {
            setLoadedImages((prev) => new Set(prev).add(index))
          }
          img.onerror = () => {
            setFailedImages((prev) => new Set(prev).add(index))
            const error = new Error('Failed to load image') as SliderError
            error.type = 'IMAGE_LOAD_ERROR'
            error.slideIndex = index
            onError?.(error)
          }
          img.src = slide.backgroundImage
        }
      })
    },
    [preloadImages, finalSlides, loadedImages, onError],
  )

  // Analytics tracking
  const trackEvent = useCallback(
    (event: Omit<AnalyticsEvent, 'timestamp'>) => {
      if (enableAnalytics && typeof window !== 'undefined' && 'gtag' in window) {
        const fullEvent: AnalyticsEvent = {
          ...event,
          timestamp: Date.now(),
        }

        const gtag = (window as any).gtag
        if (typeof gtag === 'function') {
          gtag('event', 'slider_interaction', {
            event_category: 'slider',
            event_label: fullEvent.event,
            slide_index: fullEvent.slideIndex,
            custom_parameter: JSON.stringify(fullEvent),
          })
        }
      }
    },
    [enableAnalytics],
  )

  // Enhanced touch/swipe handling
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!enableSwipe) return

      setTouchEnd(null)
      setTouchStart(e.targetTouches[0]?.clientX || null)
      setIsDragging(true)

      if (pauseOnHover) pauseSlider('touch')
    },
    [enableSwipe, pauseOnHover, pauseSlider],
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!enableSwipe || !touchStart) return

      setTouchEnd(e.targetTouches[0]?.clientX || null)
    },
    [enableSwipe, touchStart],
  )

  const handleTouchEnd = useCallback(() => {
    if (!enableSwipe || !touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > swipeThreshold
    const isRightSwipe = distance < -swipeThreshold

    if (isLeftSwipe && canGoNext) {
      nextSlide()
      trackEvent({
        event: 'navigation_used',
        slideIndex: currentSlide,
        slideData: finalSlides[currentSlide],
      })
    }
    if (isRightSwipe && canGoPrev) {
      prevSlide()
      trackEvent({
        event: 'navigation_used',
        slideIndex: currentSlide,
        slideData: finalSlides[currentSlide],
      })
    }

    setTouchStart(null)
    setTouchEnd(null)
    setIsDragging(false)

    setTimeout(() => {
      if (pauseOnHover) resumeSlider('touch')
    }, 1000)
  }, [
    enableSwipe,
    touchStart,
    touchEnd,
    swipeThreshold,
    canGoNext,
    canGoPrev,
    nextSlide,
    prevSlide,
    pauseOnHover,
    resumeSlider,
    currentSlide,
    finalSlides,
    trackEvent,
  ])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!enableKeyboardNavigation) return

      const key = e.key
      let handled = false

      switch (key) {
        case 'ArrowLeft':
          if (canGoPrev) {
            prevSlide()
            handled = true
          }
          break
        case 'ArrowRight':
          if (canGoNext) {
            nextSlide()
            handled = true
          }
          break
        case ' ': // Spacebar
          if (isPlaying) {
            pauseSlider()
            onPause?.()
          } else {
            resumeSlider()
            onPlay?.()
          }
          handled = true
          break
        case 'Home':
          goToSlide(0)
          handled = true
          break
        case 'End':
          goToSlide(finalSlides.length - 1)
          handled = true
          break
        default:
          // Number keys 1-9
          if (/^[1-9]$/.test(key)) {
            const slideIndex = parseInt(key) - 1
            if (slideIndex < finalSlides.length) {
              goToSlide(slideIndex)
              handled = true
            }
          }
      }

      if (handled) {
        e.preventDefault()
        trackEvent({
          event: 'navigation_used',
          slideIndex: currentSlide,
          slideData: finalSlides[currentSlide],
        })
      }
    },
    [
      enableKeyboardNavigation,
      canGoPrev,
      canGoNext,
      prevSlide,
      nextSlide,
      isPlaying,
      pauseSlider,
      resumeSlider,
      onPause,
      onPlay,
      goToSlide,
      finalSlides,
      currentSlide,
      trackEvent,
    ],
  )

  // Mouse event handlers
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) pauseSlider('hover')
  }, [pauseOnHover, pauseSlider])

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) resumeSlider('hover')
  }, [pauseOnHover, resumeSlider])

  const handleFocus = useCallback(
    (elementId: string) => {
      setFocusedElement(elementId)
      if (pauseOnFocus) pauseSlider('focus')
    },
    [pauseOnFocus, pauseSlider],
  )

  const handleBlur = useCallback(() => {
    setFocusedElement(null)
    if (pauseOnFocus) resumeSlider('focus')
  }, [pauseOnFocus, resumeSlider])

  // Fullscreen functionality
  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return

    try {
      if (!isFullscreen) {
        await containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }

      trackEvent({
        event: 'fullscreen_toggled',
        slideIndex: currentSlide,
        slideData: finalSlides[currentSlide],
      })
    } catch (error) {
      console.error('Fullscreen error:', error)
    }
  }, [isFullscreen, currentSlide, finalSlides, trackEvent])

  // Effects
  useEffect(() => {
    preloadNearbyImages(currentSlide)
  }, [currentSlide, preloadNearbyImages])

  useEffect(() => {
    if (announceSlideChanges && announceText) {
      const timer = setTimeout(() => setAnnounceText(''), 1000)
      return () => clearTimeout(timer)
    }
  }, [announceText, announceSlideChanges])

  useEffect(() => {
    onSlideChange?.(currentSlide, finalSlides[currentSlide])

    if (announceSlideChanges) {
      const slide = finalSlides[currentSlide]
      setAnnounceText(
        `Slide ${currentSlide + 1} of ${finalSlides.length}: ${slide?.title || slide?.alt || 'Slide'}`,
      )
    }

    trackEvent({
      event: 'slide_view',
      slideIndex: currentSlide,
      slideData: finalSlides[currentSlide],
    })
  }, [currentSlide, finalSlides, onSlideChange, announceSlideChanges, trackEvent])

  useEffect(() => {
    onLoad?.()
  }, [onLoad])

  // Fullscreen event listeners
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Early returns for error states
  if (!finalSlides.length) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <p className="text-gray-600">No slides available</p>
      </div>
    )
  }

  const currentSlideData = finalSlides[currentSlide]
  if (!currentSlideData) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <p className="text-gray-600">Slide data not available</p>
      </div>
    )
  }

  const containerHeight = aspectRatio ? 'auto' : height
  const containerClasses = `
    relative w-full overflow-hidden bg-gray-900 focus-within:outline-none
    ${isFullscreen ? 'fixed inset-0 z-50 h-screen' : ''}
    ${className}
  `.trim()

  return (
    <SliderErrorBoundary onError={onError}>
      <div
        ref={containerRef}
        className={containerClasses}
        style={{
          height: containerHeight,
          aspectRatio,
          ...containerStyles,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        role="region"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-live={announceSlideChanges ? 'polite' : undefined}
        tabIndex={0}
        dir={rtlSupport ? 'rtl' : 'ltr'}
      >
        {/* Screen reader announcements */}
        {announceSlideChanges && (
          <div ref={announcementRef} className="sr-only" aria-live="polite" aria-atomic="true">
            {announceText}
          </div>
        )}

        {/* Slides Container */}
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              ref={(el) => {
                slideRefs.current[currentSlide] = el
              }}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
              style={slideStyles}
            >
              {currentSlideData.type === 'video' ? (
                <VideoSlide
                  slide={currentSlideData}
                  isActive={true}
                  onLoad={() => setLoadedImages((prev) => new Set(prev).add(currentSlide))}
                  onError={(error) => onError?.(error)}
                  muted={isVideoMuted}
                  setMuted={setIsVideoMuted}
                />
              ) : (
                <div className="relative w-full h-full">
                  {/* Show loader while image is loading */}
                  {!loadedImages.has(currentSlide) && !failedImages.has(currentSlide) && (
                    <SlideLoader />
                  )}

                  {/* Error state for failed images */}
                  {failedImages.has(currentSlide) ? (
                    <div className="flex items-center justify-center w-full h-full bg-gray-800">
                      <div className="text-center text-white">
                        <AlertCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Failed to load image</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Image
                        src={currentSlideData.backgroundImage || ''}
                        alt={currentSlideData.alt || ''}
                        fill
                        className={`object-cover transition-transform duration-1000 ${
                          kenBurnsEffect ? 'hover:scale-105' : ''
                        } ${parallaxEffect ? 'transform-gpu' : ''}`}
                        loading={currentSlideData.priority || currentSlide === 0 ? 'eager' : 'lazy'}
                        priority={currentSlideData.priority || currentSlide === 0}
                        quality={enableImageOptimization ? 85 : 100}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                        onLoad={() => setLoadedImages((prev) => new Set(prev).add(currentSlide))}
                        onError={() => {
                          setFailedImages((prev) => new Set(prev).add(currentSlide))
                          const error = new Error('Failed to load slide image') as SliderError
                          error.type = 'IMAGE_LOAD_ERROR'
                          error.slideIndex = currentSlide
                          onError?.(error)
                        }}
                      />
                      {/* Gradient Overlay */}
                      <div
                        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70 sm:from-black/40 sm:via-black/20 sm:to-black/60"
                        style={overlayStyles}
                      />
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Overlay */}
        {(currentSlideData.title || currentSlideData.description) && (
          <div className="absolute inset-0 flex items-end justify-start z-30 pointer-events-none">
            <div
              className="px-4 sm:px-8 md:px-12 lg:px-16 text-left text-white pb-8 sm:pb-16 md:pb-20"
              style={contentStyles}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${currentSlide}`}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="max-w-xs sm:max-w-xl md:max-w-2xl relative z-40"
                >
                  {currentSlideData.subtitle && (
                    <motion.p className="text-xs sm:text-sm md:text-base text-blue-300 mb-2 font-medium">
                      {currentSlideData.subtitle}
                    </motion.p>
                  )}

                  {currentSlideData.title && (
                    <motion.h1
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-tight"
                      style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                    >
                      {currentSlideData.title}
                    </motion.h1>
                  )}

                  {currentSlideData.description && (
                    <motion.p
                      className="text-sm sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl mb-3 sm:mb-4 md:mb-6 lg:mb-8 leading-relaxed opacity-90"
                      style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                    >
                      {currentSlideData.description}
                    </motion.p>
                  )}

                  {currentSlideData.buttonText &&
                    (currentSlideData.buttonLink || currentSlideData.buttonAction) && (
                      <motion.div className="pointer-events-auto">
                        {currentSlideData.buttonLink ? (
                          <a
                            href={currentSlideData.buttonLink}
                            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={() =>
                              trackEvent({
                                event: 'slide_click',
                                slideIndex: currentSlide,
                                slideData: currentSlideData,
                              })
                            }
                          >
                            {currentSlideData.buttonText}
                          </a>
                        ) : (
                          <button
                            onClick={() => {
                              currentSlideData.buttonAction?.()
                              trackEvent({
                                event: 'slide_click',
                                slideIndex: currentSlide,
                                slideData: currentSlideData,
                              })
                            }}
                            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            {currentSlideData.buttonText}
                          </button>
                        )}
                      </motion.div>
                    )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Navigation Arrows */}
        {showArrows && finalSlides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              disabled={!canGoPrev}
              onFocus={() => handleFocus('prev-arrow')}
              onBlur={handleBlur}
              className={`
                absolute left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 
                bg-black/40 backdrop-blur-sm hover:bg-black/60 disabled:opacity-50 disabled:cursor-not-allowed
                text-white p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 
                hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 z-30 
                border border-white/20
                ${arrowStyle === 'minimal' ? 'bg-transparent border-0' : ''}
                ${arrowStyle === 'bold' ? 'bg-blue-600/80 hover:bg-blue-700/80' : ''}
              `}
              aria-label="Previous slide"
              type="button"
            >
              <ChevronLeft size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
            </button>

            <button
              onClick={nextSlide}
              disabled={!canGoNext}
              onFocus={() => handleFocus('next-arrow')}
              onBlur={handleBlur}
              className={`
                absolute right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 
                bg-black/40 backdrop-blur-sm hover:bg-black/60 disabled:opacity-50 disabled:cursor-not-allowed
                text-white p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 
                hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 z-30 
                border border-white/20
                ${arrowStyle === 'minimal' ? 'bg-transparent border-0' : ''}
                ${arrowStyle === 'bold' ? 'bg-blue-600/80 hover:bg-blue-700/80' : ''}
              `}
              aria-label="Next slide"
              type="button"
            >
              <ChevronRight size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
            </button>
          </>
        )}

        {/* Progress Bar */}
        {showProgressBar && (
          <div className="absolute top-0 left-0 right-0 z-30">
            <div className="w-full bg-white/20 h-1">
              <div
                className="bg-blue-500 h-full transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Dots/Progress Indicators */}
        {showDots && finalSlides.length > 1 && (
          <div className="absolute bottom-3 sm:bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            {progressIndicatorStyle === 'dots' && (
              <div className="flex space-x-2 sm:space-x-3">
                {finalSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    onFocus={() => handleFocus(`dot-${index}`)}
                    onBlur={handleBlur}
                    className={`
                      w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 
                      focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer
                      ${
                        index === currentSlide
                          ? 'bg-white scale-125 shadow-lg'
                          : 'bg-white/50 hover:bg-white/70 hover:scale-110'
                      }
                      ${dotStyle === 'large' ? 'sm:w-4 sm:h-4' : ''}
                      ${dotStyle === 'minimal' ? 'w-1.5 h-1.5 sm:w-2 sm:h-2' : ''}
                    `}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {progressIndicatorStyle === 'numbers' && (
              <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                {currentSlide + 1} / {finalSlides.length}
              </div>
            )}

            {progressIndicatorStyle === 'progress-bar' && (
              <div className="w-24 sm:w-32 bg-white/20 rounded-full h-1">
                <div
                  className="bg-white rounded-full h-full transition-all duration-300"
                  style={{ width: `${((currentSlide + 1) / finalSlides.length) * 100}%` }}
                />
              </div>
            )}
          </div>
        )}

        {/* Thumbnails */}
        {showThumbnails && finalSlides.length > 1 && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-30">
            <div className="flex space-x-2 p-2 bg-black/50 backdrop-blur-sm rounded-lg">
              {finalSlides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`
                    w-12 h-8 rounded overflow-hidden border-2 transition-all duration-200
                    ${index === currentSlide ? 'border-white' : 'border-transparent opacity-70 hover:opacity-100'}
                  `}
                  aria-label={`Go to slide ${index + 1}: ${slide.alt}`}
                >
                  {slide.type === 'image' ? (
                    <img
                      src={slide.backgroundImage}
                      alt={slide.alt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <Play size={12} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Play/Pause Button */}
        {showPlayPause && finalSlides.length > 1 && (
          <button
            onClick={() => {
              if (isPlaying) {
                pauseSlider()
                onPause?.()
              } else {
                resumeSlider()
                onPlay?.()
              }
              trackEvent({
                event: 'autoplay_paused',
                slideIndex: currentSlide,
                slideData: currentSlideData,
              })
            }}
            onFocus={() => handleFocus('play-pause')}
            onBlur={handleBlur}
            className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-2 rounded-full transition-colors z-30"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
        )}

        {/* Fullscreen Button */}
        {fullscreen && (
          <button
            onClick={toggleFullscreen}
            onFocus={() => handleFocus('fullscreen')}
            onBlur={handleBlur}
            className="absolute top-4 right-16 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-2 rounded-full transition-colors z-30"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        )}
      </div>
    </SliderErrorBoundary>
  )
})

SimpleSliderBlock.displayName = 'SimpleSliderBlock'

export default memo(SimpleSliderBlock)
export { SimpleSliderBlock }
