import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  InlineCodeFeature,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
  ChecklistFeature,
  HorizontalRuleFeature,
  AlignFeature,
  IndentFeature,
} from '@payloadcms/richtext-lexical'

export const TermsOfService: Block = {
  slug: 'termsOfService',
  interfaceName: 'TermsOfServiceBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Terms of Service',
      admin: {
        description: 'The title of the terms of service page',
      },
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
            BoldFeature(),
            ItalicFeature(),
            UnderlineFeature(),
            StrikethroughFeature(),
            SubscriptFeature(),
            SuperscriptFeature(),
            InlineCodeFeature(),
            LinkFeature(),
            OrderedListFeature(),
            UnorderedListFeature(),
            ChecklistFeature(),
            HorizontalRuleFeature(),
            AlignFeature(),
            IndentFeature(),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Terms of Service Content',
      admin: {
        description: 'Enter the full terms of service content',
      },
    },
    {
      name: 'effectiveDate',
      type: 'date',
      label: 'Effective Date',
      admin: {
        description: 'The date these terms of service become effective',
      },
    },
    {
      name: 'lastUpdated',
      type: 'date',
      label: 'Last Updated',
      admin: {
        description: 'The date these terms of service were last updated',
      },
    },
    {
      name: 'contactEmail',
      type: 'email',
      label: 'Contact Email',
      admin: {
        description: 'Email address for terms of service inquiries',
      },
    },
    {
      name: 'contactPhone',
      type: 'text',
      label: 'Contact Phone',
      admin: {
        description: 'Phone number for terms of service inquiries',
      },
    },
  ],
  labels: {
    plural: 'Terms of Service',
    singular: 'Terms of Service',
  },
}
