import { Database } from '@/lib/supabase/types'

declare type PaletteRole =
  | 'Background'
  | 'Surface (cards)'
  | 'Primary Text'
  | 'Secondary Text'
  | 'Accent/Button'
  | 'Hover/Focus'
  | 'Border/Dividers'
  | 'Semantic/Error'
  | 'Warning/Info'

declare type PaletteColor = {
  label: PaletteRole
  hex: string
}

declare type SavedPalette = Database['public']['Tables']['saved']['Row']
declare type NewSavedPalette = Omit<SavedPalette, 'id' | 'created_at'>
