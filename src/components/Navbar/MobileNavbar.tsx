'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { LanguageTranslator } from '@/components/LanguageTranslator'
import { useLanguage } from '@/contexts/LanguageContext'

// Updated interface to match the Header config structure
interface NavItem {
  name: string
  path: string
  icon?: string | null
  dropdown?: NavItem[]
  subDropdown?: NavItem[]
  id?: string | null
}

interface MobileNavbarProps {
  className?: string
  navData: NavItem[]
}

// Helper function to get icon component from string
const getIconComponent = (iconString?: string | null) => {
  if (!iconString) return null

  // Remove 'LucideIcons.' prefix and get the icon name
  const iconName = iconString.replace('LucideIcons.', '')

  // Get the icon component from LucideIcons
  return (LucideIcons as any)[iconName] || null
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({ className = '', navData }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [expandedSubItems, setExpandedSubItems] = useState<Set<string>>(new Set())
  const [expandedSubSubItems, setExpandedSubSubItems] = useState<Set<string>>(new Set())
  const menuRef = useRef<HTMLDivElement>(null)
  const { currentLanguage, setLanguage } = useLanguage()

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setExpandedItems(new Set())
      setExpandedSubItems(new Set())
      setExpandedSubSubItems(new Set())
    }
  }

  const toggleItem = (itemId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  const toggleSubItem = (itemId: string) => {
    const newExpanded = new Set(expandedSubItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedSubItems(newExpanded)
  }

  const toggleSubSubItem = (itemId: string) => {
    const newExpanded = new Set(expandedSubSubItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedSubSubItems(newExpanded)
  }

  const renderMobileNavItem = (item: NavItem, level: number = 0) => {
    const hasChildren = item.dropdown && item.dropdown.length > 0
    const hasSubChildren = item.subDropdown && item.subDropdown.length > 0
    const isExpanded = expandedItems.has(item.name)
    const isSubExpanded = expandedSubItems.has(item.name)
    const isSubSubExpanded = expandedSubSubItems.has(item.name)
    const IconComponent = getIconComponent(item.icon)

    const levelPadding = level * 16 // 16px per level

    return (
      <div key={item.name} className="w-full">
        <div
          className={`flex items-center justify-between w-full px-4 py-3 text-sm transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
            level > 0 ? 'border-l-2 border-gray-200 dark:border-gray-700' : ''
          }`}
          style={{ paddingLeft: `${16 + levelPadding}px` }}
        >
          <div className="flex items-center gap-3 flex-1">
            {IconComponent && <IconComponent className="w-4 h-4 flex-shrink-0" />}
            {item.path ? (
              <Link href={item.path} className="flex-1" onClick={() => setIsOpen(false)}>
                {item.name}
              </Link>
            ) : (
              <span className="flex-1">{item.name}</span>
            )}
          </div>
          {(hasChildren || hasSubChildren) && (
            <button
              onClick={() => {
                if (level === 0) toggleItem(item.name)
                else if (level === 1) toggleSubItem(item.name)
                else if (level === 2) toggleSubSubItem(item.name)
              }}
              className="ml-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              {level === 0 ? (
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                />
              ) : (
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${isSubExpanded || isSubSubExpanded ? 'rotate-90' : ''}`}
                />
              )}
            </button>
          )}
        </div>

        {/* Level 1 Dropdown */}
        {hasChildren && level === 0 && isExpanded && (
          <div className="w-full">
            {item.dropdown!.map((child) => renderMobileNavItem(child, 1))}
          </div>
        )}

        {/* Level 2 Dropdown */}
        {hasSubChildren && level === 1 && isSubExpanded && (
          <div className="w-full">
            {item.subDropdown!.map((child) => renderMobileNavItem(child, 2))}
          </div>
        )}

        {/* Level 3 Dropdown */}
        {hasSubChildren && level === 2 && isSubSubExpanded && (
          <div className="w-full">
            {item.subDropdown!.map((child) => renderMobileNavItem(child, 3))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div ref={menuRef} className={`lg:hidden ${className}`}>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden mobile-menu-overlay">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute top-0 right-0 w-80 h-full bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto">
                <nav className="py-2">{navData.map((item) => renderMobileNavItem(item))}</nav>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Language:</span>
                  <LanguageTranslator
                    className="ml-2"
                    variant="mobile"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
