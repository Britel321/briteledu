import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'
import { slugField } from '@/fields/slug'

export const Universities: CollectionConfig = {
  slug: 'universities',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'location', 'founded', 'updatedAt'],
    useAsTitle: 'name',
    group: 'Education & Academic',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      admin: {
        description: 'The full name of the university',
      },
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description: 'City, State/Country format (e.g., "Cambridge, MA" or "Oxford, UK")',
      },
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: "A detailed description of the university and what it's known for",
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Main image representing the university (recommended: 400x250px)',
      },
    },
    {
      name: 'website',
      type: 'text',
      admin: {
        description: 'Official university website URL (e.g., https://harvard.edu)',
      },
      validate: (val: any) => {
        if (val && !val.match(/^https?:\/\/.+/)) {
          return 'Please enter a valid URL starting with http:// or https://'
        }
        return true
      },
    },
    {
      name: 'students',
      type: 'text',
      admin: {
        description: 'Number of students (e.g., "23,000+" or "15,000")',
      },
    },
    {
      name: 'founded',
      type: 'number',
      admin: {
        description: 'Year the university was founded',
      },
      validate: (val: any) => {
        if (val && (val < 800 || val > new Date().getFullYear())) {
          return 'Please enter a valid founding year'
        }
        return true
      },
    },
    {
      name: 'country',
      type: 'relationship',
      relationTo: 'countries',
      hasMany: false,
      admin: {
        description: 'Country where the university is located',
      },
    },
    {
      name: 'universityType',
      type: 'select',
      options: [
        { label: 'Public University', value: 'public' },
        { label: 'Private University', value: 'private' },
        { label: 'Research University', value: 'research' },
        { label: 'Liberal Arts College', value: 'liberal-arts' },
        { label: 'Technical Institute', value: 'technical' },
        { label: 'Community College', value: 'community' },
      ],
      admin: {
        description: 'Type/category of the university',
      },
    },
    {
      name: 'ranking',
      type: 'number',
      admin: {
        description: 'Global ranking (optional)',
      },
    },
    {
      name: 'programs',
      type: 'array',
      fields: [
        {
          name: 'program',
          type: 'text',
          required: true,
        },
        {
          name: 'level',
          type: 'select',
          options: [
            { label: 'Undergraduate', value: 'undergraduate' },
            { label: 'Graduate', value: 'graduate' },
            { label: 'Doctoral', value: 'doctoral' },
            { label: 'Certificate', value: 'certificate' },
          ],
        },
      ],
      admin: {
        description: 'Academic programs offered by the university',
      },
    },
    {
      name: 'tuitionRange',
      type: 'group',
      fields: [
        {
          name: 'domestic',
          type: 'text',
          admin: {
            description: 'Tuition for domestic students (e.g., "$50,000/year")',
          },
        },
        {
          name: 'international',
          type: 'text',
          admin: {
            description: 'Tuition for international students (e.g., "$60,000/year")',
          },
        },
      ],
      admin: {
        description: 'Tuition fee ranges',
      },
    },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'address',
          type: 'textarea',
        },
      ],
      admin: {
        description: 'Contact information for the university',
      },
    },
    {
      name: 'socialMedia',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          type: 'text',
        },
        {
          name: 'twitter',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
        {
          name: 'linkedin',
          type: 'text',
        },
        {
          name: 'youtube',
          type: 'text',
        },
      ],
      admin: {
        description: 'Social media links',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark as featured university to highlight on homepage',
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Partner', value: 'partner' },
        { label: 'Prospect', value: 'prospect' },
      ],
      admin: {
        description: 'University partnership status',
        position: 'sidebar',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'University logo (recommended: square format, 200x200px)',
      },
    },
    {
      name: 'faculties',
      type: 'relationship',
      relationTo: 'faculties',
      hasMany: true,
      admin: {
        description: 'Academic faculties/schools within the university',
      },
    },
    ...slugField(),
  ],
  timestamps: true,
}
