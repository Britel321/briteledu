import { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

const CourseOfferings: CollectionConfig = {
  slug: 'courseOfferings',
  labels: {
    singular: 'Course Offering',
    plural: 'Course Offerings',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['university', 'course', 'durationOverride', 'updatedAt'],
    useAsTitle: 'course',
    group: 'Education & Academic',
  },
  fields: [
    {
      name: 'university',
      type: 'relationship',
      relationTo: 'universities',
      hasMany: false,
      required: true,
      admin: {
        description: 'Select the university offering this course',
      },
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      hasMany: false,
      required: true,
      admin: {
        description: 'Select the course being offered',
      },
    },
    {
      name: 'durationOverride',
      type: 'text',
      required: true,
      admin: {
        description:
          'Specific duration for this course at this university (e.g., "2 years", "18 months")',
      },
    },
    {
      name: 'eligibility',
      type: 'richText',
      required: true,
      admin: {
        description: 'Eligibility requirements specific to this university',
      },
    },
    {
      name: 'feeStructure',
      type: 'richText',
      required: true,
      admin: {
        description: 'Detailed fee structure for this course at this university',
      },
    },
    {
      name: 'intakes',
      type: 'relationship',
      relationTo: 'intakes',
      hasMany: true,
      admin: {
        description: 'Available intake periods for this course',
      },
    },
    {
      name: 'scholarships',
      type: 'relationship',
      relationTo: 'scholarships',
      hasMany: true,
      admin: {
        description: 'Available scholarships for this course',
      },
    },
  ],
  timestamps: true,
}

export default CourseOfferings
