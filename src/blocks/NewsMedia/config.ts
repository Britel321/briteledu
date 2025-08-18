import type { Block } from 'payload'

export const NewsMedia: Block = {
  slug: 'newsMedia',
  interfaceName: 'NewsMediaBlock',
  fields: [
    {
      name: 'section',
      type: 'text',
      label: 'Section',
      admin: {
        description:
          'This is the section of the news media it fetch from the 5 latest news media from the collection',
      },
    },
  ],
  labels: {
    plural: 'News Medias',
    singular: 'News Media',
  },
}
