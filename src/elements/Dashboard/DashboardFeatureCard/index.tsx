'use client'
import type { ElementType } from 'react'

import React from 'react'

import { Button } from '@payloadcms/ui'

export type Props = {
  actions?: React.ReactNode
  buttonAriaLabel?: string
  href?: string
  id?: string
  Link?: ElementType
  onClick?: () => void
  title: string
  titleAs?: ElementType
  count?: number
}

export const FeatureCard: React.FC<Props> = (props) => {
  const { id, actions, buttonAriaLabel, href, Link, onClick, title, titleAs, count } = props

  const hasOnClick = onClick || href
  const Tag = titleAs ?? 'div'

  return (
    <div
      className={`
        bg-gray-100 w-full min-h-16 relative 
        transition-all duration-100 ease-out
        flex flex-col justify-between self-start gap-6
        rounded-md border border-gray-200 p-8
        ${hasOnClick ? 'cursor-pointer hover:border-gray-300 hover:shadow-md' : ''}
      `}
      id={id}
    >
      <Tag className="text-sm font-semibold leading-tight w-full my-1 text-gray-700">{title}</Tag>

      {actions && (
        <div className="relative z-[2] inline-flex">
          <div className="[&_.btn]:m-0 [&_.btn]:flex-shrink-0 [&_.btn__icon]:border [&_.btn__icon]:border-gray-300 [&_.btn__icon]:transition-all [&_.btn__icon]:duration-100 [&_.btn__icon]:ease-out hover:[&_.btn__icon]:border-gray-500 hover:[&_.btn__icon]:bg-white hover:[&_.btn__icon]:text-current hover:[&_.btn__icon]:shadow-sm">
            {actions}
          </div>
        </div>
      )}

      {hasOnClick && (
        <Button
          aria-label={buttonAriaLabel}
          buttonStyle="none"
          className="z-[1] absolute top-0 left-0 w-full h-full m-0"
          el="link"
          Link={Link}
          onClick={onClick}
          to={href}
        />
      )}

      <h2 className="font-normal">{count ?? 0}</h2>
    </div>
  )
}
