import React from 'react'
import Link from 'next/link'

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

interface MobileFooterProps {
  socialLinks?: SocialLink[]
  quickLinks?: QuickLink[]
  contactInfo?: ContactInfo[]
  companyName?: string
  companyDescription?: string
  copyrightText?: string
}

const MobileFooter: React.FC<MobileFooterProps> = ({
  socialLinks = [],
  quickLinks = [],
  contactInfo = [],
  companyName = 'Political Portfolio',
  companyDescription = 'Empowering political leaders with comprehensive portfolio management and strategic consulting services.',
  copyrightText = '© 2024 Political Portfolio. All rights reserved.',
}) => {
  return (
    <footer className="md:hidden bg-[#1D40AF] text-white">
      {/* Main Footer Content */}
      <div className="container py-8">
        {/* Company Info */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
            {companyName}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">{companyDescription}</p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="bg-white/10 hover:bg-white/20 p-4 rounded-lg transition-all duration-300 flex flex-col items-center space-y-2"
            >
              {link.icon && <link.icon className="w-6 h-6" />}
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold mb-4 text-center">Contact Info</h4>
          <div className="space-y-3">
            {contactInfo.map((contact, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg">
                <div className="bg-blue-500 p-2 rounded-full flex-shrink-0">
                  <contact.icon className="w-4 h-4 text-white" />
                </div>
                <Link
                  href={contact.href}
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm flex-1"
                >
                  {contact.text}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="text-center mb-6">
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Links */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
          <p className="text-gray-400 text-xs text-center mt-4">{copyrightText}</p>
        </div>
      </div>
    </footer>
  )
}

export default MobileFooter
