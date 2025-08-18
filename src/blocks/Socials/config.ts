import type { Block } from 'payload'

export const Social: Block = {
  slug: 'social',
  interfaceName: 'SocialBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Social Media Updates',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
      defaultValue: 'Stay connected with our latest updates across social media platforms.',
    },
    {
      name: 'facebook',
      type: 'group',
      label: 'Facebook Settings',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Facebook Widget',
          defaultValue: true,
        },
        {
          name: 'pageUrl',
          type: 'text',
          label: 'Facebook Page URL',
          defaultValue: 'https://www.facebook.com/cchaudhary35',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Facebook Widget Title',
          defaultValue: 'Facebook',
        },
        {
          name: 'height',
          type: 'number',
          label: 'Widget Height (px)',
          defaultValue: 520,
          min: 300,
          max: 800,
        },
        {
          name: 'showHeader',
          type: 'checkbox',
          label: 'Show Header',
          defaultValue: false,
        },
        {
          name: 'showCover',
          type: 'checkbox',
          label: 'Show Cover Photo',
          defaultValue: false,
        },
        {
          name: 'showFacepile',
          type: 'checkbox',
          label: 'Show Facepile',
          defaultValue: true,
        },
        {
          name: 'tabs',
          type: 'select',
          label: 'Tabs to Show',
          defaultValue: 'timeline',
          options: [
            { label: 'Timeline', value: 'timeline' },
            { label: 'Events', value: 'events' },
            { label: 'Messages', value: 'messages' },
          ],
        },
      ],
    },
    {
      name: 'twitter',
      type: 'group',
      label: 'Twitter/X Settings',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Twitter Widget',
          defaultValue: true,
        },
        {
          name: 'username',
          type: 'text',
          label: 'Twitter Username',
          defaultValue: 'demo',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Twitter Widget Title',
          defaultValue: 'X',
        },
        {
          name: 'height',
          type: 'number',
          label: 'Widget Height (px)',
          defaultValue: 400,
          min: 200,
          max: 600,
        },
        {
          name: 'width',
          type: 'number',
          label: 'Widget Width (px)',
          defaultValue: 350,
          min: 250,
          max: 550,
        },
        {
          name: 'placeholderText',
          type: 'textarea',
          label: 'Placeholder Text',
          defaultValue: 'Here is detailed information about Chanda Chaudhary\'s political journey and social contributions.',
        },
      ],
    },
    {
      name: 'youtube',
      type: 'group',
      label: 'YouTube Settings',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable YouTube Widget',
          defaultValue: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'YouTube Widget Title',
          defaultValue: 'YouTube',
        },
        {
          name: 'videos',
          type: 'array',
          label: 'YouTube Videos',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Video Title',
              required: true,
            },
            {
              name: 'embedUrl',
              type: 'text',
              label: 'YouTube Embed URL',
              admin: {
                description: 'The full YouTube embed URL (e.g., https://www.youtube.com/embed/dQw4w9WgXcQ) or regular YouTube URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Video Description',
              defaultValue: 'Here is detailed information about Chanda Chaudhary\'s political journey and social contributions.',
            },
            {
              name: 'thumbnail',
              type: 'upload',
              label: 'Custom Thumbnail',
              relationTo: 'media',
            },
          ],
          defaultValue: [
            {
              title: 'Demo Video 1',
              embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
              description: 'Here is detailed information about Chanda Chaudhary\'s political journey and social contributions.',
            },
            {
              title: 'Demo Video 2',
              embedUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              description: 'Here is detailed information about Chanda Chaudhary\'s political journey and social contributions.',
            },
          ],
        },
      ],
    },
    {
      name: 'layout',
      type: 'group',
      label: 'Layout Settings',
      fields: [
        {
          name: 'columns',
          type: 'select',
          label: 'Number of Columns',
          defaultValue: '3',
          options: [
            { label: '1 Column', value: '1' },
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
          ],
        },
        {
          name: 'spacing',
          type: 'select',
          label: 'Widget Spacing',
          defaultValue: '8',
          options: [
            { label: 'Small', value: '4' },
            { label: 'Medium', value: '8' },
            { label: 'Large', value: '12' },
          ],
        },
        {
          name: 'backgroundColor',
          type: 'select',
          label: 'Background Color',
          defaultValue: 'gray-50',
          options: [
            { label: 'Light Gray', value: 'gray-50' },
            { label: 'White', value: 'white' },
            { label: 'Light Blue', value: 'blue-50' },
            { label: 'Light Green', value: 'green-50' },
          ],
        },
      ],
    },
    {
      name: 'media',
      type: 'upload',
      label: 'Additional Media',
      relationTo: 'media',
      admin: {
        description: 'Optional media to display below the social widgets',
      },
    },
    {
      name: 'caption',
      type: 'richText',
      label: 'Additional Caption',
      admin: {
        description: 'Optional rich text caption to display below the social widgets',
      },
    },
  ],
}
