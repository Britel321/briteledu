import { CollectionConfig } from 'payload'

const Scholarships: CollectionConfig = {
  slug: 'scholarships',
  labels: {
    singular: 'Scholarship',
    plural: 'Scholarships',
  },
  admin: {
    defaultColumns: ['name', 'amount', 'updatedAt'],
    useAsTitle: 'name',
    group: 'Education & Academic',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'eligibility',
      type: 'richText',
      required: true,
    },
    {
      name: 'amount',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
  ],
}

export default Scholarships
