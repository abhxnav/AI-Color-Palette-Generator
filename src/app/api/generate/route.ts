import { envConfig } from '@/envConfig'
import { NextRequest, NextResponse } from 'next/server'

const { openRouter } = envConfig

export const POST = async (req: NextRequest) => {
  try {
    const { inputPrompt } = await req.json()

    const requestBody = {
      model: 'deepseek/deepseek-prover-v2:free',
      messages: [
        {
          role: 'system',
          content: `You are an expert color theorist and UI designer with deep knowledge of web and app design. I will give you a description of a product, brand, mood, or theme. Based on that, you must generate a precise and modern color palette for digital interfaces. Always reply using this exact format - 
          Primary: {color}, Secondary: {color}, Neutral Light: {color}, Neutral Dark: {color}, Accent: {color}, Semantic/Error: {color}, Warning/Info: {color}.
          Use hex codes only. Do not include any explanations, text, or extra information — only the color values in the exact format above.`,
        },
        {
          role: 'user',
          content: inputPrompt,
        },
      ],
    }

    const userRequest = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + openRouter.apiKey!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    )

    const userRequestResponse = await userRequest.json()

    return NextResponse.json({
      error: null,
      colors: userRequestResponse?.choices[0]?.message?.content,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Error generating palette', colors: [] })
  }
}
