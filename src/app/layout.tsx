import type { Metadata } from 'next'
import { Noto_Sans, Roboto } from 'next/font/google'
import '@/app/globals.css'

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
})

const noto = Noto_Sans({
  variable: '--font-noto',
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
      <body
        className={`${noto.variable} ${roboto.variable} antialiased bg-background`}
      >
        {children}
      </body>
    </html>
  )
}
