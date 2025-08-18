import type { Block } from 'payload'

export const QuoteCarousel: Block = {
  slug: 'quoteCarousel',
  interfaceName: 'QuoteCarouselBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      admin: {
        description: 'Optional title for the quote carousel section',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      admin: {
        description: 'Optional subtitle for the quote carousel section',
      },
    },
    {
      name: 'quotes',
      type: 'array',
      label: 'Quotes',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          label: 'Quote Text',
          required: true,
          admin: {
            description: 'The testimonial or quote text',
          },
        },
        {
          name: 'author',
          type: 'text',
          label: 'Author Name',
          required: true,
          admin: {
            description: 'Name of the person who gave the quote',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Author Title',
          admin: {
            description: 'Professional title or role of the author',
          },
        },
        {
          name: 'organization',
          type: 'text',
          label: 'Organization',
          admin: {
            description: 'Company, organization, or affiliation of the author',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Author Image',
          admin: {
            description: 'Optional profile image of the author',
          },
        },
      ],
      admin: {
        description: 'Add testimonials and quotes to display in the carousel',
      },
    },
    {
      name: 'autoPlay',
      type: 'checkbox',
      label: 'Auto Play',
      defaultValue: true,
      admin: {
        description: 'Automatically rotate through quotes',
      },
    },
    {
      name: 'interval',
      type: 'number',
      label: 'Auto Play Interval (ms)',
      defaultValue: 5000,
      min: 1000,
      max: 30000,
      admin: {
        description: 'Time between quote transitions in milliseconds',
        condition: (data) => data.autoPlay,
      },
    },
    {
      name: 'showDots',
      type: 'checkbox',
      label: 'Show Dots',
      defaultValue: true,
      admin: {
        description: 'Show navigation dots at the bottom',
      },
    },
    {
      name: 'showArrows',
      type: 'checkbox',
      label: 'Show Arrows',
      defaultValue: true,
      admin: {
        description: 'Show navigation arrows on the sides',
      },
    },
    {
      name: 'showPlayPause',
      type: 'checkbox',
      label: 'Show Play/Pause Button',
      defaultValue: true,
      admin: {
        description: 'Show play/pause control button',
        condition: (data) => data.autoPlay,
      },
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      defaultValue: 'centered',
      options: [
        {
          label: 'Centered',
          value: 'centered',
        },
        {
          label: 'Left Aligned',
          value: 'left',
        },
        {
          label: 'Right Aligned',
          value: 'right',
        },
      ],
      admin: {
        description: 'Layout style for the quote display',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Color',
      defaultValue: 'light',
      options: [
        {
          label: 'Light Gray',
          value: 'light',
        },
        {
          label: 'Dark',
          value: 'dark',
        },
        {
          label: 'Light Blue',
          value: 'blue',
        },
        {
          label: 'White',
          value: 'white',
        },
      ],
      admin: {
        description: 'Background color theme for the section',
      },
    },
  ],
  labels: {
    plural: 'Quote Carousels',
    singular: 'Quote Carousel',
  },
}
