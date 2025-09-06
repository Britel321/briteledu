import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'

export const ContactForms: CollectionConfig = {
  slug: 'contact-forms',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'subject', 'createdAt'],
    group: 'User Management',
  },
  access: {
    read: authenticated,
    create: () => true, // Anyone can create (submit forms)
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Full Name',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: false,
      label: 'Phone Number',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      label: 'Subject',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'In Progress',
          value: 'in-progress',
        },
        {
          label: 'Replied',
          value: 'replied',
        },
        {
          label: 'Closed',
          value: 'closed',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'IP address of the form submitter',
        readOnly: true,
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'User agent of the form submitter',
        readOnly: true,
      },
    },
  ],
  timestamps: true,
}
