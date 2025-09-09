import { EntityType, formatAdminURL } from '@payloadcms/ui/shared'
import { FC } from 'react'
import { getTranslation, I18nClient } from '@payloadcms/translations'
import { Card } from '@payloadcms/ui'
import Link from 'next/link'
import { BasePayload, CollectionSlug, StaticLabel } from 'payload'

import { adminGroups } from '@/utils/adminGroups'
import { FeatureCard } from '../DashboardFeatureCard'

type Props = {
  adminRoute: string
  label: string
  i18n: I18nClient
  entities: {
    label: StaticLabel
    slug: string
    type: EntityType
  }[]
  payload: BasePayload
}

export const DashboardGroup: FC<Props> = async ({
  label: groupLabel,
  adminRoute,
  i18n,
  entities,
  payload,
}) => {
  const getCounts = async () => {
    const docCounts: Record<string, number> = {}
    for (let i = 0; i < entities.length; i++) {
      const slug = entities[i].slug as CollectionSlug
      const { totalDocs } = await payload.count({ collection: slug })
      docCounts[slug] = totalDocs
    }
    return docCounts
  }

  const isFeaturedGroup = groupLabel === adminGroups.featured
  let counts: Record<string, number>

  if (isFeaturedGroup) {
    counts = await getCounts()
  }

  return (
    <div className="mb-8">
      <p className="uppercase font-mono tracking-wider text-sm text-gray-600 mb-4">{groupLabel}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {entities.map(({ slug, type, label }, entityIndex) =>
          isFeaturedGroup ? (
            <FeatureCard
              key={entityIndex}
              title={getTranslation(label, i18n)}
              href={formatAdminURL({
                adminRoute,
                path: type === EntityType.collection ? `/collections/${slug}` : `/globals/${slug}`,
              })}
              Link={Link}
              count={counts[slug] ?? 0}
            />
          ) : (
            <Card
              key={entityIndex}
              title={getTranslation(label, i18n)}
              href={formatAdminURL({
                adminRoute,
                path: type === EntityType.collection ? `/collections/${slug}` : `/globals/${slug}`,
              })}
              Link={Link}
            />
          ),
        )}
      </div>
    </div>
  )
}
