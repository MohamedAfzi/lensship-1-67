
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/glass';
import UnifiedServiceNavigation from '@/components/landing/UnifiedServiceNavigation';
import ServiceFooter from '@/components/landing/ServiceFooter';
import HelpButton from '@/components/navigation/HelpButton';
import { Network, Globe, TrendingUp, Shield, Users, Zap } from 'lucide-react';

const FlowShipLanding = () => {
  const [contactModal, setContactModal] = useState(false);

  const features = [
    {
      icon: Network,
      title: "Global Supplier Network",
      description: "Connect with verified suppliers from around the world for your dropshipping business."
    },
    {
      icon: Globe,
      title: "Worldwide Shipping",
      description: "Seamless international shipping solutions with tracking and customs handling."
    },
    {
      icon: TrendingUp,
      title: "Market Analytics",
      description: "Advanced analytics to identify trending products and market opportunities."
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Rigorous quality checks and supplier verification for reliable partnerships."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a thriving community of dropshippers sharing insights and strategies."
    },
    {
      icon: Zap,
      title: "Automated Fulfillment",
      description: "Streamlined order processing and fulfillment automation."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <UnifiedServiceNavigation onContactDemo={() => setContactModal(true)} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 slide-in-up">
              <span className="text-neon-green animate-neon-glow">FlowShip</span>
              <br />
              <span className="text-foreground">Dropshipping Hub</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 slide-in-up" style={{ animationDelay: '0.2s' }}>
              The ultimate platform connecting entrepreneurs with global suppliers for seamless dropshipping success
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center slide-in-up" style={{ animationDelay: '0.4s' }}>
              <Button size="lg" className="bg-neon-green hover:bg-neon-green/90 text-background font-semibold px-8 py-4 text-lg hover:scale-105 transition-transform focus-ring">
                Start Dropshipping
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-neon-green/30 text-neon-green hover:bg-neon-green/10 hover:border-neon-green/60 px-8 py-4 text-lg focus-ring"
                onClick={() => setContactModal(true)}
              >
                Explore Network
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-neon-green">Dropshipping</span> Ecosystem
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Everything you need to build and scale your dropshipping business successfully
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <GlassCard key={index} className="p-6 hover:scale-105 transition-transform duration-300">
                <feature.icon className="w-12 h-12 text-neon-green mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <GlassCard className="p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Launch Your <span className="text-neon-green">Dropshipping Empire</span>?
            </h2>
            <p className="text-xl text-foreground/80 mb-8">
              Join thousands of successful entrepreneurs already scaling with FlowShip
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-neon-green hover:bg-neon-green/90 text-background font-semibold px-8 py-4 text-lg">
                Start Your Journey
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-neon-green/30 text-neon-green hover:bg-neon-green/10 hover:border-neon-green/60 px-8 py-4 text-lg"
              >
                View Suppliers
              </Button>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <ServiceFooter />

      {/* Floating Help Button */}
      <HelpButton variant="floating" />
    </div>
  );
};

export default FlowShipLanding;
