import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cleanUpColors = (rawColors: string) => {
  const cleanColors =
    rawColors
      ?.match(
        /(Background|Surface|Primary Text|Secondary Text|Accent\/Button|Hover\/Focus|Border\/Dividers|Semantic\/Error|Warning\/Info):\s?#?[0-9A-Fa-f]{6}/g
      )
      ?.join(', ') ?? ''

  return cleanColors
}
