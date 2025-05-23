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

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

// Shimmer Effect
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop stop-color="#FAFAFA" offset="0%" />
      <stop stop-color="#FFB0BE" offset="70%" />
      <stop stop-color="#FFB0BE" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#FAFAFA" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.4s" repeatCount="indefinite" />
</svg>`

export const shimmerEffect = `data:image/svg+xml;base64,${toBase64(
  shimmer(1000, 1000)
)}`
