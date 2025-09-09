export type BackgroundColor = 'light' | 'dark' | 'blue' | 'white'

export const getBackgroundClasses = (backgroundColor: BackgroundColor = 'light'): string => {
  const bgClasses: Record<BackgroundColor, string> = {
    light: 'bg-gray-50',
    dark: 'bg-gray-900 text-white',
    blue: 'bg-blue-50',
    white: 'bg-white',
  }
  return bgClasses[backgroundColor]
}

export const getTextClasses = (backgroundColor: BackgroundColor = 'light'): string => {
  const textClasses: Record<BackgroundColor, string> = {
    light: 'text-gray-900',
    dark: 'text-white',
    blue: 'text-gray-900',
    white: 'text-gray-900',
  }
  return textClasses[backgroundColor]
}

export const getDotClasses = (
  backgroundColor: BackgroundColor,
  isActive: boolean,
  isDisabled: boolean = false,
): string => {
  const baseClasses = 'w-3 h-3 rounded-full transition-all duration-300'

  if (isDisabled) {
    return `${baseClasses} opacity-50 cursor-not-allowed`
  }

  if (isActive) {
    const activeColor = backgroundColor === 'dark' ? 'bg-white' : 'bg-blue-600'
    return `${baseClasses} ${activeColor} scale-125`
  }

  const inactiveColor = backgroundColor === 'dark' ? 'bg-white/30' : 'bg-gray-300'
  return `${baseClasses} ${inactiveColor} hover:scale-110`
}
