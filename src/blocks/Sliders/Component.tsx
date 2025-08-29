import React from 'react'
import SliderType1 from './variants/SliderType1'

const sliderVariants = {
  sliderType1: SliderType1,
}

interface SliderBlockProps {
  type: keyof typeof sliderVariants | 'none'
  [key: string]: unknown
}

export const SliderBlock = (props: SliderBlockProps) => {
  const { type } = props

  if (type === 'none') {
    return null
  }

  const SelectedSliderComponent = sliderVariants[type as keyof typeof sliderVariants] || null

  return <>{SelectedSliderComponent ? <SelectedSliderComponent {...(props as any)} /> : null}</>
}
