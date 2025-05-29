import { cleanUpColors } from '@/lib/utils'

export const generatePaletteFromPrompt = async (prompt: string) => {
  const response = await fetch('/api/generate/palette', {
    method: 'POST',
    body: JSON.stringify({ inputPrompt: prompt }),
  })

  const result = await response.json()

  if (!response.ok || result.error) {
    throw new Error(result.errorMessage || 'Failed to generate palette')
  }

  const cleaned = cleanUpColors(result?.colors)

  const pairs = cleaned
    .split(', ')
    .map((entry: string) => entry.split(': '))
    .map(([label, hex]) => ({ label, hex }))

  return pairs
}
