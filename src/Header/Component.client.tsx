'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { ResponsiveNavbar } from '@/components/Navbar'
import { TopBar } from './TopBar'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data: _data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  // Framer Motion scroll hook
  const { scrollY } = useScroll()

  // Transform scroll values to animation values
  const topHeaderOpacity = useTransform(scrollY, [0, 50], [1, 0])
  const topHeaderY = useTransform(scrollY, [0, 50], [0, -100])
  const pointerEvents = useTransform(scrollY, [0, 50], ['auto', 'none'])

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <>
      {/* Top Header Bar with Logo - Hidden on mobile, shows on desktop and hides on scroll */}
      <TopBar
        opacity={topHeaderOpacity}
        y={topHeaderY}
        pointerEvents={pointerEvents}
        theme={theme}
      />

      {/* Navigation Bar - Sticky with smooth background transition */}
      <motion.div className="w-full sticky top-0 z-40 bg-blue-800">
        <div className="container">
          <div className="py-3 lg:py-4 flex justify-between items-center w-full">
            {/* Logo - Visible on mobile, hidden on desktop */}
            <div className="lg:hidden pl-4 lg:pl-6">
              <Link href="/">
                <Logo loading="eager" priority="high" className="invert dark:invert-0" />
              </Link>
            </div>

            {/* Responsive Navigation - Handles both desktop and mobile */}
            <div className="w-full">
              <ResponsiveNavbar navData={_data.navItems} />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
