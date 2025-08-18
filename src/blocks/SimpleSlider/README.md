# Enhanced SimpleSlider Component

A robust, accessible, and feature-rich slider component built with React, TypeScript, and Framer Motion with comprehensive Payload CMS configuration support.

## ✨ Features

### Core Features
- **Multiple Media Types**: Support for images and videos
- **Auto-play**: Configurable auto-advancing slides with pause/resume
- **Touch/Swipe Support**: Mobile-friendly touch navigation
- **Keyboard Navigation**: Full keyboard accessibility
- **Responsive Design**: Optimized for all screen sizes
- **Multiple Animation Types**: Fade, slide, zoom, flip transitions

### Performance Optimizations
- **Image Preloading**: Intelligent nearby image preloading
- **Lazy Loading**: On-demand image loading for better performance
- **Error Boundaries**: Graceful error handling and fallbacks
- **Intersection Observer**: Efficient visibility tracking
- **Memoization**: Optimized re-rendering with React.memo and useMemo

### Accessibility Features
- **ARIA Support**: Complete ARIA labeling and live regions
- **Screen Reader**: Announcements for slide changes
- **Focus Management**: Proper focus handling for keyboard navigation
- **Reduced Motion**: Respects user's motion preferences
- **Semantic HTML**: Proper semantic structure

### Advanced Features
- **Fullscreen Mode**: Expandable fullscreen viewing
- **Progress Indicators**: Multiple indicator styles (dots, bars, thumbnails)
- **Video Support**: Autoplay, mute controls, poster images
- **Analytics Integration**: Built-in Google Analytics tracking
- **Custom Animations**: Extensible animation system
- **RTL Support**: Right-to-left language support
- **Error Handling**: Comprehensive error boundaries

## 📱 Usage

The SimpleSlider component now supports two main usage patterns:

1. **Configuration-based** (recommended for Payload CMS)
2. **Direct props** (for manual implementation)

### Method 1: Configuration-Based Usage (Payload CMS)

When used with Payload CMS, the slider automatically gets its configuration from the CMS admin panel:

```tsx
import { SimpleSliderBlock } from '@/blocks/SimpleSlider/Component'

// The config is automatically passed from Payload CMS
function MyPage({ sliderData }) {
  return (
    <SimpleSliderBlock config={sliderData} />
  )
}
```

### Method 2: Direct Props Usage

```tsx
import { SimpleSliderBlock } from '@/blocks/SimpleSlider/Component'
import type { SlideData } from '@/types/slider'

const slides: SlideData[] = [
  {
    type: 'image',
    backgroundImage: '/images/slide1.jpg',
    alt: 'First slide',
    title: 'Welcome',
    description: 'This is the first slide',
    buttonText: 'Learn More',
    buttonLink: '/learn-more'
  },
  // ... more slides
]

function MyComponent() {
  return (
    <SimpleSliderBlock
      slides={slides}
      autoPlay={true}
      interval={5000}
      showDots={true}
      showArrows={true}
      animation="fade"
      height="60vh"
    />
  )
}
```

### Method 3: Hybrid Approach (Config + Props Override)

```tsx
// You can combine config with direct props - direct props take precedence
function MyComponent({ configFromCMS }) {
  return (
    <SimpleSliderBlock
      config={configFromCMS}
      height="90vh"  // This overrides config height
      autoPlay={false}  // This overrides config autoPlay
    />
  )
}
```

## 🔧 Configuration Through Payload CMS

The slider can be fully configured through the Payload CMS admin interface with the following options:

### Slides Configuration
- **Multiple slide types**: Image and Video slides
- **Content management**: Title, subtitle, description, and CTA buttons
- **Media handling**: Upload images or provide URLs
- **Video settings**: Autoplay, mute, loop options
- **Text positioning**: Left, center, right alignment
- **Priority loading**: Mark important slides for faster loading

### Auto-play Settings
- **Enable/disable autoplay**
- **Interval timing** (1-30 seconds)
- **Pause behaviors**: On hover, on focus
- **Infinite loop** option
- **Starting slide** selection

### Visual Appearance
- **Height control**: CSS height values (vh, px, %)
- **Aspect ratio**: CSS aspect ratios (16/9, 4/3)
- **Animation types**: Fade, slide, zoom, flip
- **Transition duration**: 0.1 - 3 seconds
- **Special effects**: Ken Burns, parallax

