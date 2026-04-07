'use client'

import { OnboardingProgress } from '@/lib/types/onboarding'

interface ProgressBarProps {
  progress: OnboardingProgress
}

const STEP_NAMES = ['Básico', 'Estrategia', 'Personalización', 'Contexto']

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      {/* Barra de progreso */}
      <div className="relative h-2 bg-neutral-800 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>

      {/* Steps indicators */}
      <div className="flex justify-between items-center">
        {STEP_NAMES.map((name, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === progress.currentStep
          const isCompleted = stepNumber < progress.currentStep

          return (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isActive
                    ? 'bg-blue-500 text-white'
                    : 'bg-neutral-700 text-neutral-400'
                }`}
              >
                {isCompleted ? '✓' : stepNumber}
              </div>
              {index < STEP_NAMES.length - 1 && (
                <div className="hidden sm:block">
                  <div
                    className={`w-12 md:w-24 h-0.5 mx-2 ${
                      isCompleted ? 'bg-green-500' : 'bg-neutral-700'
                    }`}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Step name */}
      <div className="text-center">
        <p className="text-sm text-neutral-400">
          Paso {progress.currentStep} de {progress.totalSteps}:{' '}
          <span className="text-neutral-200 font-medium">
            {STEP_NAMES[progress.currentStep - 1]}
          </span>
        </p>
      </div>
    </div>
  )
}
