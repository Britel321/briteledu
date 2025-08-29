import { notFound } from 'next/navigation'

type Args = {
  params: Promise<{
    notfound: string[]
  }>
}

export default async function CatchAll({ params }: Args) {
  const { notfound } = await params

  if (notfound.length >= 1) {
    notFound()
  }
  return null
}

export const dynamic = 'force-dynamic'
