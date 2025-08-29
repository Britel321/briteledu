import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const VideoModalHeroBlock: Block = {
  slug: 'videoModalHero',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Bridging the gap between students and their study abroad dreams',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'At Britle, we take pride in offering an unparalleled consultation experience.',
    },
    {
      name: 'videoUrl',
      type: 'text',
      required: true,
      label: 'Video URL',
      defaultValue: 'https://92jtks0v7t.ufs.sh/f/4Xt4MyTqQ7crjZhi2G8m9TP6rN4uxHAJfXKVlyq3pgOCLbD0',
    },
    {
      name: 'thumbnailImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Video Thumbnail',
    },
    {
      name: 'fallbackThumbnailUrl',
      type: 'text',
      required: false,
      label: 'Fallback Thumbnail URL',
      defaultValue:
        'https://res.cloudinary.com/dz3facqgc/image/upload/v1734076098/vcnlnmgiijermbyaty6u.jpg',
      admin: {
        condition: (data, siblingData) => !siblingData?.thumbnailImage,
      },
    },
    {
      name: 'ctaText',
      type: 'text',
      required: false,
      label: 'Call to Action Text',
      defaultValue: 'Get started',
    },
    {
      name: 'ctaUrl',
      type: 'text',
      required: false,
      label: 'Call to Action URL',
      defaultValue: '#',
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
        { label: 'Gradient', value: 'gradient' },
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
  interfaceName: 'VideoModalHeroBlock',
}
