import { Navbar } from '@/components/landing/navbar'
import { HeroSection } from '@/components/landing/hero-section'
import { DashboardPreview } from '@/components/landing/dashboard-preview'
import { AgentsSection } from '@/components/landing/agents-section'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Testimonials } from '@/components/landing/testimonials'
import { PricingSection } from '@/components/landing/pricing-section'
import { Footer } from '@/components/landing/footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />
      <HeroSection />
      <DashboardPreview />
      <div id="agentes">
        <AgentsSection />
      </div>
      <div id="como-funciona">
        <HowItWorks />
      </div>
      <Testimonials />
      <div id="precios">
        <PricingSection />
      </div>
      <Footer />
    </div>
  )
}
