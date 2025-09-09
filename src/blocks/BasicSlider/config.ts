import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const BasicSlider: Block = {
  slug: 'basicSlider',
  interfaceName: 'Basic Slider',
  fields: [
    {
      name: 'slides',
      type: 'array',
      label: 'Slider Images',
      minRows: 1,
      maxRows: 10,
      labels: {
        singular: 'Slide',
        plural: 'Slides',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Slide Image',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Slide Title',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Slide Description',
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
          required: true,
        },
      ],
    },
    {
      name: 'autoplaySpeed',
      type: 'number',
      label: 'Autoplay Speed (ms)',
      defaultValue: 3000,
      min: 1000,
      max: 10000,
      admin: {
        step: 500,
      },
    },
  ],
  labels: {
    plural: 'Basic Sliders',
    singular: 'Basic Slider',
  },
}
