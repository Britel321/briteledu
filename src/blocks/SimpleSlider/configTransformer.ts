/**
 * Utility functions to transform SimpleSlider config data into component props
 */

import type { HeroSliderProps, SlideData } from '../../types/slider'

// Type for the config data structure from Payload CMS
export interface SimpleSliderConfig {
  slides?: Array<{
    type: 'image' | 'video'
    backgroundImage?: { url: string } | null
    backgroundImageUrl?: string
    videoUrl?: string
    posterImage?: { url: string } | null
    autoPlay?: boolean
    muted?: boolean
    loop?: boolean
    alt: string
    title?: string
    subtitle?: string
    description?: string
    buttonText?: string
    buttonLink?: string
    textPosition?: 'left' | 'center' | 'right' | 'custom'
    textAlignment?: 'left' | 'center' | 'right'
    overlayOpacity?: number
    priority?: boolean
  }>
  autoPlaySettings?: {
    autoPlay?: boolean
    interval?: number
    pauseOnHover?: boolean
    pauseOnFocus?: boolean
    infiniteLoop?: boolean
    startFromSlide?: number
  }
  appearance?: {
    height?: string
    aspectRatio?: string
    animation?: 'fade' | 'slide' | 'zoom' | 'flip'
    transitionDuration?: number
    kenBurnsEffect?: boolean
    parallaxEffect?: boolean
  }
  navigation?: {
    showArrows?: boolean
    arrowStyle?: 'default' | 'minimal' | 'bold'
    showDots?: boolean
    dotStyle?: 'default' | 'minimal' | 'large'
    progressIndicatorStyle?: 'dots' | 'bars' | 'numbers' | 'thumbnails' | 'progress-bar'
    showProgressBar?: boolean
    showPlayPause?: boolean
    showThumbnails?: boolean
  }
  interaction?: {
    enableSwipe?: boolean
    swipeThreshold?: number
    enableKeyboardNavigation?: boolean
    fullscreen?: boolean
  }
  performance?: {
    preloadImages?: number
    lazyLoad?: boolean
    enableImageOptimization?: boolean
  }
  accessibility?: {
    ariaLabel?: string
    announceSlideChanges?: boolean
    rtlSupport?: boolean
  }
  advanced?: {
    enableAnalytics?: boolean
    customClassName?: string
  }
}

/**
 * Transform config slide data to component slide data
 */
export const transformSlides = (configSlides: SimpleSliderConfig['slides'] = []): SlideData[] => {
  return configSlides.map((slide, index) => {
    const baseSlide = {
      alt: slide.alt || `Slide ${index + 1}`,
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description,
      buttonText: slide.buttonText,
      buttonLink: slide.buttonLink,
      textPosition: slide.textPosition,
      textAlignment: slide.textAlignment,
      overlayOpacity: slide.overlayOpacity,
      priority: slide.priority || index === 0, // First slide has priority by default
    }

    if (slide.type === 'video') {
      return {
        ...baseSlide,
        type: 'video' as const,
        videoUrl: slide.videoUrl || '',
        posterImage: slide.posterImage?.url || '',
        autoPlay: slide.autoPlay ?? true,
        muted: slide.muted ?? true,
        loop: slide.loop ?? false,
      }
    }

    // Default to image type
    return {
      ...baseSlide,
      type: 'image' as const,
      backgroundImage: slide.backgroundImageUrl || slide.backgroundImage?.url || '',
      thumbnail: slide.backgroundImage?.url || slide.backgroundImageUrl, // For thumbnails
    }
  })
}

/**
 * Transform config data to component props
 */
