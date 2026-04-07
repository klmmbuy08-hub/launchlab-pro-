import { NextRequest, NextResponse } from 'next/server'
import { getLaunchById } from '@/lib/db/launches'

// SSE (Server-Sent Events) para progreso en tiempo real
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Obtener lanzamiento
        const launch = await getLaunchById(params.id)

        // Función para enviar evento
        const sendEvent = (event: string, data: any) => {
          controller.enqueue(
            encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
          )
        }

        // FASE 1: CEO genera primero (2 min simulación)
        sendEvent('progress', { agent: 'ceo', status: 'generating', progress: 0 })

        // Simular progreso suave
        for (let i = 0; i <= 100; i += 10) {
          await new Promise((resolve) => setTimeout(resolve, 300))
          sendEvent('progress', { agent: 'ceo', status: 'generating', progress: i })
        }

        sendEvent('progress', { agent: 'ceo', status: 'completed', progress: 100 })

        // FASE 2: Otros agentes en paralelo (3 min simulación)
        const otherAgents = ['cmo', 'sales', 'designer', 'voice', 'cdo', 'coo']

        for (const agent of otherAgents) {
          sendEvent('progress', { agent, status: 'generating', progress: 0 })
        }

        // Simular progreso paralelo
        for (let i = 0; i <= 100; i += 10) {
          await new Promise((resolve) => setTimeout(resolve, 400))
          for (const agent of otherAgents) {
            sendEvent('progress', { agent, status: 'generating', progress: i })
          }
        }

        for (const agent of otherAgents) {
          sendEvent('progress', { agent, status: 'completed', progress: 100 })
        }

        // Finalizar
        sendEvent('complete', { success: true })
        controller.close()
      } catch (error: any) {
        controller.enqueue(
          encoder.encode(
            `event: error\ndata: ${JSON.stringify({ error: error.message })}\n\n`
          )
        )
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
