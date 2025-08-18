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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
  }: NavigationItem & {
    activeTab: string | null
    setActiveTab: (id: string) => void
    scrollToSection: (id: string) => void
    expandedSections: Record<string, boolean>
    toggleSection: (id: string) => void
  }) => {
    const Icon = getIconComponent(icon)

    const handleClick = () => {
      setActiveTab(id) // Always set this tab active
      scrollToSection(id) // Optional: scroll to it

      if (subItems) {
        toggleSection(id) // Toggle dropdown if needed
      }
    }

    return (
      <div className="flex flex-col">
        <button
          onClick={handleClick}
          className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
            activeTab === id ? 'bg-gray-600 text-white' : 'hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center">
            {Icon && <Icon className="w-5 h-5 mr-2" />}
            {label}
          </div>
          {subItems && (
            <LucideIcons.ChevronRight
              className={`w-4 h-4 transition-transform ${
                expandedSections?.[id] ? 'rotate-90' : ''
              }`}
            />
          )}
        </button>

        {subItems && expandedSections?.[id] && (
          <div className="ml-6 mt-1 space-y-1">
            {subItems.map((subItem) => (
              <button
                key={subItem.id}
                onClick={() => {
                  setActiveTab(subItem.id)
                  scrollToSection(subItem.id)
                }}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors w-full text-left ${
                  activeTab === subItem.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'
                }`}
              >
                <LucideIcons.ChevronRight className="w-3 h-3 mr-2" />
                {subItem.label}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <section id="news-media" className="py-8">
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Navigation Button */}
        <div className="md:hidden fixed top-4 right-4 z-50">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-blue-600 text-white shadow-lg"
          >
            {mobileMenuOpen ? (
              <LucideIcons.X className="w-6 h-6" />
            ) : (
              <LucideIcons.Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-4 overflow-y-auto">
            <div className="flex flex-col gap-2">
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

        {/* Hero Section */}
        <div className="relative w-full">
          <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full">
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
              <div className="container mx-auto px-4 h-full flex flex-col justify-center">
                <div className="max-w-3xl">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
                    {universityInfo?.name}
                  </h1>
                  <p className="text-lg sm:text-xl mb-2 text-white/90">{universityInfo?.tagline}</p>
                  <div className="flex items-center gap-4 text-lg mb-6 text-white/80">
                    <span className="flex items-center">
                      <LucideIcons.Calendar className="w-5 h-5 mr-2" />
                      {universityInfo?.establishedYear}
                    </span>
                    <span className="flex items-center">
                      <LucideIcons.MapPin className="w-5 h-5 mr-2" />
                      {universityInfo?.location}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <Link href={universityInfo?.applyNowButtonUrl || '#'}>
                      <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors text-white">
                        {universityInfo?.applyNowButton}
                      </button>
                    </Link>
                    <Link href={universityInfo?.downloadProspectusButtonUrl || '#'}>
                      <button className="bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors">
                        {universityInfo?.downloadProspectusButton}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white shadow-lg transform -translate-y-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8">
              {stats?.map((stat, index) => (
                <div
                  key={stat.id || index}
                  className="flex items-center justify-center text-center"
                >
                  <div>
                    <p className="text-4xl font-bold text-blue-600">{stat.value}</p>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Tabs Navigation */}
            <div className="hidden md:block md:w-1/4">
              <div className="p-4 top-4">
                <div className="flex flex-col gap-2">
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

            {/* Tab Content */}
            <div className="md:w-3/4">
              <div className="bg-white rounded-xl shadow-sm p-8 overflow-y-auto max-h-screen">
                {navigation?.map((navItem) => {
                  // Top-level tab match
                  if (activeTab === navItem.id) {
                    return (
                      <section key={navItem.id} className="mb-40">
                        <h2 className="text-3xl font-bold mb-6">{navItem.label}</h2>
                        {navItem.content && <RichText data={navItem.content} />}
                      </section>
                    )
                  }

                  // Sub-tab match
                  const activeSubItem = navItem.subItems?.find(
                    (subItem) => subItem.id === activeTab,
                  )

                  if (activeSubItem) {
                    return (
                      <section key={activeSubItem.id} className="mb-40">
                        <h2 className="text-3xl font-bold mb-6">{navItem.label}</h2>
                        <section id={activeSubItem.id} className="mb-8">
                          <h3 className="text-2xl font-semibold mb-4">{activeSubItem.label}</h3>
                          {activeSubItem.content && <RichText data={activeSubItem.content} />}
                        </section>
                      </section>
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
