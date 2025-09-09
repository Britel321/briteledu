import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'
import { slugField } from '@/fields/slug'

export const Courses: CollectionConfig = {
  slug: 'courses',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'category', 'level', 'price', 'updatedAt'],
    useAsTitle: 'title',
    group: 'Education & Academic',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Information',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'The course title/name',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Brief description of the course content and objectives',
              },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Main course image for display (recommended: 400x300px)',
              },
            },
            {
              name: 'category',
              type: 'select',
              required: true,
              options: [
                { label: 'Language Proficiency', value: 'language-proficiency' },
                { label: 'Test Preparation', value: 'test-preparation' },
                { label: 'Graduate Tests', value: 'graduate-tests' },
                { label: 'Language Learning', value: 'language-learning' },
                { label: 'Counseling', value: 'counseling' },
                { label: 'Academic Writing', value: 'academic-writing' },
                { label: 'Study Skills', value: 'study-skills' },
                { label: 'Career Development', value: 'career-development' },
              ],
              admin: {
                description: 'Course category for filtering and organization',
              },
            },
            {
              name: 'level',
              type: 'select',
              required: true,
              options: [
                { label: 'Beginner', value: 'beginner' },
                { label: 'Intermediate', value: 'intermediate' },
                { label: 'Advanced', value: 'advanced' },
                { label: 'All Levels', value: 'all-levels' },
                { label: 'High School', value: 'high-school' },
                { label: 'Graduate Level', value: 'graduate-level' },
                { label: 'Beginner to Intermediate', value: 'beginner-intermediate' },
                { label: 'Intermediate to Advanced', value: 'intermediate-advanced' },
              ],
              admin: {
                description: 'Difficulty level of the course',
              },
            },
            {
              name: 'duration',
              type: 'text',
              required: true,
              admin: {
                description: 'Course duration (e.g., "8 weeks", "3 months", "Self-paced")',
              },
            },
            {
              name: 'price',
              type: 'text',
              required: true,
              admin: {
                description: 'Course price (e.g., "$299", "Free", "Contact for pricing")',
              },
            },
            {
              name: 'instructor',
              type: 'text',
              required: true,
              admin: {
                description: 'Primary instructor name',
              },
            },
            {
              name: 'instructorBio',
              type: 'textarea',
              admin: {
                description: 'Brief biography of the instructor (optional)',
              },
            },
            {
              name: 'rating',
              type: 'number',
              min: 0,
              max: 5,
              admin: {
                description: 'Course rating out of 5 stars',
                step: 0.1,
              },
            },
            {
              name: 'studentsEnrolled',
              type: 'number',
              defaultValue: 0,
              admin: {
                description: 'Number of students currently enrolled',
              },
            },
          ],
        },
        {
          label: 'Course Content',
          fields: [
            {
              name: 'features',
              type: 'array',
              fields: [
                {
                  name: 'feature',
                  type: 'text',
                  required: true,
                },
              ],
              admin: {
                description: 'Key features and benefits of the course',
              },
            },
            {
              name: 'curriculum',
              type: 'array',
              fields: [
                {
                  name: 'week',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'topic',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
              ],
              admin: {
                description: 'Weekly curriculum breakdown',
              },
            },
            {
              name: 'requirements',
              type: 'array',
              fields: [
                {
                  name: 'requirement',
                  type: 'text',
                  required: true,
                },
              ],
              admin: {
                description: 'Prerequisites and requirements for the course',
              },
            },
            {
              name: 'whatYouWillLearn',
              type: 'array',
              fields: [
                {
                  name: 'outcome',
                  type: 'text',
                  required: true,
                },
              ],
              admin: {
                description: 'Learning outcomes and skills students will gain',
              },
            },
          ],
        },
        {
          label: 'Course Details',
          fields: [
            {
              name: 'courseDetails',
              type: 'group',
              fields: [
                {
                  name: 'language',
                  type: 'select',
                  options: [
                    { label: 'English', value: 'english' },
                    { label: 'Spanish', value: 'spanish' },
                    { label: 'French', value: 'french' },
                    { label: 'German', value: 'german' },
                    { label: 'Mandarin', value: 'mandarin' },
                    { label: 'Japanese', value: 'japanese' },
                    { label: 'Korean', value: 'korean' },
                    { label: 'Other', value: 'other' },
                  ],
                  defaultValue: 'english',
                },
                {
                  name: 'format',
                  type: 'select',
                  options: [
                    { label: 'Online', value: 'online' },
                    { label: 'In-Person', value: 'in-person' },
                    { label: 'Hybrid', value: 'hybrid' },
                    { label: 'Self-Paced', value: 'self-paced' },
                  ],
                  defaultValue: 'online',
                },
                {
                  name: 'certificateOffered',
                  type: 'checkbox',
                  defaultValue: false,
                },
                {
                  name: 'maxStudents',
                  type: 'number',
                  admin: {
                    description: 'Maximum number of students per cohort',
                  },
                },
              ],
              admin: {
                description: 'Additional course details and settings',
              },
            },
          ],
        },
        {
          label: 'Schedule & Timing',
          fields: [
            {
              name: 'schedule',
              type: 'group',
              fields: [
                {
                  name: 'startDate',
                  type: 'date',
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                    },
                  },
                },
                {
                  name: 'endDate',
                  type: 'date',
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                    },
                  },
                },
                {
                  name: 'enrollmentDeadline',
                  type: 'date',
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                    },
                  },
                },
                {
                  name: 'classSchedule',
                  type: 'textarea',
                  admin: {
                    description: 'Weekly class schedule (e.g., "Tuesdays & Thursdays, 7-9 PM EST")',
                  },
                },
              ],
              admin: {
                description: 'Course scheduling information',
              },
            },
          ],
        },
        {
          label: 'Materials & Resources',
          fields: [
            {
              name: 'materials',
              type: 'group',
              fields: [
                {
                  name: 'textbook',
                  type: 'text',
                  admin: {
                    description: 'Required textbook or materials',
                  },
                },
                {
                  name: 'additionalResources',
                  type: 'array',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'type',
                      type: 'select',
                      options: [
                        { label: 'PDF', value: 'pdf' },
                        { label: 'Video', value: 'video' },
                        { label: 'Audio', value: 'audio' },
                        { label: 'Website', value: 'website' },
                        { label: 'Software', value: 'software' },
                        { label: 'Other', value: 'other' },
                      ],
                    },
                    {
                      name: 'url',
                      type: 'text',
                    },
                    {
                      name: 'file',
                      type: 'upload',
                      relationTo: 'media',
                    },
                  ],
                },
              ],
              admin: {
                description: 'Course materials and resources',
              },
            },
          ],
        },
        {
          label: 'SEO & Marketing',
          fields: [
            {
              name: 'seo',
              type: 'group',
              fields: [
                {
                  name: 'metaTitle',
                  type: 'text',
                  admin: {
                    description: 'SEO title for the course page',
                  },
                },
                {
                  name: 'metaDescription',
                  type: 'textarea',
                  admin: {
                    description: 'SEO description for the course page',
                  },
                },
                {
                  name: 'keywords',
                  type: 'array',
                  fields: [
                    {
                      name: 'keyword',
                      type: 'text',
                      required: true,
                    },
                  ],
                  admin: {
                    description: 'SEO keywords for the course',
                  },
                },
              ],
              admin: {
                description: 'SEO settings for the course page',
              },
            },
          ],
        },
        {
          label: 'Settings & Status',
          fields: [
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Mark as featured course to highlight on homepage',
              },
            },
            {
              name: 'status',
              type: 'select',
              required: true,
              defaultValue: 'draft',
              options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
                { label: 'Archived', value: 'archived' },
                { label: 'Coming Soon', value: 'coming-soon' },
                { label: 'Enrollment Closed', value: 'enrollment-closed' },
              ],
              admin: {
                description: 'Course publication status',
              },
            },
            {
              name: 'enrollmentStatus',
              type: 'select',
              required: true,
              defaultValue: 'open',
              options: [
                { label: 'Open', value: 'open' },
                { label: 'Closed', value: 'closed' },
                { label: 'Waitlist', value: 'waitlist' },
                { label: 'Full', value: 'full' },
              ],
              admin: {
                description: 'Current enrollment status',
              },
            },
          ],
        },
      ],
    },
    ...slugField(),
  ],
  timestamps: true,
}
