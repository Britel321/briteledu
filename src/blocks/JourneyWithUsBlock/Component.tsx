import type { BannerBlock as BannerBlockProps } from 'src/payload-types'
import { CustomType1 } from './Component.Client'

type Props = {
  className?: string
} & BannerBlockProps

export const JourneyWithUsBlock: React.FC<Props> = () => {
  return (
    <div className="w-full">
      <CustomType1 />
    </div>
  )
}
