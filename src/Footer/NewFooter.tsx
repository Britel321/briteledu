import React from 'react'
import DesktopFooter from './DesktopFooter'
import MobileFooter from './MobileFooter'

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>
  href: string
  label: string
}

interface QuickLink {
  icon?: React.ComponentType<{ className?: string }>
  href: string
  label: string
}

interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>
  text: string
  href: string
}

interface NewFooterProps {
  socialLinks?: SocialLink[]
  quickLinks?: QuickLink[]
  contactInfo?: ContactInfo[]
  companyName?: string
  companyDescription?: string
  copyrightText?: string
}

const NewFooter: React.FC<NewFooterProps> = (props) => {
  return (
    <>
      <DesktopFooter {...props} />
      <MobileFooter {...props} />
    </>
  )
}

export default NewFooter
