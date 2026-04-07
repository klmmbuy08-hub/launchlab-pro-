'use client'

import { OnboardingData } from '@/lib/types/onboarding'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

const TONE_OPTIONS = [
  { value: 'professional', label: 'Profesional y formal', emoji: '👔' },
  { value: 'casual', label: 'Casual y cercano', emoji: '😊' },
  { value: 'inspirational', label: 'Inspiracional y motivador', emoji: '🚀' },
  { value: 'aggressive', label: 'Directo y agresivo', emoji: '⚡' },
]

const COPY_STYLES = [
  { value: 'long_form', label: 'Largo y detallado', description: '3000+ palabras' },
  { value: 'short_concise', label: 'Corto y directo', description: '800 palabras' },
  { value: 'storytelling', label: 'Narrativo (storytelling)', description: '1500 palabras' },
]

const DESIGN_STYLES = [
  { value: 'minimalist', label: 'Minimalista y clean', emoji: '⚪' },
  { value: 'vibrant', label: 'Moderno y vibrante', emoji: '🌈' },
  { value: 'corporate', label: 'Corporativo y elegante', emoji: '💼' },
  { value: 'startup', label: 'Startup energético', emoji: '⚡' },
]

const RISK_OPTIONS = [
  { value: 'conservative', label: 'Conservador', description: 'Proyecciones bajas, seguro' },
  { value: 'balanced', label: 'Balanceado', description: 'Realista (Recomendado)' },
  { value: 'aggressive', label: 'Agresivo', description: 'Proyecciones altas, ambicioso' },
]

interface Step3PreferencesProps {
  data: Partial<OnboardingData>
  updateData: (data: Partial<OnboardingData>) => void
}

export function Step3Preferences({ data, updateData }: Step3PreferencesProps) {
  return (
    <Card className="bg-neutral-800/50 border-neutral-700">
      <CardHeader>
        <CardTitle className="text-2xl">🎨 Personaliza tu estilo</CardTitle>
        <CardDescription>Opcional - Estos valores tienen defaults inteligentes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tono de comunicación */}
        <div className="space-y-2">
          <Label>Tono de comunicación</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TONE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => updateData({ tone: option.value as any })}
                className={`p-3 rounded-lg border-2 transition-all \${
                  data.tone === option.value
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-neutral-700 bg-neutral-900 hover:border-neutral-600'
                }`}
              >
                <div className="text-2xl mb-1">{option.emoji}</div>
                <div className="text-xs font-medium">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Estilo de copy */}
        <div className="space-y-2">
          <Label>Estilo de copy</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {COPY_STYLES.map((style) => (
              <button
                key={style.value}
                onClick={() => updateData({ copyStyle: style.value as any })}
                className={`p-4 rounded-lg border-2 text-left transition-all \${
                  data.copyStyle === style.value
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-neutral-700 bg-neutral-900 hover:border-neutral-600'
                }`}
              >
                <div className="font-medium mb-1">{style.label}</div>
                <div className="text-xs text-neutral-400">{style.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Estilo visual */}
        <div className="space-y-2">
          <Label>Estilo visual</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {DESIGN_STYLES.map((style) => (
              <button
                key={style.value}
                onClick={() => updateData({ designStyle: style.value as any })}
                className={`p-3 rounded-lg border-2 transition-all \${
                  data.designStyle === style.value
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-neutral-700 bg-neutral-900 hover:border-neutral-600'
                }`}
              >
                <div className="text-2xl mb-1">{style.emoji}</div>
                <div className="text-xs font-medium">{style.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Tolerancia al riesgo */}
        <div className="space-y-2">
          <Label>Enfoque financiero</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {RISK_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => updateData({ riskTolerance: option.value as any })}
                className={`p-4 rounded-lg border-2 text-left transition-all \${
                  data.riskTolerance === option.value
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-neutral-700 bg-neutral-900 hover:border-neutral-600'
                }`}
              >
                <div className="font-medium mb-1">{option.label}</div>
                <div className="text-xs text-neutral-400">{option.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
          <p className="text-sm text-blue-300">
            💡 <strong>Tip:</strong> Estos valores son opcionales. Si no estás seguro, los defaults
            funcionan perfectamente.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
