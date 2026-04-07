'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { OnboardingData } from '@/lib/types/v2/onboarding'
import { Dumbbell, Briefcase, GraduationCap, Users } from 'lucide-react'

interface Step2BusinessProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
}

const businessTypes = [
  {
    id: 'fitness_coach',
    name: 'Fitness Coach',
    icon: Dumbbell,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'business_coach',
    name: 'Business Coach',
    icon: Briefcase,
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'infoproductor',
    name: 'Infoproductor',
    icon: GraduationCap,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'agency',
    name: 'Agency',
    icon: Users,
    color: 'from-orange-500 to-red-500',
  },
]

export function Step2Business({ data, updateData }: Step2BusinessProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Tell Us About Your Business</h2>
        <p className="text-neutral-400">
          This helps us customize insights and recommendations for you
        </p>
      </div>

      {/* Business Type */}
      <div>
        <Label className="text-lg font-semibold text-white mb-4 block">
          What type of business do you run?
        </Label>
        <div className="grid md:grid-cols-4 gap-4">
          {businessTypes.map((type) => {
            const Icon = type.icon
            const isSelected = data.businessType === type.id

            return (
              <Card
                key={type.id}
                className={`cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/20'
                    : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'
                }`}
                onClick={() => updateData({ businessType: type.id as any })}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="font-medium text-white">{type.name}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Product & Price */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="productType" className="text-white mb-2 block">
            What do you sell?
          </Label>
          <Input
            id="productType"
            placeholder="e.g., 12-week transformation program"
            value={data.productType || ''}
            onChange={(e) => updateData({ productType: e.target.value })}
            className="bg-neutral-900 border-neutral-800"
          />
          <p className="text-xs text-neutral-500 mt-2">
            Your main product or service
          </p>
        </div>

        <div>
          <Label htmlFor="avgPrice" className="text-white mb-2 block">
            Average Price
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
            <Input
              id="avgPrice"
              type="number"
              placeholder="997"
              value={data.avgPrice || ''}
              onChange={(e) => updateData({ avgPrice: Number(e.target.value) })}
              className="bg-neutral-900 border-neutral-800 pl-8"
            />
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            What you typically charge per sale
          </p>
        </div>
      </div>
    </div>
  )
}
