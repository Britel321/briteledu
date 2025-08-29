import { CollectionSlug, GlobalSlug } from 'payload'
import {
  Footprints,
  Image,
  LayoutGrid,
  List,
  LucideProps,
  Smile,
  StickyNote,
  User,
} from 'lucide-react'
import { ExoticComponent } from 'react'

export const navIconMap: Partial<
  Record<CollectionSlug | GlobalSlug, ExoticComponent<LucideProps>>
> = {
  categories: List,
  media: Image,
  pages: StickyNote,
  posts: LayoutGrid,
  users: User,
  'contact-forms': User,
  header: Smile,
  footer: Footprints,
}

export const getNavIcon = (slug: string) =>
  Object.hasOwn(navIconMap, slug) ? navIconMap[slug as CollectionSlug | GlobalSlug] : undefined
