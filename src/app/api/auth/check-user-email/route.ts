import { supabaseAdmin } from '@/lib/supabase/client'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  const { email } = await req.json()

  const { data, error } = await supabaseAdmin.auth.admin.listUsers({})

  if (error) {
    console.error('Error listing users:', error.message)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }

  const user = data.users.find((u) => u.email === email)

  return NextResponse.json({
    user: user
      ? {
          id: user.id,
          email: user.email,
          provider: user.app_metadata?.provider,
        }
      : null,
  })
}
