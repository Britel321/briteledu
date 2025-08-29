import type { Block } from 'payload'

export const PhotoGallery: Block = {
  slug: 'photoGallery',
  interfaceName: 'PhotoGalleryBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Gallery Heading',
      defaultValue: 'Photo Gallery',
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Gallery Description',
      required: false,
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Gallery Layout',
      defaultValue: 'grid',
      options: [
        { label: 'Grid Layout', value: 'grid' },
        { label: 'Masonry Layout', value: 'masonry' },
        { label: 'Carousel Layout', value: 'carousel' },
      ],
      required: true,
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Grid Columns',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      required: true,
      admin: {
        condition: (data, siblingData) => siblingData?.layout === 'grid',
      },
    },
    {
      name: 'photos',
      type: 'array',
      label: 'Photos',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Image Title',
          required: false,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Image Description',
          required: false,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
          required: false,
          admin: {
            description:
              'Alternative text for accessibility. If empty, will use image title or filename.',
          },
        },
      ],
      admin: {
        description: 'Add photos to the gallery',
      },
    },
    {
      name: 'showImageCount',
      type: 'checkbox',
      label: 'Show Image Count Button',
      defaultValue: true,
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      defaultValue: 'Show All Images',
      admin: {
        condition: (data, siblingData) => siblingData?.showImageCount,
      },
    },
    {
      name: 'style',
      type: 'select',
      label: 'Gallery Style',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
        { label: 'Minimal', value: 'minimal' },
      ],
      required: true,
    },
  ],
  labels: {
    plural: 'Photo Galleries',
    singular: 'Photo Gallery',
  },
}
