import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/supabase/types'
import { envConfig } from '@/envConfig'

const { supabase } = envConfig

export const supabaseClient = createClient<Database>(
  supabase.url,
  supabase.publicKey
)

export const supabaseAdmin = createClient<Database>(
  supabase.url,
  supabase.serviceRoleKey
)
