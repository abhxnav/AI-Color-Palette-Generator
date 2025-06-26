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
          content: `You are an expert color theorist and UI designer with deep knowledge of web and app design. I will give you a short product or brand description. Based on that, you must generate a precise and modern color palette for digital interfaces. Return the output as a single plain unformatted string, in this exact format only:

          Background: {hex}, Surface (cards): {hex}, Primary Text: {hex}, Secondary Text: {hex}, Accent/Button: {hex}, Hover/Focus: {hex}, Border/Dividers: {hex}, Semantic/Error: {hex}, Warning/Info: {hex}
          
          Do not return code blocks (no backticks, triple backticks, or markdown)
          Do not include newlines (\n), tabs, or indentation
          Do not include quotes, arrays, brackets, or any JSON formatting
          Do not add language tags like plaintext
          Do not return anything before or after the color string — only the strict format above
          Do not include any metadata about the response content
          Only return the exact format, nothing more, nothing less.`,
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

    if (!userRequest.ok) {
      const errText = await userRequest.text()
      throw new Error(errText)
    }

    const userRequestResponse = await userRequest.json()

    return NextResponse.json({
      error: false,
      colors: userRequestResponse?.choices[0]?.message?.content,
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
