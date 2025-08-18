import * as LucideIcons from 'lucide-react'

// Types for the navbar structure
export interface NavItem {
  id: string
  label: string
  href?: string
  icon?: React.ComponentType<{ className?: string }> | null
  children?: NavItem[]
}

// Dummy data for the navbar
export const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: null,
  },
  {
    id: 'about',
    label: 'About',
    href: '/about',
    icon: LucideIcons.Info,
    children: [
      {
        id: 'our-story',
        label: 'Our Story',
        href: '/about/story',
        icon: LucideIcons.BookOpen,
      },
      {
        id: 'team',
        label: 'Our Team',
        icon: LucideIcons.Users,
        children: [
          {
            id: 'leadership',
            label: 'Leadership',
            href: '/about/team/leadership',
            icon: LucideIcons.Star,
          },
          {
            id: 'staff',
            label: 'Staff',
            href: '/about/team/staff',
            icon: LucideIcons.Users,
          },
          {
            id: 'volunteers',
            label: 'Volunteers',
            href: '/about/team/volunteers',
            icon: LucideIcons.Heart,
          },
        ],
      },
      {
        id: 'mission',
        label: 'Mission & Values',
        href: '/about/mission',
        icon: LucideIcons.Target,
      },
      {
        id: 'awards',
        label: 'Awards & Recognition',
        href: '/about/awards',
        icon: LucideIcons.Award,
      },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    href: '/services',
    icon: LucideIcons.Settings,
    children: [
      {
        id: 'consulting',
        label: 'Consulting',
        icon: LucideIcons.Building,
        children: [
          {
            id: 'strategy',
            label: 'Strategic Planning',
            href: '/services/consulting/strategy',
            icon: LucideIcons.TrendingUp,
          },
          {
            id: 'policy',
            label: 'Policy Development',
            href: '/services/consulting/policy',
            icon: LucideIcons.FileText,
          },
          {
            id: 'compliance',
            label: 'Compliance',
            href: '/services/consulting/compliance',
            icon: LucideIcons.Shield,
          },
        ],
      },
      {
        id: 'campaigns',
        label: 'Campaign Management',
        href: '/services/campaigns',
        icon: LucideIcons.Target,
      },
      {
        id: 'research',
        label: 'Research & Analysis',
        href: '/services/research',
        icon: LucideIcons.BookOpen,
      },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    href: '/resources',
    icon: LucideIcons.FileText,
    children: [
      {
        id: 'publications',
        label: 'Publications',
        href: '/resources/publications',
        icon: LucideIcons.FileText,
      },
      {
        id: 'events',
        label: 'Events',
        icon: LucideIcons.Calendar,
        children: [
          {
            id: 'upcoming',
            label: 'Upcoming Events',
            href: '/resources/events/upcoming',
            icon: LucideIcons.Calendar,
          },
          {
            id: 'past',
            label: 'Past Events',
            href: '/resources/events/past',
            icon: LucideIcons.Calendar,
          },
          {
            id: 'webinars',
            label: 'Webinars',
            href: '/resources/events/webinars',
            icon: LucideIcons.Globe,
          },
        ],
      },
      {
        id: 'news',
        label: 'News & Updates',
        href: '/resources/news',
        icon: LucideIcons.FileText,
      },
    ],
  },
  {
    id: 'translator',
    label: 'Translator',
    href: '/translator',
    icon: LucideIcons.Languages,
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '/contact',
    icon: LucideIcons.Phone,
    children: [
      {
        id: 'locations',
        label: 'Our Locations',
        href: '/contact/locations',
        icon: LucideIcons.MapPin,
      },
      {
        id: 'email',
        label: 'Email Us',
        href: '/contact/email',
        icon: LucideIcons.Mail,
      },
      {
        id: 'phone',
        label: 'Call Us',
        href: '/contact/phone',
        icon: LucideIcons.Phone,
      },
    ],
  },
]
