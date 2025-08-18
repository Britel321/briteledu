import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { Card } from '../../components/Card'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: SerializedEditorState
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  if (!docs || docs.length === 0) {
    return null
  }

  return (
    <div className={clsx('w-full', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {docs.map((doc, index) => {
          if (typeof doc === 'string') return null

          return (
            <div key={index} className="group">
              <Card
                doc={doc}
                relationTo="posts"
                showCategories
                className="h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
