import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import { Great_Vibes } from 'next/font/google'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { GoogleTranslate } from '@/components/GoogleTranslate'
import { BackToTop } from '@/components/BackToTop'
import { QueryDevtools } from '@/components/ReactQueryDevtools'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { AdminBar } from '@/components/AdminBar'

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-vibes',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(GeistMono.variable, GeistSans.variable, greatVibes.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <LanguageProvider>
            {/* Google Translate Widget - hidden */}
            <div className="google-translate-widget-hidden">
              <GoogleTranslate />
            </div>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />
            <Header />
            {children}
            <Footer />
            <BackToTop />
            <QueryDevtools />
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