### Navigation Controls
- **Arrow styles**: Default, minimal, bold
- **Dot indicators**: Various styles and positions
- **Progress indicators**: Dots, bars, numbers, thumbnails, progress bar
- **Control buttons**: Play/pause, fullscreen
- **Thumbnail navigation**

### Interaction Settings
- **Touch/swipe**: Enable and configure sensitivity
- **Keyboard navigation**: Arrow keys, spacebar, etc.
- **Fullscreen mode**: Expandable viewing

### Performance Settings
- **Image preloading**: Configure nearby image preloading
- **Lazy loading**: On-demand image loading
- **Image optimization**: Automatic quality adjustment

### Accessibility Settings
- **ARIA labels**: Screen reader support
- **Slide announcements**: Automatic accessibility announcements
- **RTL support**: Right-to-left language support

### Advanced Features
- **Analytics tracking**: Google Analytics integration
- **Custom CSS classes**: Additional styling hooks

## 📊 Configuration Examples

### Basic Image Slider
```javascript
// In Payload CMS admin, configure:
{
  slides: [
    {
      type: 'image',
      backgroundImageUrl: 'https://example.com/slide1.jpg',
      alt: 'Beautiful landscape',
      title: 'Welcome',
      description: 'Discover amazing content'
    }
  ],
  autoPlaySettings: {
    autoPlay: true,
    interval: 5000
  },
  appearance: {
    height: '60vh',
    animation: 'fade'
  }
}
```

### Video + Image Mix
```javascript
{
  slides: [
    {
      type: 'video',
      videoUrl: 'https://example.com/demo.mp4',
      posterImage: { url: 'https://example.com/poster.jpg' },
      alt: 'Product demo',
      title: 'See It In Action',
      autoPlay: true,
      muted: true
    },
    {
      type: 'image',
      backgroundImageUrl: 'https://example.com/cta.jpg',
      alt: 'Call to action',
      title: 'Get Started',
      buttonText: 'Sign Up',
      buttonLink: '/signup'
    }
  ]
}
```

### Basic Implementation

```tsx
import { SimpleSliderBlock } from '@/blocks/SimpleSlider/Component'
import type { SlideData } from '@/types/slider'

const slides: SlideData[] = [
  {
    type: 'image',
    backgroundImage: '/images/slide1.jpg',
    alt: 'First slide',
    title: 'Welcome',
    description: 'This is the first slide',
    buttonText: 'Learn More',
    buttonLink: '/learn-more'
  },
  {
    type: 'video',
    videoUrl: '/videos/intro.mp4',
    posterImage: '/images/video-poster.jpg',
    alt: 'Intro video',
    title: 'Watch Our Story',
    autoPlay: true,
    muted: true
  }
]

function MyComponent() {
  return (
    <SimpleSliderBlock
      slides={slides}
      autoPlay={true}
      interval={5000}
      showDots={true}
      showArrows={true}
      animation="fade"
      height="60vh"
    />
  )
}
```

### Advanced Configuration

```tsx
function AdvancedSlider() {
  const handleSlideChange = (currentSlide: number, slideData: SlideData) => {
    console.log('Slide changed:', currentSlide, slideData)
  }

  const handleError = (error: SliderError) => {
    console.error('Slider error:', error)
    // Send to error tracking service
  }

  return (
    <SimpleSliderBlock
      slides={slides}
      // Auto-play settings
      autoPlay={true}
      interval={7000}
      pauseOnHover={true}
      pauseOnFocus={true}
      
      // Visual options
      animation="slide"
      transitionDuration={0.8}
      showDots={true}
      showArrows={true}
      showProgressBar={true}
      showPlayPause={true}
      showThumbnails={false}
      
      // Styling
      progressIndicatorStyle="bars"
      arrowStyle="bold"
      dotStyle="large"
      height="80vh"
      
      // Performance
      preloadImages={3}
      lazyLoad={true}
      enableImageOptimization={true}
      
      // Accessibility
      ariaLabel="Product showcase carousel"
      announceSlideChanges={true}
      enableKeyboardNavigation={true}
      
      // Mobile
      enableSwipe={true}
      swipeThreshold={75}
      
      // Advanced features
      fullscreen={true}
      enableAnalytics={true}
      rtlSupport={false}
      
      // Callbacks
      onSlideChange={handleSlideChange}
      onError={handleError}
      onPlay={() => console.log('Slider playing')}
      onPause={() => console.log('Slider paused')}
    />
  )
}
```

