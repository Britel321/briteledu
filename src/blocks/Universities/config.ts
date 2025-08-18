import type { Block } from 'payload'

export const Universities: Block = {
  slug: 'universities',
  interfaceName: 'UniversitiesBlock',
  fields: [
    {
      name: 'universityInfo',
      type: 'group',
      label: 'University Information',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'University Name',
          required: true,
        },
        {
          name: 'tagline',
          type: 'text',
          label: 'Tagline',
        },
        {
          name: 'establishedYear',
          type: 'text',
          label: 'Established Year',
        },
        {
          name: 'location',
          type: 'text',
          label: 'Location',
        },
        {
          name: 'applyNowButton',
          type: 'text',
          label: 'Apply Now Button Text',
          defaultValue: 'Apply Now',
        },
        {
          name: 'applyNowButtonUrl',
          type: 'text',
          label: 'Apply Now Button URL',
        },
        {
          name: 'downloadProspectusButton',
          type: 'text',
          label: 'Download Prospectus Button Text',
          defaultValue: 'Download Prospectus',
        },
        {
          name: 'downloadProspectusButtonUrl',
          type: 'text',
          label: 'Download Prospectus Button URL',
        },
      ],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image',
      required: true,
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics',
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Statistic Value',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Statistic Label',
          required: true,
        },
      ],
    },
    {
      name: 'navigation',
      type: 'array',
      label: 'Navigation Items',
      fields: [
        {
          name: 'id',
          type: 'text',
          label: 'ID',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Icon Name (Lucide)',
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Content',
        },
        {
          name: 'subItems',
          type: 'array',
          label: 'Sub Items',
          fields: [
            {
              name: 'id',
              type: 'text',
              label: 'ID',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Content',
            },
          ],
        },
      ],
    },
  ],
  labels: {
    plural: 'Universities',
    singular: 'University',
  },
}
