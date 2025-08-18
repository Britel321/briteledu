import type { Block } from 'payload'

export const SimpleSlider: Block = {
  slug: 'simpleSlider',
  labels: {
    singular: 'Simple Slider',
    plural: 'Simple Sliders',
  },
  fields: [
    // Slides Configuration
    {
      name: 'slides',
      label: 'Slides',
      type: 'array',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'type',
          label: 'Slide Type',
          type: 'select',
          defaultValue: 'image',
          options: [
            { label: 'Image', value: 'image' },
            { label: 'Video', value: 'video' },
          ],
          required: true,
        },
        // Image Fields (shown when type is 'image')
        {
          name: 'backgroundImage',
          label: 'Background Image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
          },
        },
        {
          name: 'backgroundImageUrl',
          label: 'Background Image URL (Alternative)',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
            description: 'Use this if you want to provide a direct URL instead of uploading',
          },
        },
        // Video Fields (shown when type is 'video')
        {
          name: 'videoUrl',
          label: 'Video URL',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'video',
          },
        },
        {
          name: 'posterImage',
          label: 'Video Poster Image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'video',
          },
        },
        {
          name: 'autoPlay',
          label: 'Auto Play Video',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'video',
          },
        },
        {
          name: 'muted',
          label: 'Muted by Default',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'video',
          },
        },
        {
          name: 'loop',
          label: 'Loop Video',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'video',
          },
        },
        // Common Fields
        {
          name: 'alt',
          label: 'Alt Text',
          type: 'text',
          required: true,
          admin: {
            description: 'Required for accessibility',
          },
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
        },
        {
          name: 'subtitle',
          label: 'Subtitle',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
        },
        {
          name: 'buttonText',
          label: 'Button Text',
          type: 'text',
        },
        {
          name: 'buttonLink',
          label: 'Button Link',
          type: 'text',
          admin: {
            condition: (_, siblingData) => !!siblingData?.buttonText,
          },
        },
        {
          name: 'textPosition',
          label: 'Text Position',
          type: 'select',
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
            { label: 'Custom', value: 'custom' },
          ],
        },
        {
          name: 'textAlignment',
          label: 'Text Alignment',
          type: 'select',
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
        {
          name: 'overlayOpacity',
          label: 'Overlay Opacity',
          type: 'number',
          min: 0,
          max: 1,
          admin: {
            step: 0.1,
            description: 'Opacity of the dark overlay (0 = transparent, 1 = opaque)',
          },
        },
        {
          name: 'priority',
          label: 'High Priority Loading',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Enable for above-the-fold slides for faster loading',
          },
        },
      ],
    },

    // Auto-play Settings
    {
      name: 'autoPlaySettings',
      label: 'Auto-play Settings',
      type: 'group',
      fields: [
        {
          name: 'autoPlay',
          label: 'Enable Auto-play',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'interval',
          label: 'Interval (milliseconds)',
          type: 'number',
          defaultValue: 5000,
          min: 1000,
          max: 30000,
          admin: {
            condition: (_, siblingData) => siblingData?.autoPlay,
            description: 'Time between slide transitions',
          },
        },
        {
          name: 'pauseOnHover',
          label: 'Pause on Hover',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            condition: (_, siblingData) => siblingData?.autoPlay,
          },
        },
        {
          name: 'pauseOnFocus',
          label: 'Pause on Focus',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            condition: (_, siblingData) => siblingData?.autoPlay,
          },
        },
        {
          name: 'infiniteLoop',
          label: 'Infinite Loop',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Loop back to first slide after last slide',
          },
        },
        {
          name: 'startFromSlide',
          label: 'Start from Slide',
          type: 'number',
          defaultValue: 0,
          min: 0,
          admin: {
            description: 'Index of slide to start from (0-based)',
          },
        },
      ],
    },

    // Visual Appearance
    {
      name: 'appearance',
      label: 'Visual Appearance',
      type: 'group',
      fields: [
        {
          name: 'height',
          label: 'Height',
          type: 'text',
          defaultValue: '60vh',
          admin: {
            description: 'CSS height value (e.g., 60vh, 500px, 100%)',
          },
        },
        {
          name: 'aspectRatio',
          label: 'Aspect Ratio',
          type: 'text',
          admin: {
            description: 'CSS aspect ratio (e.g., 16/9, 4/3). Overrides height if set.',
          },
        },
        {
          name: 'animation',
          label: 'Animation Type',
          type: 'select',
          defaultValue: 'fade',
          options: [
            { label: 'Fade', value: 'fade' },
            { label: 'Slide', value: 'slide' },
            { label: 'Zoom', value: 'zoom' },
            { label: 'Flip', value: 'flip' },
          ],
        },
        {
          name: 'transitionDuration',
          label: 'Transition Duration (seconds)',
          type: 'number',
          defaultValue: 0.6,
          min: 0.1,
          max: 3,
          admin: {
            step: 0.1,
          },
        },
        {
          name: 'kenBurnsEffect',
          label: 'Ken Burns Effect',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Slow zoom effect on images',
          },
        },
        {
          name: 'parallaxEffect',
          label: 'Parallax Effect',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Parallax scrolling effect',
          },
        },
      ],
    },

    // Navigation Controls
    {
      name: 'navigation',
      label: 'Navigation Controls',
      type: 'group',
      fields: [
        {
          name: 'showArrows',
          label: 'Show Navigation Arrows',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'arrowStyle',
          label: 'Arrow Style',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Minimal', value: 'minimal' },
            { label: 'Bold', value: 'bold' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.showArrows,
          },
        },
        {
          name: 'showDots',
          label: 'Show Dot Indicators',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'dotStyle',
          label: 'Dot Style',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Minimal', value: 'minimal' },
            { label: 'Large', value: 'large' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.showDots,
          },
        },
        {
          name: 'progressIndicatorStyle',
          label: 'Progress Indicator Style',
          type: 'select',
          defaultValue: 'dots',
          options: [
            { label: 'Dots', value: 'dots' },
            { label: 'Bars', value: 'bars' },
            { label: 'Numbers', value: 'numbers' },
            { label: 'Thumbnails', value: 'thumbnails' },
            { label: 'Progress Bar', value: 'progress-bar' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.showDots,
          },
        },
        {
          name: 'showProgressBar',
          label: 'Show Progress Bar',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'showPlayPause',
          label: 'Show Play/Pause Button',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'showThumbnails',
          label: 'Show Thumbnails',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },

    // Interaction Settings
    {
      name: 'interaction',
      label: 'Interaction Settings',
      type: 'group',
      fields: [
        {
          name: 'enableSwipe',
          label: 'Enable Touch/Swipe',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'swipeThreshold',
          label: 'Swipe Threshold (pixels)',
          type: 'number',
          defaultValue: 50,
          min: 10,
          max: 200,
          admin: {
            condition: (_, siblingData) => siblingData?.enableSwipe,
            description: 'Minimum swipe distance to trigger slide change',
          },
        },
        {
          name: 'enableKeyboardNavigation',
          label: 'Enable Keyboard Navigation',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'fullscreen',
          label: 'Enable Fullscreen Mode',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },

    // Performance Settings
    {
      name: 'performance',
      label: 'Performance Settings',
      type: 'group',
      fields: [
        {
          name: 'preloadImages',
          label: 'Preload Images Count',
          type: 'number',
          defaultValue: 2,
          min: 0,
          max: 5,
          admin: {
            description: 'Number of nearby images to preload for smoother transitions',
          },
        },
        {
          name: 'lazyLoad',
          label: 'Enable Lazy Loading',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'enableImageOptimization',
          label: 'Enable Image Optimization',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Automatically optimize image quality based on connection',
          },
        },
      ],
    },

    // Accessibility Settings
    {
      name: 'accessibility',
      label: 'Accessibility Settings',
      type: 'group',
      fields: [
        {
          name: 'ariaLabel',
          label: 'ARIA Label',
          type: 'text',
          defaultValue: 'Image carousel',
          admin: {
            description: 'Descriptive label for screen readers',
          },
        },
        {
          name: 'announceSlideChanges',
          label: 'Announce Slide Changes',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Announce slide changes to screen readers',
          },
        },
        {
          name: 'rtlSupport',
          label: 'Right-to-Left Support',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Enable support for RTL languages',
          },
        },
      ],
    },

    // Analytics and Advanced Features
    {
      name: 'advanced',
      label: 'Advanced Features',
      type: 'group',
      fields: [
        {
          name: 'enableAnalytics',
          label: 'Enable Analytics Tracking',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Track slide interactions with Google Analytics',
          },
        },
        {
          name: 'customClassName',
          label: 'Custom CSS Class',
          type: 'text',
          admin: {
            description: 'Additional CSS classes for custom styling',
          },
        },
      ],
    },
  ],
  interfaceName: 'SimpleSliderBlock',
}
