import Image from 'next/image'

export const DashboardBanner = () => {
  return (
    <div className="w-full h-[calc(200px-var(--app-header-height))]">
      <div className="absolute top-0 left-0 w-full min-h-[200px]">
        <div className="relative w-full h-[200px]">
          <Image src={'/image-banner1.webp'} alt="" fill />
        </div>
      </div>
    </div>
  )
}
