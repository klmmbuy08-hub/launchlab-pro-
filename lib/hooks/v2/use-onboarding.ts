'use client'

import { useState, useCallback } from 'react'
import { OnboardingData, OnboardingProgress } from '@/lib/types/v2/onboarding'

const TOTAL_STEPS = 4

export function useOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({})
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  const updateData = useCallback((newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }))
  }, [])

  const nextStep = useCallback(() => {
    if (currentStep < TOTAL_STEPS) {
      setCompletedSteps((prev) => [...prev, `step-${currentStep}`])
      setCurrentStep((prev) => prev + 1)
    }
  }, [currentStep])

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep])

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      setCurrentStep(step)
    }
  }, [])

  const complete = useCallback(async () => {
    try {
      // Save onboarding data to backend
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to complete onboarding')

      return { success: true }
    } catch (error) {
      console.error('Onboarding error:', error)
      return { success: false, error }
    }
  }, [data])

  const progress: OnboardingProgress = {
    currentStep,
    totalSteps: TOTAL_STEPS,
    completedSteps,
    data,
  }

  return {
    currentStep,
    data,
    progress,
    updateData,
    nextStep,
    prevStep,
    goToStep,
    complete,
  }
}
