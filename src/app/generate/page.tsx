'use client'

import { Button, Logo } from '@/components'
import { Textarea } from '@/components/ui'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

const Generate = () => {
  const [prompt, setPrompt] = useState<string>('')
  const [loading, setLoading] = useState(false)

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="min-w-[300px] w-[25vw] h-screen flex flex-col gap-10 p-7">
        <Logo className="text-5xl!" />
        <div className="flex flex-col gap-2">
          <Textarea
            className="min-h-60"
            placeholder="Describe your vision here to generate a color palette"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
          />
          <Button
            className="bg-primary text-primary-foreground font-semibold px-6 py-2 rounded-full cursor-pointer hover:brightness-90 mt-1"
            disabled={loading}
          >
            {loading ? (
              <div className="flex gap-2 items-center justify-center">
                <Loader2 size={20} className="animate-spin" />
                <p>Generating...</p>
              </div>
            ) : (
              <div>
                Generate <span className="ml-1">&rarr;</span>
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* Divider */}
      <div className="w-0.5 h-[90vh] bg-border mt-[5vh]" />

      {/* Palette */}
      <div className="w-full h-screen p-7">
        <div className="size-full border-2 rounded-xl flex items-center justify-center border-border">
          Palette
        </div>
      </div>
    </div>
  )
}

export default Generate