## 🎛️ Props API

### Required Props
| Prop | Type | Description |
|------|------|-------------|
| `slides` | `SlideData[]` | Array of slide data (falls back to default if empty) |

### Core Configuration
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoPlay` | `boolean` | `true` | Enable auto-advancing slides |
| `interval` | `number` | `5000` | Time between slides (ms) |
| `pauseOnHover` | `boolean` | `true` | Pause on mouse hover |
| `pauseOnFocus` | `boolean` | `true` | Pause when element is focused |
| `infiniteLoop` | `boolean` | `true` | Loop back to first slide |
| `startFromSlide` | `number` | `0` | Initial slide index |

### Visual Options
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showDots` | `boolean` | `true` | Show dot indicators |
| `showArrows` | `boolean` | `true` | Show navigation arrows |
| `showProgressBar` | `boolean` | `false` | Show progress bar |
| `showPlayPause` | `boolean` | `false` | Show play/pause button |
| `showThumbnails` | `boolean` | `false` | Show thumbnail navigation |
| `animation` | `AnimationPreset` | `'fade'` | Animation type |
| `transitionDuration` | `number` | `0.6` | Animation duration (seconds) |
| `height` | `string \| number` | `'60vh'` | Container height |
| `aspectRatio` | `string` | - | CSS aspect ratio |

### Styling Options
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `progressIndicatorStyle` | `'dots' \| 'bars' \| 'numbers' \| 'thumbnails' \| 'progress-bar'` | `'dots'` | Progress indicator style |
| `arrowStyle` | `'default' \| 'minimal' \| 'bold' \| 'custom'` | `'default'` | Arrow button style |
| `dotStyle` | `'default' \| 'minimal' \| 'large' \| 'custom'` | `'default'` | Dot indicator style |
| `containerStyles` | `CSSProperties` | - | Custom container styles |
| `slideStyles` | `CSSProperties` | - | Custom slide styles |
| `contentStyles` | `CSSProperties` | - | Custom content overlay styles |
| `overlayStyles` | `CSSProperties` | - | Custom gradient overlay styles |

### Performance Options
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `preloadImages` | `number` | `2` | Number of images to preload |
| `lazyLoad` | `boolean` | `true` | Enable lazy loading |
| `enableImageOptimization` | `boolean` | `true` | Enable image optimization |

### Accessibility Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `'Image carousel'` | ARIA label |
| `ariaLabelledBy` | `string` | - | ARIA labelledby reference |
| `announceSlideChanges` | `boolean` | `true` | Announce changes to screen readers |
| `enableKeyboardNavigation` | `boolean` | `true` | Enable keyboard navigation |

### Mobile/Touch Options
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableSwipe` | `boolean` | `true` | Enable touch/swipe navigation |
| `swipeThreshold` | `number` | `50` | Minimum swipe distance (px) |

### Advanced Features
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `parallaxEffect` | `boolean` | `false` | Enable parallax scrolling effect |
| `kenBurnsEffect` | `boolean` | `false` | Enable Ken Burns zoom effect |
| `rtlSupport` | `boolean` | `false` | Enable right-to-left support |
| `fullscreen` | `boolean` | `false` | Enable fullscreen mode |
| `enableAnalytics` | `boolean` | `false` | Enable Google Analytics tracking |

### Callbacks
| Prop | Type | Description |
|------|------|-------------|
| `onSlideChange` | `(currentSlide: number, slideData: SlideData) => void` | Called when slide changes |
| `onPlay` | `() => void` | Called when auto-play starts |
| `onPause` | `() => void` | Called when auto-play pauses |
| `onLoad` | `() => void` | Called when component loads |
| `onError` | `(error: SliderError) => void` | Called on errors |

## 🎨 Animation Types

### Built-in Animations
- **fade**: Simple opacity transition (default)
- **slide**: Horizontal sliding transition
- **zoom**: Scale in/out transition
- **flip**: 3D flip rotation

### Custom Animations
You can provide custom Framer Motion animation variants:

```tsx
const customAnimation = {
  enter: { scale: 0, rotate: 180 },
  center: { scale: 1, rotate: 0 },
  exit: { scale: 0, rotate: -180 }
}

<SimpleSliderBlock
  animation="custom"
  customAnimation={customAnimation}
