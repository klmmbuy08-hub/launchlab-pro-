'use client'

import { OnboardingData } from '@/lib/types/onboarding'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const AUDIENCE_SIZES = [
  { value: 'none', label: 'Empiezo de 0', description: 'No tengo audiencia previa' },
  { value: 'small', label: 'Pequeña', description: 'Menos de 1,000 seguidores' },
  { value: 'medium', label: 'Media', description: '1,000 - 10,000 seguidores' },
  { value: 'large', label: 'Grande', description: 'Más de 10,000 seguidores' },
]

const EXPERIENCE_LEVELS = [
  { value: 'first_launch', label: 'Primer lanzamiento', emoji: '🌱' },
  { value: 'some_experience', label: 'Tengo algo de experiencia', emoji: '🌿' },
  { value: 'expert', label: 'Soy experto', emoji: '🌳' },
]

interface Step2StrategyProps {
  data: Partial<OnboardingData>
  updateData: (data: Partial<OnboardingData>) => void
  errors?: { field: string; message: string }[]
}

export function Step2Strategy({ data, updateData, errors }: Step2StrategyProps) {
  const getError = (field: string) => errors?.find((e) => e.field === field)?.message

  return (
    <Card className="bg-neutral-800/50 border-neutral-700">
      <CardHeader>
        <CardTitle className="text-2xl">📅 Planeemos tu estrategia</CardTitle>
        <CardDescription>Información clave para crear el mejor plan</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Fecha de lanzamiento */}
        <div className="space-y-2">
          <Label htmlFor="launchDate">¿Cuándo quieres lanzar? (opcional)</Label>
          <Input
            id="launchDate"
            type="date"
            value={data.launchDate || ''}
            onChange={(e) => updateData({ launchDate: e.target.value })}
            className="bg-neutral-900 border-neutral-700"
          />
          <p className="text-xs text-neutral-400">
            💡 Dejar en blanco creará un plan de 30 días desde hoy
          </p>
        </div>

        {/* Audiencia actual */}
        <div className="space-y-2">
          <Label>
            ¿Tienes audiencia previa? <span className="text-red-400">*</span>
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {AUDIENCE_SIZES.map((size) => (
              <button
                key={size.value}
                onClick={() => updateData({ currentAudience: size.value as any })}
                className={`p-4 rounded-lg border-2 text-left transition-all \${
                  data.currentAudience === size.value
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-neutral-700 bg-neutral-900 hover:border-neutral-600'
                }`}
              >
                <div className="font-medium mb-1">{size.label}</div>
                <div className="text-sm text-neutral-400">{size.description}</div>
              </button>
            ))}
          </div>
          {getError('currentAudience') && (
            <p className="text-sm text-red-400">{getError('currentAudience')}</p>
          )}
        </div>

        {/* Presupuesto */}
        <div className="space-y-2">
          <Label htmlFor="budget">
            Presupuesto para el lanzamiento <span className="text-red-400">*</span>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">$</span>
            <Input
              id="budget"
              type="number"
              placeholder="5000"
              value={data.budget || ''}
              onChange={(e) => updateData({ budget: parseFloat(e.target.value) || 0 })}
              className={`bg-neutral-900 border-neutral-700 pl-8 \${
                getError('budget') ? 'border-red-500' : ''
              }`}
            />
          </div>
          <p className="text-xs text-neutral-400">💡 Recomendado: $3,000 - $10,000</p>
          {getError('budget') && <p className="text-sm text-red-400">{getError('budget')}</p>}
        </div>

        {/* Experiencia */}
        <div className="space-y-2">
          <Label>
            Tu experiencia en lanzamientos <span className="text-red-400">*</span>
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {EXPERIENCE_LEVELS.map((level) => (
              <button
                key={level.value}
                onClick={() => updateData({ experienceLevel: level.value as any })}
                className={`p-4 rounded-lg border-2 transition-all \${
                  data.experienceLevel === level.value
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-neutral-700 bg-neutral-900 hover:border-neutral-600'
                }`}
              >
                <div className="text-2xl mb-2">{level.emoji}</div>
                <div className="text-sm font-medium">{level.label}</div>
              </button>
            ))}
          </div>
          {getError('experienceLevel') && (
            <p className="text-sm text-red-400">{getError('experienceLevel')}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
