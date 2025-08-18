'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight } from 'lucide-react'
import * as LucideIcons from 'lucide-react'

// Updated interface to match the Header config structure
interface NavItem {
  name: string
  path: string
  icon?: string | null
  dropdown?: NavItem[]
  subDropdown?: NavItem[]
  id?: string | null
}

interface DesktopNavbarProps {
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

export const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ className = '', navData }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null)
  const [activeSubSubDropdown, setActiveSubSubDropdown] = useState<string | null>(null)
  const navbarRef = useRef<HTMLDivElement>(null)
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
        setActiveSubDropdown(null)
        setActiveSubSubDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current)
      }
    }
  }, [])

  const handleDropdownEnter = (itemId: string) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current)
      leaveTimeoutRef.current = null
    }
    setActiveDropdown(itemId)
    setActiveSubDropdown(null)
    setActiveSubSubDropdown(null)
  }

  const handleDropdownLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
      setActiveSubDropdown(null)
      setActiveSubSubDropdown(null)
    }, 100) // Small delay to allow moving to dropdown
  }

  const handleSubDropdownEnter = (itemId: string) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current)
      leaveTimeoutRef.current = null
    }
    setActiveSubDropdown(itemId)
    setActiveSubSubDropdown(null)
  }

  const handleSubDropdownLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveSubDropdown(null)
      setActiveSubSubDropdown(null)
    }, 100)
  }

  const handleSubSubDropdownEnter = (itemId: string) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current)
      leaveTimeoutRef.current = null
    }
    setActiveSubSubDropdown(itemId)
  }

  const handleSubSubDropdownLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveSubSubDropdown(null)
    }, 100)
  }

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const hasChildren = item.dropdown && item.dropdown.length > 0
    const hasSubChildren = item.subDropdown && item.subDropdown.length > 0
    const isActive = activeDropdown === item.name
    const isSubActive = activeSubDropdown === item.name
    const isSubSubActive = activeSubSubDropdown === item.name
    const IconComponent = getIconComponent(item.icon)

    const baseClasses =
      level === 0
        ? 'flex items-center justify-between px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-white/10 rounded-md'
        : 'flex items-center justify-between px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-gray-100 hover:text-black dark:hover:bg-gray-800'
    const activeClasses = level === 0 ? '' : ''
    const levelClasses = level === 0 ? 'relative' : level === 1 ? 'relative' : 'relative'

    return (
      <div
        key={item.name}
        className={`${levelClasses} ${level === 0 ? 'inline-block' : 'w-full'}`}
        onMouseEnter={() => {
          if (level === 0 && hasChildren) handleDropdownEnter(item.name)
          else if (level === 1 && hasSubChildren) handleSubDropdownEnter(item.name)
          else if (level === 2 && hasSubChildren) handleSubSubDropdownEnter(item.name)
        }}
        onMouseLeave={() => {
          if (level === 0) handleDropdownLeave()
          else if (level === 1) handleSubDropdownLeave()
          else if (level === 2) handleSubSubDropdownLeave()
        }}
      >
        <div className={`${baseClasses} ${activeClasses} ${level > 0 ? 'w-full' : ''}`}>
          <div className="flex items-center gap-2 flex-1">
            {IconComponent && <IconComponent className="w-4 h-4" />}
            {item.path ? (
              <Link href={item.path} className="flex-1">
                {item.name}
              </Link>
            ) : (
              <span className="flex-1">{item.name}</span>
            )}
          </div>
          {(hasChildren || hasSubChildren) && (
            <div className="ml-2 p-1">
              {level === 0 ? (
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isActive ? 'rotate-180' : ''}`}
                />
              ) : (
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    isSubActive || isSubSubActive ? 'rotate-90' : ''
                  }`}
                />
              )}
            </div>
          )}
        </div>

        {/* Level 1 Dropdown */}
        {hasChildren && level === 0 && isActive && (
          <div
            className="absolute top-full left-0 mt-1 w-64 bg-[#1D40AF] shadow-lg z-50"
            onMouseEnter={() => handleDropdownEnter(item.name)}
            onMouseLeave={() => handleDropdownLeave()}
          >
            {item.dropdown!.map((child) => renderNavItem(child, 1))}
          </div>
        )}

        {/* Level 2 Dropdown */}
        {hasSubChildren && level === 1 && isSubActive && (
          <div
            className="absolute top-0 left-full ml-1 w-64 bg-[#1D40AF] shadow-lg z-50"
            onMouseEnter={() => handleSubDropdownEnter(item.name)}
            onMouseLeave={() => handleSubDropdownLeave()}
          >
            {item.subDropdown!.map((child) => renderNavItem(child, 2))}
          </div>
        )}

        {/* Level 3 Dropdown */}
        {hasSubChildren && level === 2 && isSubSubActive && (
          <div
            className="absolute top-0 left-full ml-1 w-64 bg-[#1D40AF] shadow-lg z-50"
            onMouseEnter={() => handleSubSubDropdownEnter(item.name)}
            onMouseLeave={() => handleSubSubDropdownLeave()}
          >
            {item.subDropdown!.map((child) => renderNavItem(child, 3))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div ref={navbarRef} className={`relative ${className}`}>
      <nav className="flex items-center justify-start">
        <div className="flex items-center space-x-1">
          {navData.map((item) => renderNavItem(item))}
        </div>
      </nav>
    </div>
  )
}
