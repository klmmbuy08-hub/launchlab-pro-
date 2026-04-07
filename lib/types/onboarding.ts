// Tipos para el sistema de onboarding

export type OnboardingMode = 'quick_start' | 'guided_tour' | 'full_config'
export type ProductType = 'course' | 'mentorship' | 'community' | 'ebook' | 'coaching' | 'saas'
export type ExperienceLevel = 'first_launch' | 'some_experience' | 'expert'
export type CurrentAudience = 'none' | 'small' | 'medium' | 'large'
export type Tone = 'professional' | 'casual' | 'inspirational' | 'aggressive'
export type CopyStyle = 'long_form' | 'short_concise' | 'storytelling'
export type DesignStyle = 'minimalist' | 'vibrant' | 'corporate' | 'startup'
export type RiskTolerance = 'conservative' | 'balanced' | 'aggressive'

export interface OnboardingData {
  // STEP 1: Básico (obligatorio)
  productName: string
  productType: ProductType
  price: number
  targetAudience: string
  
  // STEP 2: Estrategia (obligatorio)
  launchDate?: string
  currentAudience: CurrentAudience
  budget: number
  experienceLevel: ExperienceLevel
  
  // STEP 3: Personalización (opcional - defaults inteligentes)
  tone: Tone
  copyStyle: CopyStyle
  designStyle: DesignStyle
  riskTolerance: RiskTolerance
  
  // STEP 4: Contexto avanzado (opcional)
  mainProblem?: string
  uniqueValue?: string
  hasTestimonials: boolean
  hasPreviousLaunches: boolean
  
  // Metadata
  mode: OnboardingMode
  completedSteps: number[]
  startedAt: string
  completedAt?: string
}

export interface OnboardingProgress {
  currentStep: number
  totalSteps: number
  percentage: number
  canContinue: boolean
  canGoBack: boolean
}

export interface OnboardingValidation {
  isValid: boolean
  errors: {
    field: string
    message: string
  }[]
}
