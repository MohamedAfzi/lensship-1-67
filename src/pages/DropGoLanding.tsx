
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/glass';
import UnifiedServiceNavigation from '@/components/landing/UnifiedServiceNavigation';
import ServiceFooter from '@/components/landing/ServiceFooter';
import HelpButton from '@/components/navigation/HelpButton';
import ResponsiveContainer from '@/components/responsive/ResponsiveContainer';
import ResponsiveText from '@/components/responsive/ResponsiveText';
import { Truck, Package, Clock, MapPin, Users, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { spacing } from '@/lib/responsive-utils';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const DropGoLanding = () => {
  const [contactModal, setContactModal] = useState(false);
  const isMobile = useIsMobile();

  const features = [
    {
      icon: Truck,
      title: "Lightning-Fast Delivery",
      description: "Get your packages delivered in record time with our optimized route network."
    },
    {
      icon: Package,
      title: "Secure Packaging",
      description: "Advanced packaging solutions to ensure your items arrive safely."
    },
    {
      icon: Clock,
      title: "Real-Time Tracking",
      description: "Track your deliveries in real-time with precise location updates."
    },
    {
      icon: MapPin,
      title: "Wide Coverage",
      description: "Extensive delivery network covering urban and rural areas."
    },
    {
      icon: Users,
      title: "Professional Drivers",
      description: "Experienced and trained delivery professionals for reliable service."
    },
    {
      icon: Zap,
      title: "Instant Booking",
      description: "Book deliveries instantly through our smart booking system."
    }
  ];

  const stats = [
    { value: "50K+", label: "Deliveries Daily", icon: "📦" },
    { value: "98%", label: "On-Time Rate", icon: "⏰" },
    { value: "4.9/5", label: "Customer Rating", icon: "⭐" },
    { value: "15min", label: "Avg Response", icon: "🚀" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <UnifiedServiceNavigation onContactDemo={() => setContactModal(true)} />

      {/* Hero Section */}
      <section className={cn("relative min-h-screen flex items-center justify-center", spacing.section.md)}>
        <ResponsiveContainer size="xl" className="text-center">
          <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
            <ResponsiveText 
              variant="hero" 
              as="h1" 
              className="font-bold leading-tight slide-in-up"
            >
              <span className="text-neon-yellow animate-neon-glow">DropGo</span>
              <br />
              <span className="text-foreground">Delivery Network</span>
            </ResponsiveText>
            
            <ResponsiveText 
              variant="subheading" 
              className="text-foreground/80 max-w-3xl mx-auto leading-relaxed slide-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              Revolutionary delivery solutions that connect businesses with customers through lightning-fast logistics
            </ResponsiveText>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-foreground/70 slide-in-up" style={{ animationDelay: '0.3s' }}>
              {[
                { icon: CheckCircle, text: "Free setup" },
                { icon: CheckCircle, text: "Same-day delivery" },
                { icon: CheckCircle, text: "24/7 support" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <item.icon className="w-3 h-3 sm:w-4 sm:h-4 text-neon-yellow" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className={cn(
              "flex gap-3 sm:gap-4 justify-center slide-in-up",
              isMobile ? "flex-col items-center" : "flex-row"
            )} style={{ animationDelay: '0.4s' }}>
              <Button 
                size="lg" 
                className={cn(
                  "bg-neon-yellow hover:bg-neon-yellow/90 text-background font-semibold hover:scale-105 transition-transform focus-ring group",
                  isMobile ? "w-full max-w-sm" : "px-8 py-4 text-lg"
                )}
              >
                Start Delivering
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className={cn(
                  "border-neon-yellow/30 text-neon-yellow hover:bg-neon-yellow/10 hover:border-neon-yellow/60 hover:scale-105 transition-all focus-ring backdrop-blur-sm bg-card/20",
                  isMobile ? "w-full max-w-sm" : "px-8 py-4 text-lg"
                )}
                onClick={() => setContactModal(true)}
              >
                See Demo
              </Button>
            </div>

            {/* Live Stats */}
            {!isMobile && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto pt-8 slide-in-up" style={{ animationDelay: '0.6s' }}>
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-neon-yellow">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-foreground/60 flex items-center justify-center gap-1">
                      <span>{stat.icon}</span>
                      <span>{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ResponsiveContainer>
      </section>

      {/* Features Section */}
      <section id="features" className={spacing.section.lg}>
        <ResponsiveContainer size="xl">
          <div className="text-center mb-12 sm:mb-16">
            <ResponsiveText variant="heading" as="h2" className="font-bold mb-4 sm:mb-6">
              <span className="text-neon-yellow">Delivery</span> Excellence
            </ResponsiveText>
            <ResponsiveText variant="body" className="text-foreground/80 max-w-3xl mx-auto">
              Experience the future of logistics with our comprehensive delivery ecosystem
            </ResponsiveText>
          </div>
          
          <div className={cn(
            "grid gap-6 sm:gap-8",
            isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          )}>
            {features.map((feature, index) => (
              <GlassCard 
                key={index} 
                className="p-4 sm:p-6 hover:scale-105 transition-transform duration-300 gpu-accelerated"
                size={isMobile ? "small" : "medium"}
              >
                <feature.icon className="w-10 h-10 sm:w-12 sm:h-12 text-neon-yellow mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">{feature.title}</h3>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </ResponsiveContainer>
      </section>

      {/* CTA Section */}
      <section className={spacing.section.lg}>
        <ResponsiveContainer size="lg">
          <GlassCard className="p-8 sm:p-12 text-center">
            <ResponsiveText variant="heading" as="h2" className="font-bold mb-4 sm:mb-6">
              Ready to Transform Your <span className="text-neon-yellow">Delivery Experience</span>?
            </ResponsiveText>
            <ResponsiveText variant="body" className="text-foreground/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using DropGo for their delivery needs
            </ResponsiveText>
            <div className={cn(
              "flex gap-3 sm:gap-4 justify-center",
              isMobile ? "flex-col items-center" : "flex-row"
            )}>
              <Button 
                size="lg" 
                className={cn(
                  "bg-neon-yellow hover:bg-neon-yellow/90 text-background font-semibold hover:scale-105 transition-transform focus-ring",
                  isMobile ? "w-full max-w-sm" : "px-8 py-4 text-lg"
                )}
              >
                Get Started Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className={cn(
                  "border-neon-yellow/30 text-neon-yellow hover:bg-neon-yellow/10 hover:border-neon-yellow/60 hover:scale-105 transition-all focus-ring backdrop-blur-sm bg-card/20",
                  isMobile ? "w-full max-w-sm" : "px-8 py-4 text-lg"
                )}
              >
                Contact Sales
              </Button>
            </div>
          </GlassCard>
        </ResponsiveContainer>
      </section>

      {/* Footer */}
      <ServiceFooter />

      {/* Floating Help Button */}
      <HelpButton variant="floating" />
    </div>
  );
};

export default DropGoLanding;
