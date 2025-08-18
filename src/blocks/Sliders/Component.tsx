import React from 'react'
import SliderType1 from './variants/SliderType1'

const sliderVariants = {
  sliderType1: SliderType1,
}

export const SliderBlock = (props: any) => {
  const { type } = props

  if (type === 'none') {
    return null
  }

  const SelectedSliderComponent = sliderVariants[type as keyof typeof sliderVariants] || null

  return <>{SelectedSliderComponent ? <SelectedSliderComponent {...props} /> : null}</>
}
