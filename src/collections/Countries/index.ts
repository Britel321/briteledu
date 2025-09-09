import { CollectionConfig } from 'payload'

const Countries: CollectionConfig = {
  slug: 'countries',
  labels: { singular: 'Country', plural: 'Countries' },
  admin: {
    defaultColumns: ['name', 'continent', 'capital', 'isoCode', 'updatedAt'],
    useAsTitle: 'name',
    group: 'Reference Data',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Information',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                description: 'Official country name',
              },
            },
            {
              name: 'flag',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Country flag image (recommended: 300x200px or 3:2 ratio)',
              },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Main country image for banners/headers (recommended: 1200x600px)',
              },
            },
            {
              name: 'isoCode',
              type: 'text',
              required: true,
              admin: {
                description:
                  'ISO 3166-1 alpha-2 country code (e.g., "AU" for Australia, "US" for United States)',
              },
            },
            {
              name: 'isoCode3',
              type: 'text',
              admin: {
                description:
                  'ISO 3166-1 alpha-3 country code (e.g., "AUS" for Australia, "USA" for United States)',
              },
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
              admin: {
                description:
                  'Detailed description of the country, its culture, education system, etc.',
              },
            },
            {
              name: 'isActive',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Is this country active and available for selection?',
              },
            },
          ],
        },
        {
          label: 'Geography & Location',
          fields: [
            {
              name: 'continent',
              type: 'select',
              required: true,
              options: [
                { label: 'Africa', value: 'africa' },
                { label: 'Asia', value: 'asia' },
                { label: 'Europe', value: 'europe' },
                { label: 'North America', value: 'north-america' },
                { label: 'South America', value: 'south-america' },
                { label: 'Oceania', value: 'oceania' },
                { label: 'Antarctica', value: 'antarctica' },
              ],
              admin: {
                description: 'Continent where the country is located',
              },
            },
            {
              name: 'capital',
              type: 'text',
              admin: {
                description: 'Capital city of the country',
              },
            },
            {
              name: 'area',
              type: 'number',
              admin: {
                description: 'Total area in square kilometers',
              },
            },
            {
              name: 'timeZones',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Time zone name (e.g., Eastern Standard Time, UTC+10)',
                  },
                },
                {
                  name: 'offset',
                  type: 'text',
                  admin: {
                    description: 'UTC offset (e.g., +10:00, -05:00)',
                  },
                },
              ],
              admin: {
                description: 'Time zones used in the country',
              },
            },
          ],
        },
        {
          label: 'Demographics & Culture',
          fields: [
            {
              name: 'population',
              type: 'number',
              admin: {
                description: 'Current population (approximate)',
              },
            },
            {
              name: 'languages',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Language name (e.g., English, Spanish, French)',
                  },
                },
                {
                  name: 'code',
                  type: 'text',
                  admin: {
                    description: 'Language code (e.g., en, es, fr)',
                  },
                },
                {
                  name: 'isOfficial',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description: 'Is this an official language?',
                  },
                },
              ],
              admin: {
                description: 'Languages spoken in the country',
              },
            },
            {
              name: 'currency',
              type: 'group',
              fields: [
                {
                  name: 'code',
                  type: 'text',
                  admin: {
                    description: 'Currency code (e.g., USD, EUR, GBP)',
                  },
                },
                {
                  name: 'name',
                  type: 'text',
                  admin: {
                    description: 'Currency name (e.g., US Dollar, Euro, British Pound)',
                  },
                },
                {
                  name: 'symbol',
                  type: 'text',
                  admin: {
                    description: 'Currency symbol (e.g., $, €, £)',
                  },
                },
              ],
              admin: {
                description: 'Official currency information',
              },
            },
          ],
        },
        {
          label: 'Contact & Communication',
          fields: [
            {
              name: 'callingCode',
              type: 'text',
              admin: {
                description: 'International calling code (e.g., +1, +44, +61)',
              },
            },
            {
              name: 'internetTLD',
              type: 'text',
              admin: {
                description: 'Country code top-level domain (e.g., .au, .us, .uk)',
              },
            },
          ],
        },
        {
          label: 'Education & Study',
          fields: [
            {
              name: 'educationSystem',
              type: 'richText',
              admin: {
                description: "Information about the country's education system and opportunities",
              },
            },
            {
              name: 'studyDestination',
              type: 'group',
              fields: [
                {
                  name: 'isPopular',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description: 'Is this a popular study destination?',
                  },
                },
                {
                  name: 'ranking',
                  type: 'number',
                  admin: {
                    description: 'Ranking as a study destination (1 = most popular)',
                  },
                },
                {
                  name: 'averageCostPerYear',
                  type: 'number',
                  admin: {
                    description: 'Average cost of studying per year (in USD)',
                  },
                },
                {
                  name: 'workRights',
                  type: 'richText',
                  admin: {
                    description: 'Information about work rights for international students',
                  },
                },
                {
                  name: 'visaRequirements',
                  type: 'richText',
                  admin: {
                    description: 'Student visa requirements and process',
                  },
                },
              ],
              admin: {
                description: 'Information relevant to students considering this country',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default Countries
