// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { ContactForms } from './collections/ContactForm'
import { Courses } from './collections/Courses'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Universities } from './collections/Universities'
import { Users } from './collections/Users'
import Countries from './collections/Countries'
import Faculties from './collections/Faculties'
import Intakes from './collections/Intakes'
import Scholarships from './collections/Scholarships'
import CourseOfferings from './collections/CourseOfferings'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import ConsultationServices from './collections/ConsultationServices/ConsultationServices'
import Appointments from './collections/Appointments'
import { SiteSettings } from './collections/SiteSettings'
import { Categories } from './collections/Categories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- BriteEdu',
      description: 'The best education admin panel in the world',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/favicon.png',
        },
      ],
    },
    components: {
      views: {
        dashboard: {
          Component: '@/elements/Dashboard#Dashboard',
        },
      },
      beforeLogin: ['@/elements/BeforeLogin#BeforeLogin'],
      graphics: {
        Icon: '@/elements/Logo#Icon',
        Logo: '@/elements/Logo#Logo',
      },
      Nav: '/elements/Nav#Nav',
    },
    avatar: {
      Component: '/elements/Avatar#Avatar',
    },
    // theme: 'light', // For demo purposes light mode is not implemented... yet!
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [
    // Content Management
    Pages,
    Posts,
    Media,
    Categories,

    // Education & Academic
    Courses,
    Universities,
    Countries,
    Faculties,
    Intakes,
    Scholarships,
    CourseOfferings,
    Appointments,

    // User Management & Interaction
    Users,
    ContactForms,
    ConsultationServices,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, SiteSettings],
  plugins: [
    ...plugins,
    uploadthingStorage({
      collections: {
        media: true,
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN,
        acl: 'public-read',
      },
    }),
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
