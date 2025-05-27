import { supabaseClient } from '@/lib/supabase/client'

export const savePalette = async (
  userId: string,
  title: string,
  prompt: string,
  colors: PaletteColor[]
) => {
  const { error } = await supabaseClient
    .from('palettes')
    .insert({ user_id: userId, title, prompt, colors })

  if (error) {
    console.error('Error saving color palette: ', error.message)
    throw new Error('Failed to save color palette. Please try again!')
  }
}

export const getSavedPalette = async (userId: string) => {
  const { data, error } = await supabaseClient
    .from('palettes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error getting saved palettes: ', error.message)
    throw new Error('Failed to fetch saved palettes. Please refresh the page!')
  }

  return data
}

export const deletePalette = async (paletteId: string) => {
  const { error } = await supabaseClient
    .from('palettes')
    .delete()
    .eq('id', paletteId)

  if (error) {
    console.error('Error deleting color palette: ', error.message)
    throw new Error('Failed to delete color palette. Please try again!')
  }
}
