export const generateTitle = async (prompt: string) => {
  const response = await fetch('/api/generate/title', {
    method: 'POST',
    body: JSON.stringify({ inputPrompt: prompt }),
  })

  const result = await response.json()

  if (!response.ok || result.error) {
    throw new Error(result.errorMessage || 'Failed to generate title')
  }

  return result
}
