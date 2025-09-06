import { CollectionConfig } from 'payload'

const Intakes: CollectionConfig = {
  slug: 'intakes',
  labels: {
    singular: 'Intake',
    plural: 'Intakes',
  },
  admin: {
    defaultColumns: ['name', 'startDate', 'deadline', 'updatedAt'],
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
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'deadline',
      type: 'date',
      required: true,
    },
  ],
}

export default Intakes
