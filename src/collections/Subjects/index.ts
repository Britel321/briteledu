import { CollectionConfig } from 'payload'

const Subjects: CollectionConfig = {
  slug: 'subjects',
  labels: { singular: 'Subject', plural: 'Subjects' },
  admin: {
    defaultColumns: ['name', 'code', 'credits', 'updatedAt'],
    useAsTitle: 'name',
    group: 'Reference Data',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'code',
      type: 'text',
    },
    {
      name: 'credits',
      type: 'number',
    },
    {
      name: 'semester',
      type: 'text',
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
  ],
}

export default Subjects
