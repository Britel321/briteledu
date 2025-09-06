import Image from 'next/image'

export const Logo = () => {
  return (
    <span style={{ position: 'relative', width: '256px', height: '100px' }}>
      <Image src="/briteledu-logo.png" alt="" fill />
    </span>
  )
}

export const Icon = () => {
  return (
    <span style={{ position: 'relative', width: '60px', height: '60px' }}>
      <Image src="/briteledu-small-logo.png" alt="" fill />
    </span>
  )
}
