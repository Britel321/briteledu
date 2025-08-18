'use client'

import React from 'react'
import { DesktopNavbar } from './DesktopNavbar'
import { MobileNavbar } from './MobileNavbar'
import { LanguageTranslator } from '@/components/LanguageTranslator'
import { useLanguage } from '@/contexts/LanguageContext'

interface ResponsiveNavbarProps {
  className?: string
  navData: any
}

export const ResponsiveNavbar: React.FC<ResponsiveNavbarProps> = ({ className = '', navData }) => {
  const { currentLanguage, setLanguage } = useLanguage()

  return (
    <div className={`flex items-center justify-between w-full ${className}`}>
      {/* Desktop Navbar - Hidden on mobile, left-aligned */}
      <div className="hidden lg:flex">
        <DesktopNavbar navData={navData} />
      </div>

      {/* Language Translator - Hidden on mobile, positioned on the right */}
      <div className="hidden lg:flex lg:items-center">
        <LanguageTranslator className="ml-8" />
      </div>

      {/* Mobile Navbar - Hidden on desktop, positioned on the right */}
      <div className="lg:hidden ml-auto">
        <MobileNavbar navData={navData} />
      </div>
    </div>
  )
}
