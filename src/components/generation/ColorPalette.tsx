'use client'

import { useCallback } from 'react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import {
  fadeInVariant,
  hoverScaleVariant,
  tapBounceVariant,
} from '@/lib/animations'
import { shimmerEffect } from '@/lib/utils'

interface PaletteColor {
  label: string
  hex: string
}

interface ColorPaletteProps {
  colorPalette: PaletteColor[] | null
  isGenerating: boolean
}

const ColorPalette = ({ colorPalette, isGenerating }: ColorPaletteProps) => {
  const handleCopy = useCallback((hex: string) => {
    navigator.clipboard.writeText(hex)
    toast.success('Copied to clipboard', {
      description: <span style={{ color: hex }}>{hex}</span>,
    })
  }, [])

  if (!colorPalette) {
    if (isGenerating) {
      return (
        <div
          className="size-full rounded-xl flex items-center justify-center text-muted-foreground"
          style={{
            backgroundImage: `url(${shimmerEffect})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            transformOrigin: 'center',
            zIndex: 1,
            overflow: 'visible',
          }}
        >
          Generating a color palette to complement your vision...
        </div>
      )
    }

    return (
      <div className="size-full rounded-xl flex items-center justify-center text-muted-foreground">
        No color palette to display
      </div>
    )
  }

  return (
    <div className="size-full rounded-xl flex items-stretch overflow-visible">
      {colorPalette.map(({ label, hex }, index) => {
        const isFirst = index === 0
        const isLast = index === colorPalette.length - 1
        const roundedColor = isFirst
          ? 'rounded-l-xl'
          : isLast
          ? 'rounded-r-xl'
          : ''
        const roundedLabel = isFirst
          ? 'rounded-bl-xl'
          : isLast
          ? 'rounded-br-xl'
          : ''

        return (
          <motion.div
            key={label}
            variants={fadeInVariant('left', 'spring', index * 0.25)}
            initial="hidden"
            animate="show"
            whileHover={hoverScaleVariant}
            whileTap={tapBounceVariant}
            className={`relative flex-1 flex flex-col items-center justify-end cursor-pointer group shadow-[2px_-2px_40px_rgba(0,0,0,0.55)] ${roundedColor}`}
            style={{
              backgroundColor: hex,
              transformOrigin: 'center',
              zIndex: 1,
              overflow: 'visible',
            }}
            onClick={() => handleCopy(hex)}
          >
            {/* Center hex on hover */}
            <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
              <span className="bg-black/60 py-2 px-4 rounded-full">{hex}</span>
            </span>

            {/* Label and hex at bottom */}
            <div
              className={`w-full text-center text-white text-sm bg-black/60 py-1 ${roundedLabel}`}
            >
              <div>{label}</div>
              <div className="text-xs font-mono">{hex}</div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default ColorPalette
