'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { OnboardingData } from '@/lib/types/v2/onboarding'
import { CreditCard, DollarSign, CheckCircle2 } from 'lucide-react'

interface Step4IntegrationProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
}

const paymentProcessors = [
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Recommended - Track revenue automatically',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Connect your PayPal business account',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'manual',
    name: 'Manual Entry',
    description: "I'll update revenue manually",
    color: 'from-neutral-700 to-neutral-800',
  },
]

export function Step4Integration({ data, updateData }: Step4IntegrationProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Connect Revenue Tracking</h2>
        <p className="text-neutral-400">
          Connect your payment processor to automatically track cash collected and ROI
        </p>
      </div>

      <div className="space-y-4">
        {paymentProcessors.map((processor) => {
          const isSelected = data.paymentProcessor === processor.id

          return (
            <Card
              key={processor.id}
              className={`cursor-pointer transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/20'
                  : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'
              }`}
              onClick={() => {
                updateData({
                  hasPaymentProcessor: processor.id !== 'manual',
                  paymentProcessor: processor.id as any,
                })
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${processor.color} flex items-center justify-center`}>
                      {processor.id === 'manual' ? (
                        <DollarSign className="w-6 h-6 text-white" />
                      ) : (
                        <CreditCard className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{processor.name}</h3>
                      <p className="text-sm text-neutral-400">{processor.description}</p>
                    </div>
                  </div>

                  {isSelected && (
                    <CheckCircle2 className="w-6 h-6 text-blue-400" />
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {data.paymentProcessor && data.paymentProcessor !== 'manual' && (
        <Card className="bg-yellow-500/10 border-yellow-500/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🔐</div>
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-300 mb-2">Secure OAuth Connection</h3>
                <p className="text-sm text-yellow-200 mb-4">
                  We'll redirect you to {data.paymentProcessor === 'stripe' ? 'Stripe' : 'PayPal'} to securely authorize access. We never see your login credentials.
                </p>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  Connect {data.paymentProcessor === 'stripe' ? 'Stripe' : 'PayPal'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {data.paymentProcessor === 'manual' && (
        <Card className="bg-blue-500/10 border-blue-500/30">
          <CardContent className="p-4">
            <p className="text-sm text-blue-200">
              💡 <strong>Tip:</strong> You can always connect a payment processor later in Settings to enable automatic revenue tracking.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
