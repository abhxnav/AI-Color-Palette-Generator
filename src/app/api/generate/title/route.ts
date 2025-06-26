import { envConfig } from '@/envConfig'
import { NextRequest, NextResponse } from 'next/server'

const { openRouter } = envConfig

export const POST = async (req: NextRequest) => {
  try {
    const { inputPrompt } = await req.json()

    if (!inputPrompt || inputPrompt.trim().length < 5) {
      return NextResponse.json(
        {
          error: true,
          errorMessage: 'Prompt is too short or missing.',
        },
        { status: 400 }
      )
    }

    const requestBody = {
      model: openRouter.aiModel,
      messages: [
        {
          role: 'system',
          content: `You are a creative AI assistant. I will give you a short product or brand description. The description is basically for an AI to generate color palette for a digital interface. Return short, 2-4 words, and relevant title breifly describing the prompt. One line only. No quotes or markdown or code formatting.`,
        },
        {
          role: 'user',
          content: inputPrompt,
        },
      ],
    }

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openRouter.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(errText)
    }

    const json = await res.json()

    return NextResponse.json({
      error: false,
      title: json?.choices[0]?.message?.content?.trim(),
    })
  } catch (err: unknown) {
    let errorMessage = 'Unknown error occurred while generating color palette.'

    if (err instanceof Error) {
      errorMessage = err.message
    } else if (typeof err === 'string') {
      errorMessage = err
    }

    return NextResponse.json(
      {
        error: true,
        errorMessage: errorMessage,
      },
      { status: 500 }
    )
  }
}
