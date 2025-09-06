import { CollectionConfig } from 'payload'

const Appointments: CollectionConfig = {
  slug: 'appointments',
  labels: {
    singular: 'Appointment',
    plural: 'Appointments',
  },
  admin: {
    useAsTitle: 'name',
    group: 'User Management',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true, // User's full name
    },
    {
      name: 'email',
      type: 'text',
      required: true, // User's email
    },
    {
      name: 'phone',
      type: 'text',
      required: false, // User's phone number (optional)
    },
    {
      name: 'consultationType',
      type: 'text',
      required: true, // Type of consultation
    },
    {
      name: 'appointmentDate',
      type: 'date',
      required: true, // Appointment date
    },
    {
      name: 'appointmentTime',
      type: 'text',
      required: true, // Appointment time
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      required: true,
      defaultValue: 'scheduled',
    },
    {
      name: 'notes',
      type: 'richText', // Any additional notes
    },
  ],
}

export default Appointments