export const transformConfigToProps = (config: SimpleSliderConfig): Partial<HeroSliderProps> => {
  const slides = transformSlides(config.slides)

  return {
    // Slides
    slides,

    // Auto-play settings
    autoPlay: config.autoPlaySettings?.autoPlay ?? true,
    interval: config.autoPlaySettings?.interval ?? 5000,
    pauseOnHover: config.autoPlaySettings?.pauseOnHover ?? true,
    pauseOnFocus: config.autoPlaySettings?.pauseOnFocus ?? true,
    infiniteLoop: config.autoPlaySettings?.infiniteLoop ?? true,
    startFromSlide: config.autoPlaySettings?.startFromSlide ?? 0,

    // Appearance
    height: config.appearance?.height ?? '60vh',
    aspectRatio: config.appearance?.aspectRatio,
    animation: config.appearance?.animation ?? 'fade',
    transitionDuration: config.appearance?.transitionDuration ?? 0.6,
    kenBurnsEffect: config.appearance?.kenBurnsEffect ?? false,
    parallaxEffect: config.appearance?.parallaxEffect ?? false,

    // Navigation
    showArrows: config.navigation?.showArrows ?? true,
    arrowStyle: config.navigation?.arrowStyle ?? 'default',
    showDots: config.navigation?.showDots ?? true,
    dotStyle: config.navigation?.dotStyle ?? 'default',
    progressIndicatorStyle: config.navigation?.progressIndicatorStyle ?? 'dots',
    showProgressBar: config.navigation?.showProgressBar ?? false,
    showPlayPause: config.navigation?.showPlayPause ?? false,
    showThumbnails: config.navigation?.showThumbnails ?? false,

    // Interaction
    enableSwipe: config.interaction?.enableSwipe ?? true,
    swipeThreshold: config.interaction?.swipeThreshold ?? 50,
    enableKeyboardNavigation: config.interaction?.enableKeyboardNavigation ?? true,
    fullscreen: config.interaction?.fullscreen ?? false,

    // Performance
    preloadImages: config.performance?.preloadImages ?? 2,
    lazyLoad: config.performance?.lazyLoad ?? true,
    enableImageOptimization: config.performance?.enableImageOptimization ?? true,

    // Accessibility
    ariaLabel: config.accessibility?.ariaLabel ?? 'Image carousel',
    announceSlideChanges: config.accessibility?.announceSlideChanges ?? true,
    rtlSupport: config.accessibility?.rtlSupport ?? false,

    // Advanced
    enableAnalytics: config.advanced?.enableAnalytics ?? false,
    className: config.advanced?.customClassName ?? '',
  }
}

/**
 * Get image URL from Payload media object or string
 */
export const getImageUrl = (image: { url: string } | string | null | undefined): string => {
  if (!image) return ''
  if (typeof image === 'string') return image
  return image.url || ''
}

/**
 * Validate config data and provide defaults for missing fields
 */
export const validateAndNormalizeConfig = (config: unknown): SimpleSliderConfig => {
  const configObj = config && typeof config === 'object' ? (config as Record<string, unknown>) : {}

  return {
    slides: Array.isArray(configObj.slides) ? configObj.slides : [],
    autoPlaySettings:
      configObj.autoPlaySettings && typeof configObj.autoPlaySettings === 'object'
        ? (configObj.autoPlaySettings as Record<string, unknown>)
        : {},
    appearance:
      configObj.appearance && typeof configObj.appearance === 'object'
        ? (configObj.appearance as Record<string, unknown>)
        : {},
    navigation:
      configObj.navigation && typeof configObj.navigation === 'object'
        ? (configObj.navigation as Record<string, unknown>)
        : {},
    interaction:
      configObj.interaction && typeof configObj.interaction === 'object'
        ? (configObj.interaction as Record<string, unknown>)
        : {},
    performance:
      configObj.performance && typeof configObj.performance === 'object'
        ? (configObj.performance as Record<string, unknown>)
        : {},
    accessibility:
      configObj.accessibility && typeof configObj.accessibility === 'object'
        ? (configObj.accessibility as Record<string, unknown>)
        : {},
    advanced:
      configObj.advanced && typeof configObj.advanced === 'object'
        ? (configObj.advanced as Record<string, unknown>)
        : {},
  }
}

/**
 * Helper to merge config with default props
 */
export const mergeConfigWithDefaults = (
  config: SimpleSliderConfig,
  customProps: Partial<HeroSliderProps> = {},
): HeroSliderProps => {
  const transformedProps = transformConfigToProps(config)

  return {
    // Default props
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
    animation: 'fade',
    transitionDuration: 0.6,
    progressIndicatorStyle: 'dots',
    arrowStyle: 'default',
    dotStyle: 'default',
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

    // Merge with transformed config props
    ...transformedProps,

    // Override with any custom props
    ...customProps,
  }
}
