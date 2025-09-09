import Image from 'next/image'

export const Logo = () => {
  return (
    <span className="relative w-64 h-25">
      <Image src="/briteledu-logo.png" alt="" fill />
    </span>
  )
}

export const Icon = () => {
  return (
    <span className="relative w-15 h-15">
      <Image src="/briteledu-small-logo.png" alt="" fill />
    </span>
  )
}