/>
```

## 🖼️ Slide Data Types

### Image Slide
```typescript
interface ImageSlide {
  type: 'image'
  backgroundImage: string
  alt: string
  title?: string
  subtitle?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  buttonAction?: () => void
  thumbnail?: string
  priority?: boolean // For loading priority
  srcSet?: string
  sizes?: string
}
```

### Video Slide
```typescript
interface VideoSlide {
  type: 'video'
  videoUrl: string
  posterImage?: string
  alt: string
  title?: string
  subtitle?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  buttonAction?: () => void
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
}
```

## ⌨️ Keyboard Navigation

| Key | Action |
|-----|--------|
| `←` / `→` | Navigate between slides |
| `Space` | Toggle play/pause |
| `Home` | Go to first slide |
| `End` | Go to last slide |
| `1-9` | Go to slide number |
| `Esc` | Exit fullscreen |

## 🎯 Accessibility Features

- Full ARIA support with proper labels and roles
- Screen reader announcements for slide changes
- Keyboard navigation with logical tab order
- Focus management for interactive elements
- Respects `prefers-reduced-motion` setting
- High contrast support
- Semantic HTML structure

## 📊 Analytics Integration

When `enableAnalytics` is enabled, the component tracks:

- `slide_view`: When a slide is viewed
- `slide_click`: When a slide CTA is clicked
- `navigation_used`: When navigation controls are used
- `autoplay_paused`: When autoplay is paused/resumed
- `fullscreen_toggled`: When fullscreen is toggled

Events are sent to Google Analytics if `gtag` is available.

## 🚀 Performance Optimizations

- **Image Preloading**: Intelligently preloads nearby images
- **Lazy Loading**: Only loads images when needed
- **Intersection Observer**: Efficient visibility detection
- **React.memo**: Prevents unnecessary re-renders
- **Error Boundaries**: Graceful error handling
- **Responsive Images**: Automatic `srcSet` generation for supported CDNs
- **Connection-aware Loading**: Adjusts quality based on connection speed

## 🔧 Error Handling

The component includes comprehensive error handling:

- Image loading failures with fallbacks
- Video playback issues
- Invalid slide data validation
- Network connectivity issues
- Browser compatibility fallbacks

## 🎨 Styling & Theming

The component uses Tailwind CSS classes and supports customization through:

- Custom CSS properties
- Style props for different elements
- Theme-aware color schemes
- Responsive design utilities

## 🧪 Testing

```typescript
// Example test
import { render, screen, fireEvent } from '@testing-library/react'
import { SimpleSliderBlock } from './Component'

test('navigates slides with arrow keys', () => {
  const slides = [
    { type: 'image', backgroundImage: '/test1.jpg', alt: 'Test 1' },
    { type: 'image', backgroundImage: '/test2.jpg', alt: 'Test 2' }
  ]
  
  render(<SimpleSliderBlock slides={slides} />)
  
  const slider = screen.getByRole('region')
  fireEvent.keyDown(slider, { key: 'ArrowRight' })
  
  expect(screen.getByText('Test 2')).toBeInTheDocument()
})
```

## 📝 License

MIT License - see LICENSE file for details.

---

## 🆕 What's New in This Version

### Performance Improvements
- ✅ Added intelligent image preloading system
- ✅ Implemented intersection observer for efficient loading
- ✅ Added React.memo and useMemo optimizations
- ✅ Connection-aware image quality optimization

### Accessibility Enhancements
- ✅ Full ARIA support with live regions
- ✅ Comprehensive keyboard navigation
- ✅ Focus management system
- ✅ Screen reader announcements
- ✅ Reduced motion support

### New Features
- ✅ Video slide support with controls
- ✅ Multiple animation presets
- ✅ Progress bar and multiple indicator styles
- ✅ Fullscreen mode
- ✅ Thumbnail navigation
- ✅ Analytics integration
- ✅ RTL language support
- ✅ Custom animation system

### Robustness
- ✅ Comprehensive error boundaries
- ✅ Input validation and sanitization
- ✅ Graceful fallbacks for unsupported features
- ✅ Network-aware loading strategies
- ✅ Cross-browser compatibility

### Developer Experience
- ✅ Full TypeScript support with strict typing
- ✅ Comprehensive prop validation
- ✅ Detailed documentation and examples
- ✅ Extensible architecture
- ✅ Debug-friendly error messages
