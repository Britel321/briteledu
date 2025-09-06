import { CollectionConfig } from 'payload'

const ConsultationServices: CollectionConfig = {
  slug: 'consultationServices',
  labels: {
    singular: 'Consultation Service',
    plural: 'Consultation Services',
  },
  admin: {
    useAsTitle: 'name',
    group: 'User Management',
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

export default ConsultationServices
