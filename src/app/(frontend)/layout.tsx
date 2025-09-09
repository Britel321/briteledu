import type { Metadata } from 'next'

import { cn } from '@/utils/ui'
import React from 'react'
import { Inter, Rufina } from 'next/font/google'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utils/mergeOpenGraph'
// import { draftMode } from 'next/headers'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { BackToTop } from '@/components/BackToTop'
import { QueryDevtools } from '@/components/ReactQueryDevtools'

import './globals.css'
import { getServerSideURL } from '@/utils/getURL'
import { LivePreviewListener } from '@/components/LivePreviewListener'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const rufina = Rufina({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-rufina',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // const { isEnabled } = await draftMode()

  return (
    <html className={cn(inter.variable, rufina.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <LanguageProvider>
            <LivePreviewListener />
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
    creator: '@briteleducation',
  },
}
