/**
 * Examples of how to use the SimpleSlider with configuration
 */

import { SimpleSliderConfig } from './configTransformer'

// Example 1: Basic Image Slider Configuration
export const basicImageSliderConfig: SimpleSliderConfig = {
  slides: [
    {
      type: 'image',
      backgroundImageUrl: 'https://example.com/slide1.jpg',
      alt: 'Beautiful landscape',
      title: 'Welcome to Our Site',
      description: 'Discover amazing content and beautiful designs',
      buttonText: 'Learn More',
      buttonLink: '/about',
      priority: true,
    },
    {
      type: 'image',
      backgroundImageUrl: 'https://example.com/slide2.jpg',
      alt: 'Team working together',
      title: 'Our Team',
      description: 'Meet the people behind our success',
      buttonText: 'Meet the Team',
      buttonLink: '/team',
    },
    {
      type: 'image',
      backgroundImageUrl: 'https://example.com/slide3.jpg',
      alt: 'Modern office space',
      title: 'Modern Workspace',
      description: 'Where innovation meets creativity',
      buttonText: 'Visit Us',
      buttonLink: '/contact',
    },
  ],
  autoPlaySettings: {
    autoPlay: true,
    interval: 6000,
    pauseOnHover: true,
    infiniteLoop: true,
  },
  appearance: {
    height: '70vh',
    animation: 'slide',
    transitionDuration: 0.8,
  },
  navigation: {
    showArrows: true,
    showDots: true,
    arrowStyle: 'bold',
    dotStyle: 'large',
  },
}

// Example 2: Video Slider Configuration
export const videoSliderConfig: SimpleSliderConfig = {
  slides: [
    {
      type: 'video',
      videoUrl: 'https://example.com/video1.mp4',
      posterImage: { url: 'https://example.com/poster1.jpg' },
      alt: 'Product demonstration video',
      title: 'See Our Product in Action',
      description: 'Watch how our solution transforms businesses',
      autoPlay: true,
      muted: true,
      loop: false,
    },
    {
      type: 'image',
      backgroundImageUrl: 'https://example.com/cta-slide.jpg',
      alt: 'Call to action slide',
      title: 'Ready to Get Started?',
      description: 'Join thousands of satisfied customers',
      buttonText: 'Sign Up Now',
      buttonLink: '/signup',
    },
  ],
  autoPlaySettings: {
    autoPlay: false, // Let users control video playback
    infiniteLoop: true,
  },
  appearance: {
    height: '60vh',
    animation: 'fade',
  },
  navigation: {
    showArrows: true,
    showDots: true,
    showPlayPause: true,
    progressIndicatorStyle: 'numbers',
  },
}

// Example 3: Performance-Optimized Configuration
export const performanceOptimizedConfig: SimpleSliderConfig = {
  slides: [
    {
      type: 'image',
      backgroundImageUrl: 'https://example.com/hero1.webp',
      alt: 'High-performance slide 1',
      title: 'Lightning Fast',
      priority: true, // Load first slide immediately
    },
    {
      type: 'image',
      backgroundImageUrl: 'https://example.com/hero2.webp',
      alt: 'High-performance slide 2',
      title: 'Optimized Performance',
    },
  ],
  appearance: {
    height: '50vh',
    animation: 'fade',
    transitionDuration: 0.4, // Faster transitions
  },
  performance: {
    preloadImages: 1, // Preload fewer images
    lazyLoad: true,
    enableImageOptimization: true,
  },
  navigation: {
    showArrows: true,
    showDots: false, // Reduce UI complexity
    arrowStyle: 'minimal',
  },
}

// Example 4: Accessibility-Focused Configuration
export const accessibleSliderConfig: SimpleSliderConfig = {
  slides: [
    {
      type: 'image',
      backgroundImageUrl: 'https://example.com/accessible1.jpg',
      alt: 'Detailed description of the first slide showing a diverse team collaborating',
      title: 'Inclusive Design',
      description: 'We believe in creating experiences for everyone',
    },
    {
      type: 'image',
      backgroundImageUrl: 'https://example.com/accessible2.jpg',
      alt: 'Detailed description of the second slide showing accessible technology',
      title: 'Technology for All',
      description: 'Our products are designed with accessibility in mind',
    },
  ],
  autoPlaySettings: {
    autoPlay: false, // Let users control progression
    pauseOnFocus: true,
  },
  accessibility: {
    ariaLabel: 'Accessibility-focused image carousel showcasing our inclusive design philosophy',
    announceSlideChanges: true,
    rtlSupport: false,
  },
  interaction: {
    enableKeyboardNavigation: true,
    enableSwipe: true,
  },
  navigation: {
    showArrows: true,
    showDots: true,
    showPlayPause: true,
    arrowStyle: 'default', // High contrast
    dotStyle: 'large', // Easier to click
  },
}

