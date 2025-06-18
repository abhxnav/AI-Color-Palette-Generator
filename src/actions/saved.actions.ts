import { supabaseClient } from '@/lib/supabase/client'
import { NewSavedPalette } from '@/types/types'

export const savePalette = async (palette: NewSavedPalette) => {
  const { data, error } = await supabaseClient
    .from('saved')
    .insert([palette])
    .select()
    .single()

  if (error) {
    console.error('Error saving palette: ', error.message)
    throw new Error('Failed to save palette. Please try again!')
  }

  return data
}

export const getSavedPalettes = async (userId: string) => {
  const { data, error } = await supabaseClient
    .from('saved')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error getting saved palettes: ', error.message)
    throw new Error('Failed to fetch saved palettes. Please refresh the page!')
  }

  return data
}

export const getPaletteById = async (paletteId: string) => {
  const { data, error } = await supabaseClient
    .from('saved')
    .select('*')
    .eq('id', paletteId)
    .single()

  if (error) {
    console.error('Error getting saved palette: ', error.message)
    throw new Error('Failed to fetch saved palette. Please try again!')
  }

  return data
}

export const deletePalette = async (paletteId: string) => {
  const { error } = await supabaseClient
    .from('saved')
    .delete()
    .eq('id', paletteId)

  if (error) {
    console.error('Error deleting color palette: ', error.message)
    throw new Error('Failed to delete color palette. Please try again!')
  }
}

export const updatePaletteTitle = async (
  paletteId: string,
  newTitle: string
) => {
  const { data, error } = await supabaseClient
    .from('saved')
    .update({ title: newTitle })
    .eq('id', paletteId)
    .select()
    .single()

  if (error) {
    console.error('Error updating palette title: ', error.message)
    throw new Error('Failed to update palette title. Please try again!')
  }

  return data
}
