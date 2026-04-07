'use client'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  steps: { id: number; title: string }[]
}

export function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      {/* Progress bar */}
      <div className="relative mb-8">
        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step dots */}
      <div className="flex justify-between items-center">
        {steps.map((step) => {
          const isCompleted = step.id < currentStep
          const isCurrent = step.id === currentStep
          const isPending = step.id > currentStep

          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isCurrent
                    ? 'bg-blue-500 text-white ring-4 ring-blue-500/20'
                    : 'bg-neutral-800 text-neutral-500'
                }`}
              >
                {isCompleted ? '✓' : step.id}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  isCurrent ? 'text-white' : 'text-neutral-500'
                }`}
              >
                {step.title}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
