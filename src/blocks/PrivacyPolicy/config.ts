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

export const PrivacyPolicy: Block = {
  slug: 'privacyPolicy',
  interfaceName: 'PrivacyPolicyBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Privacy Policy',
      admin: {
        description: 'The title of the privacy policy page',
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
      label: 'Privacy Policy Content',
      admin: {
        description: 'Enter the full privacy policy content',
      },
    },
    {
      name: 'lastUpdated',
      type: 'date',
      label: 'Last Updated',
      admin: {
        description: 'The date this privacy policy was last updated',
      },
    },
    {
      name: 'contactEmail',
      type: 'email',
      label: 'Contact Email',
      admin: {
        description: 'Email address for privacy-related inquiries',
      },
    },
    {
      name: 'contactPhone',
      type: 'text',
      label: 'Contact Phone',
      admin: {
        description: 'Phone number for privacy-related inquiries',
      },
    },
  ],
  labels: {
    plural: 'Privacy Policies',
    singular: 'Privacy Policy',
  },
}
