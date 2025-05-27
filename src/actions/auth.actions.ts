import { supabaseClient } from '@/lib/supabase/client'

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabaseClient.auth.signUp({ email, password })

  if (error) {
    console.error('Error signing up:', error.message)
    throw new Error('Failed to sign up. Please try again!')
  }

  return data
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Error signing in:', error.message)
    throw new Error('Failed to sign in. Please try again!')
  }

  return data
}

export const signInWithGoogle = async () => {
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
  })

  if (error) {
    console.error('Error signing in with Google:', error.message)
    throw new Error('Failed to sign in with Google. Please try again!')
  }

  return data
}

export const signOut = async () => {
  const { error } = await supabaseClient.auth.signOut()

  if (error) {
    console.error('Error signing out:', error.message)
    throw new Error('Failed to sign out. Please try again!')
  }
}
