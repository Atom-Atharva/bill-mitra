import {
  BenefitsSection, ContactSection, CTASection, DemoSection,
  DeveloperSection, FAQSection, FeaturesSection, Footer,
  HeroSection, HowItWorksSection, NavigationBar,
  TestimonialsSection
} from '@/components/landing'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <DemoSection />
      <DeveloperSection />
      <FAQSection />
      <ContactSection />
      <CTASection />
      <Footer />
    </div>
  )
}
