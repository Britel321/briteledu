import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const VideoGallery: Block = {
  slug: 'videoGallery',
  interfaceName: 'VideoGalleryBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Video Gallery',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: 'Watch exclusive videos of speeches, interviews, and community programs',
    },
    {
      name: 'videos',
      type: 'array',
      label: 'Videos',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'embedUrl',
          type: 'text',
          label: 'YouTube Embed URL',
          required: true,
          admin: {
            description:
              'Enter a YouTube URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)',
          },
        },
      ],
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 1,
        label: 'Button',
      },
    }),
  ],
  labels: {
    plural: 'Video Galleries',
    singular: 'Video Gallery',
  },
}
