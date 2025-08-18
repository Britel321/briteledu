import React from 'react'
import NewFooter from './NewFooter'
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Home,
  User,
  FileText,
  MessageCircle,
} from 'lucide-react'

export async function Footer() {
  // Dummy data for the footer
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  const quickLinks = [
    { icon: Home, href: '/', label: 'Home' },
    { icon: User, href: '/about', label: 'About' },
    { icon: FileText, href: '/services', label: 'Services' },
    { icon: MessageCircle, href: '/contact', label: 'Contact' },
  ]

  const contactInfo = [
    { icon: Mail, text: 'info@chandachaudhary.com.np', href: 'mailto:info@chandachaudhary.com.np' },
    { icon: Phone, text: '+977 9808000000', href: 'tel:+9779808000000' },
    { icon: MapPin, text: 'Kathmandu, Nepal', href: 'https://maps.app.goo.gl/1234567890' },
  ]

  const footerData = {
    socialLinks,
    quickLinks,
    contactInfo,
    companyName: 'Chanda Chaudhary',
    companyDescription:
      'Empowering political leaders and organizations with comprehensive portfolio management and strategic consulting services. We help shape the future of governance through innovative solutions and expert guidance.',
    copyrightText: '© 2025 Chanda Chaudhary. All rights reserved.',
  }

  return <NewFooter {...footerData} />
}
