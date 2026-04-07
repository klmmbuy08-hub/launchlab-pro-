'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OnboardingData } from '@/lib/types/onboarding'

export function useLaunchCreation() {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [error, setError] = useState<string | null>(null)

  const createLaunch = async (data: Partial<OnboardingData>) => {
    setIsCreating(true)
    setError(null)

    try {
      // Crear lanzamiento en DB
      const response = await fetch('/api/launches/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Error creating launch')
      }

      const { launch } = await response.json()

      // Conectar a SSE para progreso en tiempo real
      const eventSource = new EventSource(`/api/launches/${launch.id}/generate`)

      eventSource.addEventListener('progress', (event: any) => {
        const data = JSON.parse(event.data)
        setProgress((prev) => ({
          ...prev,
          [data.agent]: data.progress,
        }))
      })

      eventSource.addEventListener('complete', (event: any) => {
        eventSource.close()
        setIsCreating(false)
        router.push(`/launches/${launch.id}`)
      })

      eventSource.addEventListener('error', (event: any) => {
        const data = JSON.parse(event.data)
        setError(data.error || 'Generation error')
        eventSource.close()
        setIsCreating(false)
      })

      return { success: true, launchId: launch.id }
    } catch (error: any) {
      console.error('Launch creation error:', error)
      setError(error.message)
      setIsCreating(false)
      return { success: false, error: error.message }
    }
  }

  return {
    createLaunch,
    isCreating,
    progress,
    error,
  }
}
