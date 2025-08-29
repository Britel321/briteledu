import type { JourneyWithUsBlock as JourneyWithUsBlockProps } from 'src/payload-types'
import { CustomType1 } from './Component.Client'
import React from 'react'

type Props = {
  className?: string
} & JourneyWithUsBlockProps

export const JourneyWithUsBlock: React.FC<Props> = ({
  className,
  heading,
  subheading,
  leftSectionTitle,
  leftSectionDescription,
  ctaButtonText,
  ctaButtonUrl,
  services,
  autoSlide = true,
  slideInterval = 5,
  style = 'default',
  content,
}) => {
  return (
    <div className={className}>
      <CustomType1
        heading={heading}
        subheading={subheading}
        leftSectionTitle={leftSectionTitle}
        leftSectionDescription={leftSectionDescription}
        ctaButtonText={ctaButtonText}
        ctaButtonUrl={ctaButtonUrl}
        services={services}
        autoSlide={autoSlide || undefined}
        slideInterval={slideInterval || undefined}
        style={style}
        content={content}
      />
    </div>
  )
}
