'use client'

import { useState, useCallback } from 'react'
import { OnboardingData, OnboardingProgress, OnboardingValidation } from '@/lib/types/onboarding'

const TOTAL_STEPS = 4

const DEFAULT_ONBOARDING_DATA: Partial<OnboardingData> = {
  tone: 'inspirational',
  copyStyle: 'short_concise',
  designStyle: 'vibrant',
  riskTolerance: 'balanced',
  hasTestimonials: false,
  hasPreviousLaunches: false,
  completedSteps: [],
}

export function useOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<Partial<OnboardingData>>({
    ...DEFAULT_ONBOARDING_DATA,
    mode: 'quick_start',
    startedAt: new Date().toISOString(),
  })

  // Validación por step
  const validateStep = useCallback((step: number, stepData: Partial<OnboardingData>): OnboardingValidation => {
    const errors: { field: string; message: string }[] = []

    if (step === 1) {
      // Básico
      if (!stepData.productName || stepData.productName.trim().length < 3) {
        errors.push({ field: 'productName', message: 'El nombre debe tener al menos 3 caracteres' })
      }
      if (!stepData.productType) {
        errors.push({ field: 'productType', message: 'Selecciona el tipo de producto' })
      }
      if (!stepData.price || stepData.price < 0) {
        errors.push({ field: 'price', message: 'El precio debe ser mayor a 0' })
      }
      if (!stepData.targetAudience || stepData.targetAudience.trim().length < 10) {
        errors.push({ field: 'targetAudience', message: 'Describe tu audiencia (mínimo 10 caracteres)' })
      }
    }

    if (step === 2) {
      // Estrategia
      if (!stepData.currentAudience) {
        errors.push({ field: 'currentAudience', message: 'Selecciona el tamaño de tu audiencia actual' })
      }
      if (!stepData.budget || stepData.budget < 0) {
        errors.push({ field: 'budget', message: 'El presupuesto debe ser mayor o igual a 0' })
      }
      if (!stepData.experienceLevel) {
        errors.push({ field: 'experienceLevel', message: 'Selecciona tu nivel de experiencia' })
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }, [])

  // Actualizar datos
  const updateData = useCallback((newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }))
  }, [])

  // Siguiente step
  const nextStep = useCallback(() => {
    const validation = validateStep(currentStep, data)
    
    if (!validation.isValid) {
      return { success: false, errors: validation.errors }
    }

    const newCompletedSteps = [...(data.completedSteps || []), currentStep]
    updateData({ completedSteps: newCompletedSteps })
    
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }

    return { success: true }
  }, [currentStep, data, updateData, validateStep])

  // Step anterior
  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }, [currentStep])

  // Ir a step específico
  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      setCurrentStep(step)
    }
  }, [])

  // Saltar al final (Quick Start)
  const skipToGeneration = useCallback(() => {
    // Validar steps obligatorios (1 y 2)
    const step1Validation = validateStep(1, data)
    const step2Validation = validateStep(2, data)

    if (!step1Validation.isValid) {
      return { success: false, errors: step1Validation.errors }
    }
    if (!step2Validation.isValid) {
      return { success: false, errors: step2Validation.errors }
    }

    // Marcar como completado
    updateData({
      completedSteps: [1, 2, 3, 4],
      completedAt: new Date().toISOString(),
    })

    return { success: true, data }
  }, [data, updateData, validateStep])

  // Completar onboarding
  const complete = useCallback(() => {
    updateData({ completedAt: new Date().toISOString() })
    return { success: true, data }
  }, [data, updateData])

  // Reset
  const reset = useCallback(() => {
    setCurrentStep(1)
    setData({
      ...DEFAULT_ONBOARDING_DATA,
      mode: 'quick_start',
      startedAt: new Date().toISOString(),
    })
  }, [])

  // Progress
  const progress: OnboardingProgress = {
    currentStep,
    totalSteps: TOTAL_STEPS,
    percentage: Math.round((currentStep / TOTAL_STEPS) * 100),
    canContinue: currentStep < TOTAL_STEPS,
    canGoBack: currentStep > 1,
  }

  return {
    currentStep,
    data,
    progress,
    updateData,
    nextStep,
    prevStep,
    goToStep,
    skipToGeneration,
    complete,
    reset,
    validateStep,
  }
}
