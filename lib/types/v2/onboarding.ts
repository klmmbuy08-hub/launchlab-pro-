export interface OnboardingStep {
  id: string
  title: string
  description: string
  completed: boolean
}

export interface OnboardingData {
  // Step 1: Account Connection
  platform?: 'instagram' | 'tiktok' | 'linkedin'
  platformUsername?: string
  
  // Step 2: Business Info
  businessType?: 'infoproductor' | 'fitness_coach' | 'business_coach' | 'mentor' | 'agency'
  productType?: string
  avgPrice?: number
  
  // Step 3: Goals
  monthlyRevenueGoal?: number
  monthlyLeadsGoal?: number
  
  // Step 4: Integration
  hasPaymentProcessor?: boolean
  paymentProcessor?: 'stripe' | 'paypal' | 'manual'
}

export interface OnboardingProgress {
  currentStep: number
  totalSteps: number
  completedSteps: string[]
  data: OnboardingData
}
