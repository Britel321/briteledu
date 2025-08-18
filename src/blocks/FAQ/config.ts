import type { Block } from 'payload'

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      admin: {
        description: 'Optional title for the FAQ section',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      admin: {
        description: 'Optional subtitle for the FAQ section',
      },
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Question',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Answer',
          required: true,
        },
      ],
      admin: {
        description: 'Add questions and answers for the FAQ section',
      },
    },
  ],
  labels: {
    plural: 'FAQs',
    singular: 'FAQ',
  },
}
