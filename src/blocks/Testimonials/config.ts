import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
      required: false,
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      minRows: 1,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          label: 'Testimonial Quote',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          label: 'Person Name',
          required: true,
        },
        {
          name: 'designation',
          type: 'text',
          label: 'Job Title/Designation',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Profile Image',
          required: false,
        },
        {
          name: 'fallbackImageUrl',
          type: 'text',
          label: 'Fallback Image URL',
          required: false,
          admin: {
            condition: (data, siblingData) => !siblingData?.image,
            description: 'Used when no profile image is uploaded',
          },
        },
        {
          name: 'company',
          type: 'text',
          label: 'Company Name',
          required: false,
        },
        {
          name: 'rating',
          type: 'number',
          label: 'Rating (1-5)',
          min: 1,
          max: 5,
          required: false,
        },
      ],
      admin: {
        description: 'Add testimonials to display in the carousel',
      },
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      label: 'Enable Autoplay',
      defaultValue: true,
    },
    {
      name: 'autoplayInterval',
      type: 'number',
      label: 'Autoplay Interval (seconds)',
      defaultValue: 5,
      min: 2,
      max: 10,
      admin: {
        condition: (data, siblingData) => siblingData?.autoplay,
      },
    },
    {
      name: 'showNavigation',
      type: 'checkbox',
      label: 'Show Navigation Arrows',
      defaultValue: true,
    },
    {
      name: 'showRatings',
      type: 'checkbox',
      label: 'Show Star Ratings',
      defaultValue: false,
    },
    {
      name: 'style',
      type: 'select',
      label: 'Component Style',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
        { label: 'Minimal', value: 'minimal' },
        { label: 'Gradient', value: 'gradient' },
      ],
      required: true,
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Color',
      defaultValue: 'slate',
      options: [
        { label: 'Slate', value: 'slate' },
        { label: 'White', value: 'white' },
        { label: 'Gray', value: 'gray' },
        { label: 'Blue', value: 'blue' },
        { label: 'Transparent', value: 'transparent' },
      ],
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      label: 'Additional Content',
      required: false,
    },
  ],
  interfaceName: 'TestimonialsBlock',
}
