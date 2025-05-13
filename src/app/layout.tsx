import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '@/app/globals.css'

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'mosAIc - AI Color Palette Generator',
  description: 'Generate color palettes based on prompts using AI.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>{children}</body>
    </html>
  )
}
