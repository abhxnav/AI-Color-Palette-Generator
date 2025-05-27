import { supabaseClient } from '@/lib/supabase/client'

export const getSession = async () => {
  const { data, error } = await supabaseClient.auth.getSession()

  if (error) {
    console.error('Error getting session: ', error.message)
    throw new Error('Failed to fetch session')
  }

  return data.session
}

export const getCurrentUser = async () => {
  const { data, error } = await supabaseClient.auth.getUser()

  if (error) {
    console.error('Error getting current user: ', error.message)
    throw new Error('Failed to fetch current user')
  }

  return data.user
}