// Example 5: Mobile-Optimized Configuration
export const mobileOptimizedConfig: SimpleSliderConfig = {
  slides: [
    {
      type: 'image',
      backgroundImageUrl: 'https://example.com/mobile1.jpg',
      alt: 'Mobile-optimized slide 1',
      title: 'Mobile First',
      description: 'Designed for touch interaction',
      textPosition: 'center',
      textAlignment: 'center',
    },
  ],
  appearance: {
    height: '40vh', // Shorter on mobile
    animation: 'slide',
    transitionDuration: 0.5,
  },
  interaction: {
    enableSwipe: true,
    swipeThreshold: 30, // More sensitive on mobile
    enableKeyboardNavigation: false, // Not needed on mobile
  },
  navigation: {
    showArrows: false, // Rely on swipe
    showDots: true,
    dotStyle: 'large', // Easier to tap
    progressIndicatorStyle: 'dots',
  },
  performance: {
    preloadImages: 1, // Conserve bandwidth
    lazyLoad: true,
    enableImageOptimization: true,
  },
}

// Example 6: Full-Featured Configuration
export const fullFeaturedConfig: SimpleSliderConfig = {
  slides: [
    {
      type: 'image',
      backgroundImageUrl: 'https://example.com/feature1.jpg',
      alt: 'Feature slide 1',
      title: 'Amazing Feature 1',
      subtitle: 'New and Improved',
      description: 'Experience the next generation of our platform',
      buttonText: 'Explore Features',
      buttonLink: '/features',
      textPosition: 'left',
      overlayOpacity: 0.6,
      priority: true,
    },
    {
      type: 'video',
      videoUrl: 'https://example.com/demo.mp4',
      posterImage: { url: 'https://example.com/demo-poster.jpg' },
      alt: 'Product demo video',
      title: 'See It In Action',
      description: 'Watch our comprehensive product demonstration',
      autoPlay: true,
      muted: true,
      loop: true,
    },
    {
      type: 'image',
      backgroundImageUrl: 'https://example.com/cta.jpg',
      alt: 'Call to action slide',
      title: 'Ready to Start?',
      subtitle: 'Join Us Today',
      description: 'Transform your workflow with our solution',
      buttonText: 'Get Started',
      buttonLink: '/signup',
      textPosition: 'center',
      textAlignment: 'center',
    },
  ],
  autoPlaySettings: {
    autoPlay: true,
    interval: 7000,
    pauseOnHover: true,
    pauseOnFocus: true,
    infiniteLoop: true,
    startFromSlide: 0,
  },
  appearance: {
    height: '80vh',
    animation: 'slide',
    transitionDuration: 0.8,
    kenBurnsEffect: false,
    parallaxEffect: false,
  },
  navigation: {
    showArrows: true,
    arrowStyle: 'bold',
    showDots: true,
    dotStyle: 'large',
    progressIndicatorStyle: 'dots',
    showProgressBar: true,
    showPlayPause: true,
    showThumbnails: false,
  },
  interaction: {
    enableSwipe: true,
    swipeThreshold: 50,
    enableKeyboardNavigation: true,
    fullscreen: true,
  },
  performance: {
    preloadImages: 3,
    lazyLoad: true,
    enableImageOptimization: true,
  },
  accessibility: {
    ariaLabel: 'Product showcase carousel',
    announceSlideChanges: true,
    rtlSupport: false,
  },
  advanced: {
    enableAnalytics: true,
    customClassName: 'custom-slider-theme',
  },
}

// Usage Example in a component
export const SliderUsageExample = `
import { SimpleSliderBlock } from '@/blocks/SimpleSlider/Component'
import { basicImageSliderConfig } from '@/blocks/SimpleSlider/examples'

// Method 1: Using configuration object
function MyPage() {
  return (
    <SimpleSliderBlock config={basicImageSliderConfig} />
  )
}

// Method 2: Direct props (overrides config)
function MyPageWithCustomProps() {
  return (
    <SimpleSliderBlock 
      config={basicImageSliderConfig}
      height="90vh"  // This overrides config height
      autoPlay={false}  // This overrides config autoPlay
    />
  )
}

// Method 3: Pure props without config
function MyPagePureProps() {
  return (
    <SimpleSliderBlock 
      slides={[
        {
          type: 'image',
          backgroundImage: '/hero.jpg',
          alt: 'Hero image',
          title: 'Welcome'
        }
      ]}
      autoPlay={true}
      interval={5000}
      showArrows={true}
    />
  )
}
`

export default {
  basicImageSliderConfig,
  videoSliderConfig,
  performanceOptimizedConfig,
  accessibleSliderConfig,
  mobileOptimizedConfig,
  fullFeaturedConfig,
}
