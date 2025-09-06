import { CollectionConfig } from 'payload'

const Countries: CollectionConfig = {
  slug: 'countries',
  labels: { singular: 'Country', plural: 'Countries' },
  admin: {
    defaultColumns: ['name', 'isoCode', 'updatedAt'],
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
      name: 'isoCode',
      type: 'text',
    }, // e.g. "AU" for Australia
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
  ],
}

export default Countries
