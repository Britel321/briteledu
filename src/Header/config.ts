import type { GlobalConfig } from 'payload'

import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'mainLogo',
      type: 'upload',
      label: 'Main Logo',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Name',
              required: true,
            },
            {
              name: 'icon',
              type: 'text',
              label: 'Icon',
              admin: {
                description:
                  'Enter icon text (e.g., for Lucide Icons, emoji, icon name, or unicode)',
              },
            },
          ],
        },
        {
          name: 'path',
          type: 'text',
          label: 'Path',
          required: true,
        },
        {
          name: 'dropdown',
          type: 'array',
          label: 'Dropdown Items',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Name',
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'text',
                  label: 'Icon',
                  admin: {
                    description:
                      'Enter icon text (e.g., for Lucide Icons, emoji, icon name, or unicode)',
                  },
                },
              ],
            },
            {
              name: 'path',
              type: 'text',
              label: 'Path',
              required: true,
            },
            {
              name: 'subDropdown',
              type: 'array',
              label: 'Sub Dropdown Items',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      label: 'Name',
                      required: true,
                    },
                    {
                      name: 'icon',
                      type: 'text',
                      label: 'Icon',
                      admin: {
                        description:
                          'Enter icon text (e.g., for Lucide Icons, emoji, icon name, or unicode)',
                      },
                    },
                  ],
                },
                {
                  name: 'path',
                  type: 'text',
                  label: 'Path',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
