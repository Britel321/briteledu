import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Frequently Asked Questions',
      admin: {
        description: 'Main heading for the FAQ section',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Section Description',
      admin: {
        description: 'Optional description text below the title',
      },
    },
    {
      name: 'enableSearch',
      type: 'checkbox',
      label: 'Enable Search',
      defaultValue: true,
      admin: {
        description: 'Allow users to search through FAQ questions',
      },
    },
    {
      name: 'searchPlaceholder',
      type: 'text',
      label: 'Search Placeholder',
      defaultValue: 'Search frequently asked questions...',
      admin: {
        condition: (data, siblingData) => siblingData?.enableSearch,
      },
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout Style',
      defaultValue: 'accordion',
      options: [
        { label: 'Accordion (Default)', value: 'accordion' },
        { label: 'Card Grid', value: 'grid' },
        { label: 'Tabbed View', value: 'tabs' },
        { label: 'Minimal List', value: 'minimal' },
      ],
      required: true,
    },
    {
      name: 'allowMultipleOpen',
      type: 'checkbox',
      label: 'Allow Multiple Open',
      defaultValue: false,
      admin: {
        description: 'Allow multiple FAQ items to be open simultaneously',
        condition: (data, siblingData) => siblingData?.layout === 'accordion',
      },
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQ Items',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Question',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          label: 'Answer',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
            },
          }),
          required: true,
        },
        {
          name: 'category',
          type: 'text',
          label: 'Category',
          admin: {
            description: 'Optional category for grouping FAQs',
          },
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Featured FAQ',
          defaultValue: false,
          admin: {
            description: 'Mark as featured to highlight this FAQ',
          },
        },
        {
          name: 'tags',
          type: 'text',
          label: 'Tags (comma-separated)',
          admin: {
            description: 'Keywords for better search functionality',
          },
        },
      ],
      admin: {
        description: 'Add questions and answers for the FAQ section',
      },
    },
    {
      name: 'showCategories',
      type: 'checkbox',
      label: 'Show Category Filter',
      defaultValue: false,
      admin: {
        description: 'Display category filter buttons',
      },
    },
    {
      name: 'style',
      type: 'select',
      label: 'Visual Style',
      defaultValue: 'modern',
      options: [
        { label: 'Modern', value: 'modern' },
        { label: 'Minimal', value: 'minimal' },
        { label: 'Corporate', value: 'corporate' },
        { label: 'Playful', value: 'playful' },
        { label: 'Dark', value: 'dark' },
      ],
      required: true,
    },
    {
      name: 'accentColor',
      type: 'select',
      label: 'Accent Color',
      defaultValue: 'blue',
      options: [
        { label: 'Blue', value: 'blue' },
        { label: 'Purple', value: 'purple' },
        { label: 'Green', value: 'green' },
        { label: 'Orange', value: 'orange' },
        { label: 'Pink', value: 'pink' },
        { label: 'Teal', value: 'teal' },
      ],
      required: true,
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background',
      defaultValue: 'light',
      options: [
        { label: 'Light Gray', value: 'light' },
        { label: 'White', value: 'white' },
        { label: 'Gradient', value: 'gradient' },
        { label: 'Transparent', value: 'transparent' },
      ],
      required: true,
    },
    {
      name: 'animationStyle',
      type: 'select',
      label: 'Animation Style',
      defaultValue: 'smooth',
      options: [
        { label: 'Smooth', value: 'smooth' },
        { label: 'Bouncy', value: 'bouncy' },
        { label: 'Spring', value: 'spring' },
        { label: 'Minimal', value: 'minimal' },
      ],
      required: true,
    },
  ],
  labels: {
    plural: 'FAQs',
    singular: 'FAQ',
  },
}
