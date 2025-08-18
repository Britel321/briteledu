# SimpleSlider Integration Guide

This guide explains how to integrate and use the enhanced SimpleSlider component with your Payload CMS setup.

## 🔧 Setup Steps

### 1. Configure the Block in Payload

The SimpleSlider config is already set up in `config.ts`. Make sure it's imported in your main blocks configuration:

```typescript
// In your blocks configuration file
import { SimpleSlider } from '@/blocks/SimpleSlider/config'

export const blocks = [
  // ... other blocks
  SimpleSlider,
  // ... other blocks
]
```

### 2. RichText Integration

The component is already integrated with RichText in `src/components/RichText/index.tsx`:

```typescript
simpleSlider: ({ node }: { node: any }) => <SimpleSliderBlock config={node.fields} />
```

This passes the configuration data from Payload CMS to the component.

### 3. Direct Usage (Outside RichText)

You can also use the component directly in your pages/components:

```tsx
import { SimpleSliderBlock } from '@/blocks/SimpleSlider/Component'
import { mySliderConfig } from './slider-config'

function HomePage() {
  return (
    <div>
      <SimpleSliderBlock config={mySliderConfig} />
    </div>
  )
}
```

## 📋 Configuration Workflow

### In Payload CMS Admin:

1. **Add SimpleSlider Block**
   - Go to your page/post editor
   - Add a new block
   - Select "Simple Slider"

2. **Configure Slides**
   - Click "Add Slide"
   - Choose slide type (Image/Video)
   - Upload media or enter URL
   - Add title, description, CTA button
   - Configure text positioning

3. **Customize Appearance**
   - Set height and aspect ratio
   - Choose animation type
   - Adjust transition duration
   - Enable special effects

4. **Configure Navigation**
   - Enable/disable arrows and dots
   - Choose styles (minimal, bold, etc.)
   - Set progress indicator type
   - Add play/pause controls

5. **Performance Settings**
   - Configure image preloading
   - Enable lazy loading
   - Set optimization preferences

6. **Accessibility Options**
   - Set ARIA labels
   - Enable slide announcements
   - Configure RTL support

## 💻 Development Usage

### TypeScript Support

All configuration options are fully typed:

```typescript
import type { SimpleSliderConfig } from '@/blocks/SimpleSlider/configTransformer'

const myConfig: SimpleSliderConfig = {
  slides: [
    {
      type: 'image',
      backgroundImageUrl: '/hero.jpg',
      alt: 'Hero image',
      title: 'Welcome to Our Site'
    }
  ],
  autoPlaySettings: {
    autoPlay: true,
    interval: 5000
  }
  // ... fully typed configuration
}
```

### Props Override

You can override configuration with direct props:

```tsx
<SimpleSliderBlock 
  config={cmsConfig}
  height="100vh"  // Override CMS height setting
  autoPlay={false}  // Override CMS autoplay setting
/>
```

### Custom Styling

Add custom CSS classes through the advanced settings:

```javascript
// In CMS config
{
  advanced: {
    customClassName: 'hero-slider custom-theme'
  }
}
```

```css
/* In your CSS */
.hero-slider {
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.custom-theme .slide-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 🎯 Common Use Cases

### Hero Section
```javascript
{
  slides: [/* hero slides */],
  appearance: {
    height: '100vh',
    animation: 'fade'
  },
  navigation: {
    showArrows: true,
    showDots: true,
    arrowStyle: 'minimal'
  }
}
```

### Product Showcase
```javascript
{
  slides: [/* product images/videos */],
  navigation: {
    showThumbnails: true,
    progressIndicatorStyle: 'thumbnails'
  },
  interaction: {
    fullscreen: true
  }
}
```

### Testimonials
```javascript
{
  slides: [/* testimonial slides */],
  appearance: {
    height: '40vh',
    animation: 'slide'
  },
  autoPlaySettings: {
    interval: 8000,
    pauseOnHover: true
  }
}
```

### Mobile-First
```javascript
{
  appearance: {
    height: '50vh'
  },
  navigation: {
    showArrows: false,  // Rely on swipe
    showDots: true,
    dotStyle: 'large'
  },
  interaction: {
    enableSwipe: true,
    swipeThreshold: 30
  }
}
```

## 🚀 Advanced Features

### Analytics Tracking

Enable in the advanced settings to track:
- Slide views
- CTA clicks
- Navigation usage
- Play/pause interactions

### Video Optimization

For video slides:
- Use `.mp4` format for best compatibility
- Provide poster images for faster loading
- Enable mute for autoplay (browser requirement)
- Consider file size for mobile users

### Performance Tips

1. **Image Optimization**
   - Use modern formats (WebP, AVIF)
   - Provide multiple sizes
   - Enable lazy loading for off-screen content

2. **Preloading Strategy**
   - Set `preloadImages: 1-2` for best balance
   - Mark first slide as `priority: true`

3. **Mobile Considerations**
   - Use shorter heights on mobile
   - Reduce preloading on slow connections
   - Implement swipe-first navigation

## 🔍 Troubleshooting

### Images Not Loading
- Check image URLs are accessible
- Verify CORS settings for external images
- Check Payload media upload configuration

### Poor Performance
- Reduce `preloadImages` count
- Enable `lazyLoad`
- Optimize image sizes
- Check for memory leaks in custom code

### Accessibility Issues
- Ensure all slides have `alt` text
- Test with screen readers
- Verify keyboard navigation works
- Check color contrast ratios

## 📚 Examples

Check `examples.ts` for complete configuration examples:
- Basic image slider
- Video integration
- Performance-optimized setup
- Accessibility-focused configuration
- Mobile-optimized settings
- Full-featured showcase

## 🎨 Customization

The component supports extensive customization through:
1. **Configuration options** (CMS admin)
2. **Direct props** (developer override)
3. **Custom CSS classes** (styling)
4. **Custom animations** (advanced)

This flexibility ensures the slider can adapt to any design requirement while maintaining ease of use for content editors.
