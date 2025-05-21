'use client'

import { useCallback } from 'react'
import { toast } from 'sonner'

const ColorPalette = ({
  colorPalette,
}: {
  colorPalette: PaletteColor[] | null
}) => {
  const handleCopy = useCallback((hex: string) => {
    navigator.clipboard.writeText(hex)
    toast.success('Copied to clipboard', {
      description: <span className="text-muted-foreground">{hex}</span>,
    })
  }, [])

  if (!colorPalette) {
    return (
      <div className="size-full border-2 rounded-xl flex items-center justify-center border-black/40">
        Generate a palette
      </div>
    )
  }

  return (
    <div className="size-full border-2 rounded-xl flex items-stretch border-black/40 overflow-hidden">
      {colorPalette.map(({ label, hex }, index) => {
        const isFirst = index === 0
        const isLast = index === colorPalette.length - 1
        const roundedClass = isFirst
          ? 'rounded-l-xl'
          : isLast
          ? 'rounded-r-xl'
          : ''

        return (
          <div
            key={label}
            className={`relative flex-1 flex flex-col items-center justify-end cursor-pointer group ${roundedClass}`}
            style={{ backgroundColor: hex }}
            onClick={() => handleCopy(hex)}
          >
            {/* Center hex on hover */}
            <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="bg-black/60 py-2 px-4 rounded-full">{hex}</span>
            </span>

            {/* Label and hex at bottom */}
            <div className="w-full text-center text-white text-sm bg-black/60 py-1">
              <div>{label}</div>
              <div className="text-xs font-mono">{hex}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ColorPalette
