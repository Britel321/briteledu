'use client'
import React, { useState, useEffect } from 'react'
import type { UniversitiesBlock as UniversitiesBlockProps } from '@/payload-types'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import RichText from '@/components/RichText'

type NavigationItem = NonNullable<UniversitiesBlockProps['navigation']>[0]
type _StatItem = NonNullable<UniversitiesBlockProps['stats']>[0]

export const UniversitiesBlock: React.FC<UniversitiesBlockProps> = ({
  universityInfo,
  stats,
  navigation,
  heroImage,
}) => {
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Set default active tab to the first top-level item
  useEffect(() => {
    if (navigation && navigation.length > 0 && !activeTab) {
      const firstItem = navigation[0]
      setActiveTab(firstItem.id)

      // If the first item has sub-items, expand it by default
      if (firstItem.subItems && firstItem.subItems.length > 0) {
        setExpandedSections((prev) => ({ ...prev, [firstItem.id]: true }))
      }
    }
  }, [navigation, activeTab])

  useEffect(() => {
    if (navigation && navigation.length > 0) {
      const initialExpandedSections = navigation.reduce(
        (acc: Record<string, boolean>, item) => {
          acc[item.id] = false
          if (item.subItems && item.subItems.length > 0) {
            item.subItems.forEach((subItem) => {
              acc[subItem.id] = false
            })
          }
          return acc
        },
        {} as Record<string, boolean>,
      )

      // Set the first item as expanded by default if it has sub-items
      if (navigation[0].subItems && navigation[0].subItems.length > 0) {
        initialExpandedSections[navigation[0].id] = true
      }

      setExpandedSections(initialExpandedSections)

      // Set the first navigation item as active by default
      if (!activeTab) {
        setActiveTab(navigation[0].id)
      }
    }
  }, [navigation, activeTab])

  // Trigger visibility for scroll animations
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Auto-close mobile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (mobileDropdownOpen && !target.closest('[data-mobile-dropdown]')) {
        setMobileDropdownOpen(false)
      }
    }

    if (mobileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mobileDropdownOpen])

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      // If section doesn't exist, scroll to the main content area
      const mainContent = document.querySelector('[data-universities-content]')
      if (mainContent) {
        mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      console.warn(`Section with id "${id}" not found, scrolling to main content`)
    }
  }

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const getIconComponent = (iconName?: string | null) => {
    if (!iconName) return null
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons]
    return IconComponent as React.ComponentType<{ className?: string }> | null
  }

  const TabButton = ({
    id,
    label,
    icon,
    subItems,
    activeTab,
    setActiveTab,
    scrollToSection,
    expandedSections,
    toggleSection,
    isMobile = false,
  }: NavigationItem & {
    activeTab: string | null
    setActiveTab: (id: string) => void
    scrollToSection: (id: string) => void
    expandedSections: Record<string, boolean>
    toggleSection: (id: string) => void
    isMobile?: boolean
  }) => {
    const Icon = getIconComponent(icon)

    const handleClick = () => {
      setActiveTab(id)
      // If there are subItems, toggle the section expansion
      if (subItems && subItems.length > 0) {
        toggleSection(id)
        // Don't scroll for parent items with sub-items
      } else {
        // Scroll to section if no subItems (direct navigation)
        scrollToSection(id)
      }
    }

    const handleSubItemClick = (subItemId: string, event: React.MouseEvent) => {
      event.stopPropagation()
      setActiveTab(subItemId)
      scrollToSection(subItemId)
    }

    return (
      <div className="flex flex-col">
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.02, x: 2 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-300 text-sm font-medium relative overflow-hidden group cursor-pointer ${
            activeTab === id || (subItems && subItems.some((sub) => sub.id === activeTab))
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
              : expandedSections?.[id] && subItems && subItems.length > 0
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md'
          } ${isMobile ? 'w-full' : ''}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          <div className="flex items-center relative z-10">
            {Icon && (
              <motion.div
                animate={activeTab === id ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
              </motion.div>
            )}
            <span className="truncate">{label}</span>
          </div>
          {subItems && subItems.length > 0 && (
            <motion.div
              animate={{ rotate: expandedSections?.[id] ? 180 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={`relative z-10 transition-colors duration-200 ${
                expandedSections?.[id] ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <LucideIcons.ChevronDown className="w-4 h-4 flex-shrink-0 ml-2" />
            </motion.div>
          )}
        </motion.button>

        <AnimatePresence>
          {subItems && subItems.length > 0 && expandedSections?.[id] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={`mt-1 space-y-1 ${isMobile ? 'ml-0' : 'ml-4'} overflow-hidden`}
            >
              {subItems.map((subItem, index) => (
                <motion.button
                  key={subItem.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => handleSubItemClick(subItem.id, e)}
                  className={`flex items-center px-3 py-2 rounded-md transition-all duration-300 w-full text-left text-sm relative group cursor-pointer ${
                    activeTab === subItem.id
                      ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-600 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800 hover:shadow-sm'
                  }`}
                >
                  <motion.div
                    animate={activeTab === subItem.id ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-2 h-2 rounded-full bg-current opacity-50 mr-3 flex-shrink-0"
                  />
                  <span className="truncate">{subItem.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <section className="bg-gray-50">
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative w-full overflow-hidden">
          <div className="relative h-[70vh] sm:h-[80vh] lg:h-[90vh] w-full">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="relative w-full h-full"
            >
              <Image
                src={
                  heroImage && typeof heroImage === 'object' && heroImage.url
                    ? heroImage.url
                    : '/placeholder.jpg'
                }
                alt="Global Medical University Campus"
                width={1920}
                height={1080}
                priority
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute inset-0"
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
                <div className="max-w-6xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="mb-6"
                  >
                    <motion.h1
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-4"
                      style={{
                        textShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.1)',
                        fontWeight: '900',
                      }}
                    >
                      <motion.span
                        animate={{
                          backgroundPosition: ['0%', '100%', '0%'],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="bg-gradient-to-r from-white via-blue-100 to-white bg-300% bg-clip-text text-transparent"
                        style={{ backgroundSize: '300% 100%' }}
                      >
                        {universityInfo?.name}
                      </motion.span>
                    </motion.h1>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '200px' }}
                      transition={{ delay: 1.5, duration: 1.2, ease: 'easeOut' }}
                      className="h-1.5 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 mx-auto rounded-full shadow-lg"
                      style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)' }}
                    />
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 text-white/95 max-w-4xl mx-auto leading-relaxed font-light"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
                  >
                    {universityInfo?.tagline}
                  </motion.p>

                  {/* University Info - Centered */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-base sm:text-lg mb-10 text-white/90"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="flex items-center cursor-pointer bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 shadow-lg"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="mr-3"
                      >
                        <LucideIcons.Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />
                      </motion.div>
                      <span className="font-medium">Est. {universityInfo?.establishedYear}</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="flex items-center cursor-pointer bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 shadow-lg"
                    >
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="mr-3"
                      >
                        <LucideIcons.MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />
                      </motion.div>
                      <span className="font-medium">{universityInfo?.location}</span>
                    </motion.div>
                  </motion.div>

                  {/* CTA Buttons - Centered */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center"
                  >
                    <Link href={universityInfo?.applyNowButtonUrl || '#'}>
                      <motion.button
                        whileHover={{
                          scale: 1.08,
                          boxShadow: '0 15px 35px rgba(59, 130, 246, 0.6)',
                          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full font-bold transition-all duration-300 text-white text-lg shadow-2xl relative overflow-hidden group border-2 border-blue-400/20"
                        style={{ minWidth: '200px' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                        <span className="relative z-10 flex items-center justify-center">
                          {universityInfo?.applyNowButton || 'Apply Now'}
                          <motion.div
                            animate={{ x: [0, 6, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="ml-3"
                          >
                            <LucideIcons.ArrowRight className="w-5 h-5" />
                          </motion.div>
                        </span>
                      </motion.button>
                    </Link>
                    <Link href={universityInfo?.downloadProspectusButtonUrl || '#'}>
                      <motion.button
                        whileHover={{
                          scale: 1.08,
                          boxShadow: '0 15px 35px rgba(255, 255, 255, 0.3)',
                          background: 'rgba(255, 255, 255, 0.95)',
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/90 backdrop-blur-md text-blue-900 hover:bg-white px-8 py-4 rounded-full font-bold transition-all duration-300 text-lg shadow-2xl relative overflow-hidden group border-2 border-white/30"
                        style={{ minWidth: '200px' }}
                      >
                        <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-500" />
                        <span className="relative z-10 flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                            className="mr-3"
                          >
                            <LucideIcons.Download className="w-5 h-5" />
                          </motion.div>
                          {universityInfo?.downloadProspectusButton || 'Download Prospectus'}
                        </span>
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="relative -mt-20 mb-20"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl border border-white/20 overflow-hidden mx-auto max-w-6xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white/50" />
              <div className="relative px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7, duration: 0.6 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-3">
                    University at a Glance
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
                  {stats?.map((stat, index) => (
                    <motion.div
                      key={stat.id || index}
                      initial={{ opacity: 0, y: 40, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: 1.8 + index * 0.15,
                        duration: 0.7,
                        type: 'spring',
                        stiffness: 120,
                      }}
                      whileHover={{
                        scale: 1.08,
                        y: -8,
                        transition: { duration: 0.3, ease: 'easeOut' },
                      }}
                      className="text-center group cursor-pointer relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10 p-4 sm:p-6">
                        <motion.div
                          animate={
                            isVisible
                              ? {
                                  scale: [1, 1.15, 1],
                                  rotate: [0, 5, -5, 0],
                                }
                              : {}
                          }
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 4,
                            delay: index * 0.7,
                          }}
                        >
                          <motion.p
                            className="text-3xl sm:text-4xl lg:text-6xl font-black mb-2 sm:mb-3 bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-blue-900 transition-all duration-300"
                            style={{ fontWeight: '900' }}
                          >
                            {stat.value}
                          </motion.p>
                        </motion.div>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-semibold group-hover:text-gray-800 transition-colors duration-300 leading-tight">
                          {stat.label}
                        </p>
                        <motion.div
                          className="h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mt-3 rounded-full group-hover:from-blue-700 group-hover:to-blue-900 transition-all duration-300"
                          initial={{ width: 0 }}
                          whileHover={{ width: '100%' }}
                          animate={{ width: '30px' }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl"
          data-universities-content
        >
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
              Explore University Details
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover everything about our programs, facilities, and opportunities
            </p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
              className="h-1.5 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mt-6 rounded-full"
            />
          </motion.div>

          {/* Mobile Navigation - Dropdown Alternative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:hidden mb-8 sm:mb-10"
            data-mobile-dropdown
          >
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden mx-auto max-w-2xl">
              <motion.button
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                whileHover={{ backgroundColor: 'rgba(248, 250, 252, 0.8)' }}
                whileTap={{ scale: 0.98 }}
                className={`w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50/50 transition-all duration-300 group cursor-pointer ${
                  mobileDropdownOpen
                    ? 'bg-blue-50 border-2 border-blue-200'
                    : 'bg-white border-2 border-transparent'
                }`}
              >
                <div className="flex items-center">
                  {(() => {
                    const currentItem =
                      navigation?.find((nav) => nav.id === activeTab) ||
                      navigation?.find((nav) => nav.subItems?.find((sub) => sub.id === activeTab))
                    const currentSubItem = currentItem?.subItems?.find(
                      (sub) => sub.id === activeTab,
                    )
                    const displayItem = currentSubItem || currentItem
                    const Icon =
                      displayItem &&
                      getIconComponent('icon' in displayItem ? (displayItem.icon as string) : null)

                    if (!displayItem) {
                      return (
                        <div className="flex items-center">
                          <LucideIcons.Navigation className="w-5 h-5 text-gray-400 mr-3" />
                          <span className="text-gray-500">Select an option</span>
                        </div>
                      )
                    }

                    return (
                      <>
                        {Icon && (
                          <motion.div
                            animate={{ rotate: mobileDropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="mr-3"
                          >
                            <Icon className="w-5 h-5 text-blue-600" />
                          </motion.div>
                        )}
                        <div>
                          <p className="font-semibold text-gray-900">{displayItem.label}</p>
                          {currentSubItem && currentItem && (
                            <p className="text-xs text-gray-500">{currentItem.label}</p>
                          )}
                        </div>
                      </>
                    )
                  })()}
                </div>
                <div className="flex items-center gap-2">
                  {mobileDropdownOpen && (
                    <>
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          // Collapse all sections
                          setExpandedSections({})
                        }}
                        className="p-1 rounded-full hover:bg-blue-100 transition-colors duration-200"
                        title="Collapse all sections"
                      >
                        <LucideIcons.Minus className="w-4 h-4 text-blue-600" />
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setMobileDropdownOpen(false)
                        }}
                        className="p-1 rounded-full hover:bg-blue-100 transition-colors duration-200"
                        title="Close dropdown"
                      >
                        <LucideIcons.X className="w-4 h-4 text-blue-600" />
                      </motion.button>
                    </>
                  )}
                  <motion.div
                    animate={{ rotate: mobileDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={`transition-colors duration-200 ${
                      mobileDropdownOpen ? 'text-blue-600' : 'text-gray-400'
                    }`}
                  >
                    <LucideIcons.ChevronDown className="w-5 h-5 group-hover:text-blue-600" />
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {mobileDropdownOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="border-t border-gray-100 overflow-hidden"
                  >
                    <div className="max-h-60 overflow-y-auto">
                      {navigation?.map((navItem, navIndex) => (
                        <div key={navItem.id}>
                          <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: navIndex * 0.1 }}
                            onClick={() => {
                              setActiveTab(navItem.id)
                              // If this item has sub-items, toggle the mobile dropdown to show them
                              if (navItem.subItems && navItem.subItems.length > 0) {
                                // Toggle the section expansion
                                toggleSection(navItem.id)
                                // Keep dropdown open to show sub-items
                              } else {
                                // Close dropdown if no sub-items
                                setMobileDropdownOpen(false)
                              }
                            }}
                            whileHover={{ backgroundColor: '#f1f5f9', x: 4 }}
                            className={`w-full px-4 py-3 text-left flex items-center transition-all duration-200 cursor-pointer ${
                              activeTab === navItem.id ||
                              (navItem.subItems &&
                                navItem.subItems.some((sub) => sub.id === activeTab))
                                ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-700'
                                : expandedSections?.[navItem.id] &&
                                    navItem.subItems &&
                                    navItem.subItems.length > 0
                                  ? 'bg-blue-25 border-r-2 border-blue-300 text-blue-600'
                                  : 'hover:bg-gray-50 text-gray-700'
                            }`}
                          >
                            {getIconComponent(navItem.icon) && (
                              <motion.div whileHover={{ scale: 1.1 }} className="mr-3">
                                {React.createElement(getIconComponent(navItem.icon)!, {
                                  className: 'w-4 h-4',
                                })}
                              </motion.div>
                            )}
                            <span className="font-medium">{navItem.label}</span>
                            {navItem.subItems && navItem.subItems.length > 0 && (
                              <motion.div
                                animate={{ rotate: expandedSections?.[navItem.id] ? 90 : 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className={`ml-auto transition-colors duration-200 ${
                                  expandedSections?.[navItem.id] ? 'text-blue-600' : 'text-gray-400'
                                }`}
                              >
                                <LucideIcons.ChevronRight className="w-4 h-4" />
                              </motion.div>
                            )}
                          </motion.button>

                          {/* Sub-items */}
                          {navItem.subItems && navItem.subItems.length > 0 && (
                            <AnimatePresence>
                              {expandedSections?.[navItem.id] && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                                  className="bg-gray-50 border-l-2 border-gray-200 ml-4 overflow-hidden"
                                >
                                  {navItem.subItems.map((subItem, subIndex) => (
                                    <motion.button
                                      key={subItem.id}
                                      initial={{ opacity: 0, x: -15 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: navIndex * 0.1 + subIndex * 0.05 }}
                                      onClick={() => {
                                        setActiveTab(subItem.id)
                                        setMobileDropdownOpen(false)
                                        scrollToSection(subItem.id)
                                      }}
                                      whileHover={{ backgroundColor: '#e2e8f0', x: 2 }}
                                      className={`w-full px-4 py-2.5 text-left text-sm transition-all duration-200 flex items-center cursor-pointer ${
                                        activeTab === subItem.id
                                          ? 'bg-blue-100 text-blue-700 font-medium border-l-2 border-blue-600'
                                          : 'text-gray-600 hover:text-gray-800'
                                      }`}
                                    >
                                      <motion.div
                                        animate={
                                          activeTab === subItem.id
                                            ? { scale: [1, 1.3, 1] }
                                            : { scale: 1 }
                                        }
                                        transition={{ duration: 0.3 }}
                                        className="w-2 h-2 rounded-full bg-current opacity-60 mr-3"
                                      />
                                      {subItem.label}
                                    </motion.button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
            {/* Desktop Sidebar Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="hidden lg:block lg:w-1/3 xl:w-1/4 2xl:w-1/5"
            >
              <div className="sticky top-8">
                <motion.div
                  whileHover={{ boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}
                  className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 lg:p-8 overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-white/50" />
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-between relative z-10"
                  >
                    <div className="flex items-center">
                      <motion.div
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 6 }}
                        className="mr-3 p-2 bg-blue-100 rounded-full"
                      >
                        <LucideIcons.Navigation className="w-5 h-5 text-blue-600" />
                      </motion.div>
                      Quick Navigation
                    </div>
                  </motion.h3>
                  <div className="space-y-3 relative z-10">
                    {navigation?.map((navItem, index) => {
                      return (
                        <motion.div
                          key={navItem.id}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + index * 0.1 }}
                        >
                          <TabButton
                            {...navItem}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            scrollToSection={scrollToSection}
                            expandedSections={expandedSections}
                            toggleSection={toggleSection}
                          />
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Main Content Area */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="lg:w-2/3 xl:w-3/4 2xl:w-4/5"
            >
              <motion.div
                whileHover={{ boxShadow: '0 25px 60px rgba(0,0,0,0.15)' }}
                className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-blue-50/20" />
                <AnimatePresence mode="wait">
                  {navigation?.map((navItem) => {
                    // Top-level tab match
                    if (activeTab === navItem.id) {
                      return (
                        <motion.section
                          key={navItem.id}
                          initial={{ opacity: 0, y: 40, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -40, scale: 0.95 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                          className="relative z-10 p-8 sm:p-10 lg:p-16"
                        >
                          <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-center mb-10 sm:mb-12"
                          >
                            <motion.h2
                              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 text-black"
                              style={{ fontWeight: '800' }}
                            >
                              {navItem.label}
                            </motion.h2>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '120px' }}
                              transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                              className="w-full h-0.5 bg-black mx-auto rounded-full shadow-lg"
                              style={{ boxShadow: '0 0 15px rgba(0, 0, 0, 0.4)' }}
                            />
                          </motion.div>
                          {navItem.content && (
                            <motion.div
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4, duration: 0.7 }}
                              className="max-w-none"
                            >
                              <div className="prose prose-lg max-w-4xl mx-auto text-left">
                                <RichText
                                  data={navItem.content}
                                  enableGutter={false}
                                  enableProse={true}
                                  variant="expanded"
                                  theme="light"
                                />
                              </div>
                            </motion.div>
                          )}
                        </motion.section>
                      )
                    }

                    // Sub-tab match
                    const activeSubItem = navItem.subItems?.find(
                      (subItem) => subItem.id === activeTab,
                    )

                    if (activeSubItem) {
                      return (
                        <motion.section
                          key={activeSubItem.id}
                          initial={{ opacity: 0, y: 40, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -40, scale: 0.95 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                          className="relative z-10 p-8 sm:p-10 lg:p-16"
                        >
                          <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-center mb-10 sm:mb-12"
                          >
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="flex items-center justify-center text-lg text-gray-500 mb-4"
                            >
                              <span className="text-blue-600 font-medium">{navItem.label}</span>
                              <motion.div
                                animate={{ x: [0, 6, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                                className="mx-3"
                              >
                                <LucideIcons.ChevronRight className="w-5 h-5 text-blue-400" />
                              </motion.div>
                              <span className="text-gray-600 font-medium">
                                {activeSubItem.label}
                              </span>
                            </motion.div>

                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '120px' }}
                              transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                              className="h-1.5 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full shadow-lg"
                              style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)' }}
                            />
                          </motion.div>
                          {activeSubItem.content && (
                            <motion.div
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4, duration: 0.7 }}
                              className="max-w-none"
                            >
                              <div className="prose prose-lg max-w-4xl mx-auto text-left">
                                <RichText
                                  data={activeSubItem.content}
                                  enableGutter={false}
                                  enableProse={true}
                                  variant="expanded"
                                  theme="light"
                                />
                              </div>
                            </motion.div>
                          )}
                        </motion.section>
                      )
                    }

                    return null
                  })}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
