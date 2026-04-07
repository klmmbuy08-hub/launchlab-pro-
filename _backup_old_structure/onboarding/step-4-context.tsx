'use client'

import { OnboardingData } from '@/lib/types/onboarding'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

interface Step4ContextProps {
  data: Partial<OnboardingData>
  updateData: (data: Partial<OnboardingData>) => void
}

export function Step4Context({ data, updateData }: Step4ContextProps) {
  return (
    <Card className="bg-neutral-800/50 border-neutral-700">
      <CardHeader>
        <CardTitle className="text-2xl">💡 Contexto adicional</CardTitle>
        <CardDescription>
          Opcional - Ayuda a los agentes a crear mejores estrategias
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Problema principal */}
        <div className="space-y-2">
          <Label htmlFor="mainProblem">
            ¿Qué problema principal resuelve tu producto? (opcional)
          </Label>
          <Textarea
            id="mainProblem"
            placeholder="Ej: La mayoría no sabe escribir copy que convierte, y pierden ventas por eso"
            value={data.mainProblem || ''}
            onChange={(e) => updateData({ mainProblem: e.target.value })}
            rows={3}
            className="bg-neutral-900 border-neutral-700 resize-none"
          />
          <p className="text-xs text-neutral-400">
            Esto ayuda al Agent Sales a crear mejor copy
          </p>
        </div>

        {/* Valor único */}
        <div className="space-y-2">
          <Label htmlFor="uniqueValue">
            ¿Por qué es diferente a la competencia? (opcional)
          </Label>
          <Textarea
            id="uniqueValue"
            placeholder="Ej: Es el único sistema que combina copywriting + psicología de compra + IA"
            value={data.uniqueValue || ''}
            onChange={(e) => updateData({ uniqueValue: e.target.value })}
            rows={3}
            className="bg-neutral-900 border-neutral-700 resize-none"
          />
          <p className="text-xs text-neutral-400">
            Esto ayuda al Agent CEO a posicionarte mejor
          </p>
        </div>

        {/* Checkboxes */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="hasTestimonials"
              checked={data.hasTestimonials || false}
              onCheckedChange={(checked) =>
                updateData({ hasTestimonials: checked as boolean })
              }
            />
            <div className="space-y-1">
              <Label htmlFor="hasTestimonials" className="cursor-pointer">
                Tengo testimoniales de clientes previos
              </Label>
              <p className="text-xs text-neutral-400">
                Los agentes priorizarán social proof en tu estrategia
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="hasPreviousLaunches"
              checked={data.hasPreviousLaunches || false}
              onCheckedChange={(checked) =>
                updateData({ hasPreviousLaunches: checked as boolean })
              }
            />
            <div className="space-y-1">
              <Label htmlFor="hasPreviousLaunches" className="cursor-pointer">
                He hecho lanzamientos anteriores
              </Label>
              <p className="text-xs text-neutral-400">
                Los agentes optimizarán basándose en tu experiencia previa
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30">
          <p className="text-sm text-green-300">
            ✨ <strong>¡Listo para generar!</strong> Cuanta más información des, mejores serán las
            estrategias que crearán los agentes.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
