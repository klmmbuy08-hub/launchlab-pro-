'use client'

import { useRouter } from 'next/navigation'
import { useOnboarding } from '@/lib/hooks/v2/use-onboarding'
import { Button } from '@/components/ui/button'
import { StepIndicator } from '@/components/onboarding/step-indicator'
import { Step1Connect } from '@/components/onboarding/step-1-connect'
import { Step2Business } from '@/components/onboarding/step-2-business'
import { Step3Goals } from '@/components/onboarding/step-3-goals'
import { Step4Integration } from '@/components/onboarding/step-4-integration'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'

const steps = [
  { id: 1, title: 'Connect' },
  { id: 2, title: 'Business' },
  { id: 3, title: 'Goals' },
  { id: 4, title: 'Integration' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { currentStep, data, updateData, nextStep, prevStep, complete } = useOnboarding()

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!data.platform
      case 2:
        return !!data.businessType && !!data.productType && !!data.avgPrice
      case 3:
        return !!data.monthlyRevenueGoal && !!data.monthlyLeadsGoal
      case 4:
        return !!data.paymentProcessor
      default:
        return false
    }
  }

  const handleComplete = async () => {
    const result = await complete()
    if (result.success) {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress */}
        <StepIndicator currentStep={currentStep} totalSteps={4} steps={steps} />

        {/* Content */}
        <div className="min-h-[500px] py-8">
          {currentStep === 1 && <Step1Connect data={data} updateData={updateData} />}
          {currentStep === 2 && <Step2Business data={data} updateData={updateData} />}
          {currentStep === 3 && <Step3Goals data={data} updateData={updateData} />}
          {currentStep === 4 && <Step4Integration data={data} updateData={updateData} />}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between max-w-4xl mx-auto pt-8 border-t border-neutral-800">
          <Button
           
            onClick={prevStep}
            disabled={currentStep === 1}
            className="border-neutral-700 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {currentStep < 4 ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            >
              Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Complete Setup
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
