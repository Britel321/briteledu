import Image from 'next/image'

export const BeforeLogin = () => {
  return (
    <aside className="absolute top-0 left-0 w-1/2 h-full border-r-2 border-gray-200 md:w-full md:z-[-1] md:border-r-0">
      <div className="relative w-full h-full md:opacity-75">
        <Image src="/image-login1.webp" alt="" fill />
      </div>
    </aside>
  )
}
