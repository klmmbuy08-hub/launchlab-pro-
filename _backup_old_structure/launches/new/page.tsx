'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOnboarding } from '@/lib/hooks/use-onboarding'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, Sparkles, Zap } from 'lucide-react'

import { ProgressBar } from '@/components/onboarding/progress-bar'
import { Step1Basic } from '@/components/onboarding/step-1-basic'
import { Step2Strategy } from '@/components/onboarding/step-2-strategy'
import { Step3Preferences } from '@/components/onboarding/step-3-preferences'
import { Step4Context } from '@/components/onboarding/step-4-context'
import { GenerationLoading } from '@/components/onboarding/generation-loading'

export default function NewLaunchPage() {
  const router = useRouter()
  const {
    currentStep,
    data,
    progress,
    updateData,
    nextStep,
    prevStep,
    skipToGeneration,
    complete,
  } = useOnboarding()

  const [errors, setErrors] = useState<{ field: string; message: string }[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  // Manejar siguiente paso
  const handleNext = () => {
    const result = nextStep()
    if (!result.success && result.errors) {
      setErrors(result.errors)
    } else {
      setErrors([])
    }
  }

  // Manejar Quick Start (saltar personalización)
  const handleQuickStart = () => {
    const result = skipToGeneration()
    if (!result.success && result.errors) {
      setErrors(result.errors)
      return
    }

    // Ir directo a generación
    handleGenerate()
  }

  // Generar lanzamiento
  const handleGenerate = async () => {
    setIsGenerating(true)

    try {
      // Aquí llamarías a la API para crear el lanzamiento
      // y generar todos los agentes
      
      // Por ahora, simulamos
      await new Promise((resolve) => setTimeout(resolve, 5000))

      complete()
      
      // Redirigir al dashboard del lanzamiento
      router.push('/launches/demo-id')
    } catch (error) {
      console.error('Error generando lanzamiento:', error)
    } finally {
      // No reseteamos el loading aquí porque redirigimos
    }
  }

  if (isGenerating) {
    return <GenerationLoading />
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-100 mb-2">
          ✨ Nuevo Lanzamiento
        </h1>
        <p className="text-neutral-400">
          Los 7 agentes trabajarán juntos para crear tu estrategia completa
        </p>
      </div>

      {/* Progress Bar */}
      <ProgressBar progress={progress} />

      {/* Content por step */}
      <div className="min-h-[500px]">
        {currentStep === 1 && (
          <Step1Basic data={data} updateData={updateData} errors={errors} />
        )}
        {currentStep === 2 && (
          <Step2Strategy data={data} updateData={updateData} errors={errors} />
        )}
        {currentStep === 3 && <Step3Preferences data={data} updateData={updateData} />}
        {currentStep === 4 && <Step4Context data={data} updateData={updateData} />}
      </div>

      {/* Actions */}
      <Card className="bg-neutral-800/50 border-neutral-700">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Botón Atrás */}
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={!progress.canGoBack || isGenerating}
              className="border-neutral-700 w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Atrás
            </Button>

            {/* Botones de acción central */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              {/* Quick Start (solo visible en steps 1-2) */}
              {currentStep <= 2 && (
                <Button
                  variant="outline"
                  onClick={handleQuickStart}
                  disabled={isGenerating}
                  className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 w-full sm:w-auto"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Quick Start
                </Button>
              )}

              {/* Siguiente o Generar */}
              {currentStep < 4 ? (
                <Button
                  onClick={handleNext}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 w-full sm:w-auto"
                >
                  Siguiente
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 w-full sm:w-auto"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generar Lanzamiento
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Texto explicativo */}
          <div className="mt-4 pt-4 border-t border-neutral-700">
            {currentStep <= 2 && (
              <p className="text-sm text-neutral-400 text-center">
                💡 <strong>Quick Start:</strong> Salta la personalización y genera con defaults
                inteligentes (puedes editar después)
              </p>
            )}
            {currentStep === 3 && (
              <p className="text-sm text-neutral-400 text-center">
                💡 Estas opciones son opcionales. Los defaults funcionan perfectamente.
              </p>
            )}
            {currentStep === 4 && (
              <p className="text-sm text-neutral-400 text-center">
                🚀 Al generar, los 7 agentes crearán tu estrategia completa en ~5 minutos
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Demo mode opcional */}
      {currentStep === 1 && (
        <Card className="bg-blue-500/10 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">👁️</div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-300 mb-1">
                  ¿Primera vez? Ve un demo primero
                </h3>
                <p className="text-sm text-blue-200 mb-3">
                  Explora un lanzamiento de ejemplo completo antes de crear el tuyo
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push('/launches/demo')}
                  className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
                >
                  Ver Demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
