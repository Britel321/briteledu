import React from 'react'
import Link from 'next/link'

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>
  href: string
  label: string
}

interface QuickLink {
  href: string
  label: string
}

interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>
  text: string
  href: string
}

interface DesktopFooterProps {
  socialLinks?: SocialLink[]
  quickLinks?: QuickLink[]
  contactInfo?: ContactInfo[]
  companyName?: string
  companyDescription?: string
  copyrightText?: string
}

const DesktopFooter: React.FC<DesktopFooterProps> = ({
  socialLinks = [],
  quickLinks = [],
  contactInfo = [],
  companyName = 'Chanda Chaudhary',
  companyDescription = 'Empowering political leaders and organizations with comprehensive portfolio management and strategic consulting services. We help shape the future of governance through innovative solutions and expert guidance.',
  copyrightText = '© 2025 Chanda Chaudhary. All rights reserved.',
}) => {
  return (
    <footer className="hidden md:block bg-[#1D40AF] text-white">
      <div className="container py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
                {companyName}
              </h3>
              <p className="text-gray-300 leading-relaxed">{companyDescription}</p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
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

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="bg-blue-500 p-2 rounded-full">
                    <contact.icon className="w-4 h-4 text-white" />
                  </div>
                  <Link
                    href={contact.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {contact.text}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">{copyrightText}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default DesktopFooter
