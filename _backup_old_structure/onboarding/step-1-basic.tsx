'use client'

import { OnboardingData } from '@/lib/types/onboarding'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const PRODUCT_TYPES = [
  { value: 'course', label: 'Curso Online', emoji: '📚' },
  { value: 'mentorship', label: 'Mentoría', emoji: '🎯' },
  { value: 'community', label: 'Comunidad', emoji: '👥' },
  { value: 'ebook', label: 'eBook', emoji: '📖' },
  { value: 'coaching', label: 'Coaching', emoji: '💪' },
  { value: 'saas', label: 'SaaS', emoji: '💻' },
]

interface Step1BasicProps {
  data: Partial<OnboardingData>
  updateData: (data: Partial<OnboardingData>) => void
  errors?: { field: string; message: string }[]
}

export function Step1Basic({ data, updateData, errors }: Step1BasicProps) {
  const getError = (field: string) => errors?.find((e) => e.field === field)?.message

  return (
    <Card className="bg-neutral-800/50 border-neutral-700">
      <CardHeader>
        <CardTitle className="text-2xl">🚀 Cuéntame sobre tu lanzamiento</CardTitle>
        <CardDescription>Información básica de tu producto</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Nombre del producto */}
        <div className="space-y-2">
          <Label htmlFor="productName">
            Nombre del producto <span className="text-red-400">*</span>
          </Label>
          <Input
            id="productName"
            placeholder="Ej: Masterclass de Copywriting"
            value={data.productName || ''}
            onChange={(e) => updateData({ productName: e.target.value })}
            className={`bg-neutral-900 border-neutral-700 \${
              getError('productName') ? 'border-red-500' : ''
            }`}
          />
          {getError('productName') && (
            <p className="text-sm text-red-400">{getError('productName')}</p>
          )}
        </div>

        {/* Tipo de producto */}
        <div className="space-y-2">
          <Label>
            Tipo de producto <span className="text-red-400">*</span>
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PRODUCT_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => updateData({ productType: type.value as any })}
                className={`p-4 rounded-lg border-2 transition-all \${
                  data.productType === type.value
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-neutral-700 bg-neutral-900 hover:border-neutral-600'
                }`}
              >
                <div className="text-3xl mb-2">{type.emoji}</div>
                <div className="text-sm font-medium">{type.label}</div>
              </button>
            ))}
          </div>
          {getError('productType') && (
            <p className="text-sm text-red-400">{getError('productType')}</p>
          )}
        </div>

        {/* Precio */}
        <div className="space-y-2">
          <Label htmlFor="price">
            Precio (USD) <span className="text-red-400">*</span>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">$</span>
            <Input
              id="price"
              type="number"
              placeholder="997"
              value={data.price || ''}
              onChange={(e) => updateData({ price: parseFloat(e.target.value) || 0 })}
              className={`bg-neutral-900 border-neutral-700 pl-8 \${
                getError('price') ? 'border-red-500' : ''
              }`}
            />
          </div>
          <p className="text-xs text-neutral-400">💡 La mayoría cobra entre $297-$997</p>
          {getError('price') && <p className="text-sm text-red-400">{getError('price')}</p>}
        </div>

        {/* Audiencia objetivo */}
        <div className="space-y-2">
          <Label htmlFor="targetAudience">
            ¿A quién va dirigido? <span className="text-red-400">*</span>
          </Label>
          <Textarea
            id="targetAudience"
            placeholder="Ej: Emprendedores digitales que quieren mejorar sus ventas con mejor copywriting"
            value={data.targetAudience || ''}
            onChange={(e) => updateData({ targetAudience: e.target.value })}
            rows={3}
            className={`bg-neutral-900 border-neutral-700 resize-none \${
              getError('targetAudience') ? 'border-red-500' : ''
            }`}
          />
          {getError('targetAudience') && (
            <p className="text-sm text-red-400">{getError('targetAudience')}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
