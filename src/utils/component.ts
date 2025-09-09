export const createAriaLabel = (
  action: 'next' | 'previous' | 'play' | 'pause',
  index?: number,
): string => {
  switch (action) {
    case 'next':
      return 'Next quote'
    case 'previous':
      return 'Previous quote'
    case 'play':
      return 'Play carousel'
    case 'pause':
      return 'Pause carousel'
    default:
      return index !== undefined ? `Go to quote ${index + 1}` : ''
  }
}

export const shouldShowNavigation = (itemsLength: number, showFeature: boolean): boolean => {
  return showFeature && itemsLength > 1
}

export const createButtonClasses = (
  backgroundColor: string,
  isDisabled: boolean = false,
): string => {
  const baseClasses =
    'p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300'
  const textColor = backgroundColor === 'dark' ? 'text-gray-900' : 'text-gray-900'
  const disabledClasses = isDisabled ? 'opacity-50 cursor-not-allowed' : ''

  return `${baseClasses} ${textColor} ${disabledClasses}`.trim()
}

export const validateQuoteData = (quotes: any[]): boolean => {
  return quotes && quotes.length > 0
}
