'use client'
import React, { useState, useEffect } from 'react'
import type { UniversitiesBlock as UniversitiesBlockProps } from '@/payload-types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import RichText from '@/components/RichText'

type NavigationItem = NonNullable<UniversitiesBlockProps['navigation']>[0]
type StatItem = NonNullable<UniversitiesBlockProps['stats']>[0]

export const UniversitiesBlock: React.FC<UniversitiesBlockProps> = ({
  universityInfo,
  stats,
  navigation,
  heroImage,
}) => {
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (navigation && navigation.length > 0) {
      const initialExpandedSections = navigation.reduce(
        (acc: Record<string, boolean>, item) => {
          acc[item.id] = false
          if (item.subItems) {
            item.subItems.forEach((subItem) => {
              acc[subItem.id] = false
            })
          }
          return acc
        },
        {} as Record<string, boolean>,
      )
      setExpandedSections(initialExpandedSections)
    }
  }, [navigation])

  // Set default active tab to the first top-level item
  useEffect(() => {
    if (navigation && navigation.length > 0 && !activeTab) {
      setActiveTab(navigation[0].id)
    }
  }, [navigation, activeTab])

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
      if (subItems) {
        toggleSection(id)
      }
    }

    return (
      <div className="flex flex-col">
        <button
          onClick={handleClick}
          className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
            activeTab === id
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          } ${isMobile ? 'w-full' : ''}`}
        >
          <div className="flex items-center">
            {Icon && <Icon className="w-4 h-4 mr-2 flex-shrink-0" />}
            <span className="truncate">{label}</span>
          </div>
          {subItems && (
            <LucideIcons.ChevronDown
              className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ml-2 ${
                expandedSections?.[id] ? 'rotate-180' : ''
              }`}
            />
          )}
        </button>

        {subItems && expandedSections?.[id] && (
          <div className={`mt-1 space-y-1 ${isMobile ? 'ml-0' : 'ml-4'}`}>
            {subItems.map((subItem) => (
              <button
                key={subItem.id}
                onClick={() => {
                  setActiveTab(subItem.id)
                }}
                className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 w-full text-left text-sm ${
                  activeTab === subItem.id
                    ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-current opacity-50 mr-3 flex-shrink-0" />
                <span className="truncate">{subItem.label}</span>
              </button>
            ))}
          </div>
        )}
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
        <div className="relative w-full">
          <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] w-full">
            <div className="relative w-full h-full">
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
            </div>
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
                <div className="max-w-4xl mx-auto text-center lg:text-left">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-white leading-tight">
                    {universityInfo?.name}
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl mb-4 sm:mb-6 text-white/90 max-w-2xl mx-auto lg:mx-0">
                    {universityInfo?.tagline}
                  </p>

                  {/* University Info - Mobile Optimized */}
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-6 text-sm sm:text-base mb-6 sm:mb-8 text-white/80">
                    <span className="flex items-center">
                      <LucideIcons.Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                      <span>Est. {universityInfo?.establishedYear}</span>
                    </span>
                    <span className="flex items-center">
                      <LucideIcons.MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                      <span>{universityInfo?.location}</span>
                    </span>
                  </div>

                  {/* CTA Buttons - Mobile Optimized */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center lg:justify-start">
                    <Link
                      href={universityInfo?.applyNowButtonUrl || '#'}
                      className="w-full sm:w-auto"
                    >
                      <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors text-white text-sm sm:text-base">
                        {universityInfo?.applyNowButton || 'Apply Now'}
                      </button>
                    </Link>
                    <Link
                      href={universityInfo?.downloadProspectusButtonUrl || '#'}
                      className="w-full sm:w-auto"
                    >
                      <button className="w-full sm:w-auto bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base">
                        {universityInfo?.downloadProspectusButton || 'Download Prospectus'}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white shadow-lg transform -translate-y-8 sm:-translate-y-12 lg:-translate-y-16 mx-4 sm:mx-6 lg:mx-8 rounded-xl">
          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {stats?.map((stat, index) => (
                <motion.div
                  key={stat.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-12 sm:pb-16">
          {/* Mobile Navigation - Horizontal Scroll */}
          <div className="lg:hidden mb-6 sm:mb-8">
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4">
              <div className="flex overflow-x-auto scrollbar-hide space-x-2 pb-2">
                {navigation?.map((navItem) => (
                  <div key={navItem.id} className="flex-shrink-0">
                    <button
                      onClick={() => setActiveTab(navItem.id)}
                      className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all duration-200 ${
                        activeTab === navItem.id
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center">
                        {getIconComponent(navItem.icon) && (
                          <div className="w-4 h-4 mr-2">
                            {React.createElement(getIconComponent(navItem.icon)!, {
                              className: 'w-4 h-4',
                            })}
                          </div>
                        )}
                        <span>{navItem.label}</span>
                      </div>
                    </button>
                  </div>
                ))}
              </div>

              {/* Sub-navigation for mobile */}
              {navigation?.find((nav) => nav.id === activeTab)?.subItems && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {navigation
                      .find((nav) => nav.id === activeTab)
                      ?.subItems?.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => setActiveTab(subItem.id)}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                            activeTab === subItem.id
                              ? 'bg-blue-50 text-blue-600 border border-blue-200'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {subItem.label}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Desktop Sidebar Navigation */}
            <div className="hidden lg:block lg:w-1/3 xl:w-1/4">
              <div className="sticky top-6">
                <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h3>
                  <div className="space-y-2">
                    {navigation?.map((navItem) => (
                      <TabButton
                        key={navItem.id}
                        {...navItem}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        scrollToSection={scrollToSection}
                        expandedSections={expandedSections}
                        toggleSection={toggleSection}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:w-2/3 xl:w-3/4">
              <div className="bg-white rounded-xl shadow-sm">
                {navigation?.map((navItem) => {
                  // Top-level tab match
                  if (activeTab === navItem.id) {
                    return (
                      <motion.section
                        key={navItem.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 sm:p-8 lg:p-10"
                      >
                        <div className="mb-6">
                          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                            {navItem.label}
                          </h2>
                          <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
                        </div>
                        {navItem.content && (
                          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
                            <RichText data={navItem.content} />
                          </div>
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 sm:p-8 lg:p-10"
                      >
                        <div className="mb-6">
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <span>{navItem.label}</span>
                            <LucideIcons.ChevronRight className="w-4 h-4 mx-2" />
                            <span>{activeSubItem.label}</span>
                          </div>
                          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                            {activeSubItem.label}
                          </h2>
                          <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
                        </div>
                        {activeSubItem.content && (
                          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
                            <RichText data={activeSubItem.content} />
                          </div>
                        )}
                      </motion.section>
                    )
                  }

                  return null
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
