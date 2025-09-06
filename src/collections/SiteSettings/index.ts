import type { GlobalConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Site Information',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              required: true,
              defaultValue: 'BriteEdu',
              admin: {
                description: 'The name of your website',
              },
            },
            {
              name: 'siteDescription',
              type: 'textarea',
              required: true,
              admin: {
                description: 'A brief description of your website for SEO',
              },
            },
            {
              name: 'siteUrl',
              type: 'text',
              required: true,
              admin: {
                description: 'The full URL of your website (e.g., https://briteledu.com)',
              },
              validate: (val: any) => {
                if (val && !val.match(/^https?:\/\/.+/)) {
                  return 'Please enter a valid URL starting with http:// or https://'
                }
                return true
              },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                position: 'sidebar',
                description: 'Site logo (recommended: SVG or PNG with transparent background)',
              },
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                position: 'sidebar',
                description: 'Site favicon (recommended: 32x32px ICO or PNG)',
              },
            },
          ],
        },
        {
          label: 'Contact Information',
          fields: [
            {
              name: 'contactInfo',
              type: 'group',
              fields: [
                {
                  name: 'email',
                  type: 'email',
                  required: true,
                  admin: {
                    description: 'Primary contact email address',
                  },
                },
                {
                  name: 'phone',
                  type: 'text',
                  admin: {
                    description: 'Primary contact phone number',
                  },
                },
                {
                  name: 'address',
                  type: 'group',
                  fields: [
                    {
                      name: 'street',
                      type: 'text',
                    },
                    {
                      name: 'city',
                      type: 'text',
                    },
                    {
                      name: 'state',
                      type: 'text',
                    },
                    {
                      name: 'zipCode',
                      type: 'text',
                    },
                    {
                      name: 'country',
                      type: 'text',
                    },
                  ],
                  admin: {
                    description: 'Business address information',
                  },
                },
                {
                  name: 'businessHours',
                  type: 'textarea',
                  admin: {
                    description: 'Business hours (e.g., "Mon-Fri: 9AM-6PM EST")',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'socialMedia',
              type: 'group',
              fields: [
                {
                  name: 'facebook',
                  type: 'text',
                  admin: {
                    description: 'Facebook page URL',
                  },
                },
                {
                  name: 'twitter',
                  type: 'text',
                  admin: {
                    description: 'Twitter/X profile URL',
                  },
                },
                {
                  name: 'instagram',
                  type: 'text',
                  admin: {
                    description: 'Instagram profile URL',
                  },
                },
                {
                  name: 'linkedin',
                  type: 'text',
                  admin: {
                    description: 'LinkedIn company page URL',
                  },
                },
                {
                  name: 'youtube',
                  type: 'text',
                  admin: {
                    description: 'YouTube channel URL',
                  },
                },
                {
                  name: 'tiktok',
                  type: 'text',
                  admin: {
                    description: 'TikTok profile URL',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'SEO & Analytics',
          fields: [
            {
              name: 'seo',
              type: 'group',
              fields: [
                {
                  name: 'defaultMetaTitle',
                  type: 'text',
                  admin: {
                    description: 'Default meta title for pages without specific SEO settings',
                  },
                },
                {
                  name: 'defaultMetaDescription',
                  type: 'textarea',
                  admin: {
                    description: 'Default meta description for pages without specific SEO settings',
                  },
                },
                {
                  name: 'defaultKeywords',
                  type: 'array',
                  fields: [
                    {
                      name: 'keyword',
                      type: 'text',
                      required: true,
                    },
                  ],
                  admin: {
                    description: 'Default keywords for SEO',
                  },
                },
                {
                  name: 'ogImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description:
                      'Default Open Graph image for social sharing (recommended: 1200x630px)',
                  },
                },
              ],
            },
            {
              name: 'analytics',
              type: 'group',
              fields: [
                {
                  name: 'googleAnalyticsId',
                  type: 'text',
                  admin: {
                    description: 'Google Analytics tracking ID (e.g., GA-XXXXXXXXX)',
                  },
                },
                {
                  name: 'googleTagManagerId',
                  type: 'text',
                  admin: {
                    description: 'Google Tag Manager container ID (e.g., GTM-XXXXXXX)',
                  },
                },
                {
                  name: 'facebookPixelId',
                  type: 'text',
                  admin: {
                    description: 'Facebook Pixel ID for tracking',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Email & Notifications',
          fields: [
            {
              name: 'emailSettings',
              type: 'group',
              fields: [
                {
                  name: 'fromEmail',
                  type: 'email',
                  admin: {
                    description: 'Default "from" email address for system emails',
                  },
                },
                {
                  name: 'fromName',
                  type: 'text',
                  admin: {
                    description: 'Default "from" name for system emails',
                  },
                },
                {
                  name: 'replyToEmail',
                  type: 'email',
                  admin: {
                    description: 'Default "reply-to" email address',
                  },
                },
                {
                  name: 'notificationEmails',
                  type: 'array',
                  fields: [
                    {
                      name: 'email',
                      type: 'email',
                      required: true,
                    },
                    {
                      name: 'type',
                      type: 'select',
                      options: [
                        { label: 'Contact Form', value: 'contact' },
                        { label: 'Course Enrollment', value: 'enrollment' },
                        { label: 'General Notifications', value: 'general' },
                        { label: 'System Alerts', value: 'system' },
                      ],
                      required: true,
                    },
                  ],
                  admin: {
                    description: 'Email addresses to receive notifications',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Features & Integrations',
          fields: [
            {
              name: 'features',
              type: 'group',
              fields: [
                {
                  name: 'enableBlog',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Enable blog functionality',
                  },
                },
                {
                  name: 'enableCourses',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Enable courses functionality',
                  },
                },
                {
                  name: 'enableUniversities',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Enable universities directory',
                  },
                },
                {
                  name: 'enableConsultations',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Enable consultation booking',
                  },
                },
                {
                  name: 'enableMultiLanguage',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description: 'Enable multi-language support',
                  },
                },
                {
                  name: 'maintenanceMode',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description: 'Enable maintenance mode (site will show maintenance page)',
                  },
                },
              ],
            },
            {
              name: 'integrations',
              type: 'group',
              fields: [
                {
                  name: 'paymentProvider',
                  type: 'select',
                  options: [
                    { label: 'Stripe', value: 'stripe' },
                    { label: 'PayPal', value: 'paypal' },
                    { label: 'Square', value: 'square' },
                    { label: 'None', value: 'none' },
                  ],
                  defaultValue: 'none',
                  admin: {
                    description: 'Payment processing provider',
                  },
                },
                {
                  name: 'emailProvider',
                  type: 'select',
                  options: [
                    { label: 'SendGrid', value: 'sendgrid' },
                    { label: 'Mailgun', value: 'mailgun' },
                    { label: 'AWS SES', value: 'aws-ses' },
                    { label: 'SMTP', value: 'smtp' },
                    { label: 'None', value: 'none' },
                  ],
                  defaultValue: 'none',
                  admin: {
                    description: 'Email service provider',
                  },
                },
                {
                  name: 'crmProvider',
                  type: 'select',
                  options: [
                    { label: 'HubSpot', value: 'hubspot' },
                    { label: 'Salesforce', value: 'salesforce' },
                    { label: 'Pipedrive', value: 'pipedrive' },
                    { label: 'None', value: 'none' },
                  ],
                  defaultValue: 'none',
                  admin: {
                    description: 'CRM integration',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Legal & Compliance',
          fields: [
            {
              name: 'legal',
              type: 'group',
              fields: [
                {
                  name: 'companyName',
                  type: 'text',
                  admin: {
                    description: 'Legal company name',
                  },
                },
                {
                  name: 'copyrightText',
                  type: 'text',
                  defaultValue: '© 2024 BriteEdu. All rights reserved.',
                  admin: {
                    description: 'Copyright text for footer',
                  },
                },
                {
                  name: 'privacyPolicyUrl',
                  type: 'text',
                  admin: {
                    description: 'URL to privacy policy page',
                  },
                },
                {
                  name: 'termsOfServiceUrl',
                  type: 'text',
                  admin: {
                    description: 'URL to terms of service page',
                  },
                },
                {
                  name: 'cookieConsentEnabled',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Enable cookie consent banner',
                  },
                },
                {
                  name: 'gdprCompliant',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Enable GDPR compliance features',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  typescript: {
    interface: 'SiteSettings',
  },
}
