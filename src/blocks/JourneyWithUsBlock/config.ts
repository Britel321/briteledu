import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const JourneyWithUsBlock: Block = {
  slug: 'journeyWithUs',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Main Heading',
      defaultValue: 'Your Journey With Us',
      required: false,
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
      defaultValue: 'Experience our comprehensive support services for medical study in Georgia',
      required: false,
    },
    {
      name: 'leftSectionTitle',
      type: 'text',
      label: 'Left Section Title',
      defaultValue: 'Your Medical Education Journey',
      required: false,
    },
    {
      name: 'leftSectionDescription',
      type: 'textarea',
      label: 'Left Section Description',
      defaultValue:
        "From application to graduation, we're with you every step of the way. Our comprehensive support ensures your study abroad experience is seamless and successful.",
      required: false,
    },
    {
      name: 'ctaButtonText',
      type: 'text',
      label: 'CTA Button Text',
      defaultValue: 'Start Your Journey →',
      required: false,
    },
    {
      name: 'ctaButtonUrl',
      type: 'text',
      label: 'CTA Button URL',
      defaultValue: '#',
      required: false,
    },
    {
      name: 'services',
      type: 'array',
      label: 'Journey Steps',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Service Title',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Icon (Emoji or Unicode)',
          required: true,
          admin: {
            description: 'Use an emoji or unicode character (e.g., 🛂, 📚, ✈️)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Service Description',
          required: true,
        },
        {
          name: 'stepNumber',
          type: 'text',
          label: 'Step Number',
          defaultValue: 'Step 1',
          required: false,
        },
        {
          name: 'bgColor',
          type: 'select',
          label: 'Background Color',
          defaultValue: 'pink',
          options: [
            { label: 'Pink', value: 'pink' },
            { label: 'Yellow', value: 'yellow' },
            { label: 'Blue', value: 'blue' },
            { label: 'Green', value: 'green' },
            { label: 'Purple', value: 'purple' },
            { label: 'Indigo', value: 'indigo' },
            { label: 'Red', value: 'red' },
            { label: 'Orange', value: 'orange' },
          ],
          required: true,
        },
      ],
      admin: {
        description: 'Add the journey steps/services to display in the carousel',
      },
    },
    {
      name: 'autoSlide',
      type: 'checkbox',
      label: 'Enable Auto Slide',
      defaultValue: true,
    },
    {
      name: 'slideInterval',
      type: 'number',
      label: 'Slide Interval (seconds)',
      defaultValue: 5,
      min: 2,
      max: 10,
      admin: {
        condition: (data, siblingData) => siblingData?.autoSlide,
      },
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
  interfaceName: 'JourneyWithUsBlock',
}
