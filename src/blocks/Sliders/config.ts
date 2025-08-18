import type { Block } from 'payload'

export const sliderBlock: Block = {
  slug: 'sliderblock',
  interfaceName: 'SliderBlock',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'sliderType1',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Slider Type 1',
          value: 'sliderType1',
        },
      ],
      required: true,
    },
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
    plural: 'Slider Blocks',
    singular: 'Slider Block',
  },
}
