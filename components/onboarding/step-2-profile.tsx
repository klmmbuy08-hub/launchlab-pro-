'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface StepProps {
  data: any
  updateData: (data: any) => void
}

export function Step2Profile({ data, updateData }: StepProps) {
  const businessTypes = [
    { id: 'fitness_coach', label: '🛡️ Fitness Coach' },
    { id: 'saas', label: '🚀 SaaS / Software' },
    { id: 'ecommerce', label: '🛍️ E-commerce' },
    { id: 'agency', label: '🏢 Agency / Services' },
    { id: 'creator', label: '✨ Content Creator' },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">The Business Core</h2>
        <p className="text-neutral-400">Tell us what you do so we can customize your dashboard.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {businessTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => updateData({ business_type: type.id })}
            className={`p-4 rounded-xl border text-sm font-medium transition-all ${
              data.business_type === type.id
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="niche" className="text-neutral-400">What is your niche?</Label>
          <Input 
            id="niche" 
            placeholder="e.g. Weight loss for busy executives" 
            value={data.niche}
            onChange={(e) => updateData({ niche: e.target.value })}
            className="bg-neutral-900 border-neutral-800 focus:border-blue-500 h-12"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="product" className="text-neutral-400">Main Product Name</Label>
            <Input 
              id="product" 
              placeholder="e.g. 90-day Challenge" 
              value={data.product_name}
              onChange={(e) => updateData({ product_name: e.target.value })}
              className="bg-neutral-900 border-neutral-800 focus:border-blue-500 h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price" className="text-neutral-400">Price ($)</Label>
            <Input 
              id="price" 
              type="number"
              placeholder="497" 
              value={data.product_price || ''}
              onChange={(e) => updateData({ product_price: parseFloat(e.target.value) })}
              className="bg-neutral-900 border-neutral-800 focus:border-blue-500 h-12"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
