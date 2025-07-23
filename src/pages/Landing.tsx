
import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import FeatureDemo from '@/components/landing/FeatureDemo';
import HowItWorksDemo from '@/components/landing/HowItWorksDemo';
import PricingModal from '@/components/landing/PricingModal';
import ContactModal from '@/components/landing/ContactModal';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import EnhancedHero from '@/components/landing/EnhancedHero';
import ModernHero from '@/components/landing/ModernHero';
import UnifiedServiceNavigation from '@/components/landing/UnifiedServiceNavigation';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import LiveDemoSection from '@/components/landing/LiveDemoSection';
import PricingSection from '@/components/landing/PricingSection';
import FAQSection from '@/components/landing/FAQSection';
import FinalCTASection from '@/components/landing/FinalCTASection';
import ServiceFooter from '@/components/landing/ServiceFooter';
import HelpButton from '@/components/navigation/HelpButton';
import { steps } from '@/data/landingData';

const Landing = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Modal states
  const [featureDemo, setFeatureDemo] = useState<{ isOpen: boolean; feature: any }>({ isOpen: false, feature: null });
  const [howItWorksDemo, setHowItWorksDemo] = useState<{ isOpen: boolean; step: any }>({ isOpen: false, step: null });
  const [pricingModal, setPricingModal] = useState<{ isOpen: boolean; selectedPlan?: 'starter' | 'professional' | 'enterprise' }>({ isOpen: false });
  const [contactModal, setContactModal] = useState<{ isOpen: boolean; type?: 'general' | 'sales' | 'demo' }>({ isOpen: false });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleFeatureDemo = (feature: any) => {
    setFeatureDemo({ isOpen: true, feature: { 
      id: feature.id, 
      icon: <feature.icon className="w-8 h-8 text-neon-blue" />, 
      title: feature.title, 
      description: feature.description 
    }});
  };

  const handlePricingModal = (selectedPlan?: string) => {
    setPricingModal({ isOpen: true, selectedPlan: selectedPlan as 'starter' | 'professional' | 'enterprise' });
  };

  const handleContactModal = (type: string) => {
    setContactModal({ isOpen: true, type: type as 'general' | 'sales' | 'demo' });
  };

  const handleHowItWorksDemo = (step: any) => {
    setHowItWorksDemo({ isOpen: true, step });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <UnifiedServiceNavigation onContactDemo={() => handleContactModal('demo')} />

      {/* Modern Hero Section */}
      <ModernHero onContactDemo={() => handleContactModal('demo')} />

      {/* Customer Testimonials Section */}
      <TestimonialsSection />

      {/* Features Section */}
      <FeaturesSection onFeatureDemo={handleFeatureDemo} />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Live Demo Section */}
      <LiveDemoSection onHowItWorksDemo={handleHowItWorksDemo} />

      {/* Pricing Section */}
      <PricingSection 
        onPricingModal={handlePricingModal}
        onContactModal={handleContactModal}
      />

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA Section */}
      <FinalCTASection onContactModal={handleContactModal} />

      {/* Footer */}
      <ServiceFooter />

      {/* Floating Help Button */}
      <HelpButton variant="floating" />

      {/* Interactive Modals */}
      <FeatureDemo 
        isOpen={featureDemo.isOpen} 
        onClose={() => setFeatureDemo({ isOpen: false, feature: null })} 
        feature={featureDemo.feature} 
      />
      
      <HowItWorksDemo 
        isOpen={howItWorksDemo.isOpen} 
        onClose={() => setHowItWorksDemo({ isOpen: false, step: null })} 
        step={howItWorksDemo.step} 
      />
      
      <PricingModal 
        isOpen={pricingModal.isOpen} 
        onClose={() => setPricingModal({ isOpen: false })} 
        selectedPlan={pricingModal.selectedPlan} 
      />
      
      <ContactModal 
        isOpen={contactModal.isOpen} 
        onClose={() => setContactModal({ isOpen: false })} 
        type={contactModal.type} 
      />
    </div>
  );
};

export default Landing;
