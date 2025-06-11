export const checkExistingUser = async (email: string) => {
  const res = await fetch('/api/auth/check-user-email', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })

  if (!res.ok) throw new Error('Failed to check for existing user')

  const { user } = await res.json()

  return user
}
