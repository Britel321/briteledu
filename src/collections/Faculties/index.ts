import { CollectionConfig } from 'payload'

const Faculties: CollectionConfig = {
  slug: 'faculties',
  labels: {
    singular: 'Faculty',
    plural: 'Faculties',
  },
  admin: {
    defaultColumns: ['name', 'updatedAt'],
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
      name: 'description',
      type: 'richText',
      required: true,
    },
  ],
}

export default Faculties
