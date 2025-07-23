import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/glass';
import { CheckCircle, X, Star, Zap, Crown, Phone, Mail, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: 'starter' | 'professional' | 'enterprise';
}

const PricingModal = ({ isOpen, onClose, selectedPlan }: PricingModalProps) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = {
    starter: {
      name: "Starter",
      icon: <Star className="w-6 h-6" />,
      price: { monthly: "Free", yearly: "Free" },
      description: "Perfect for getting started with product scanning",
      features: [
        "100 AI scans per month",
        "Basic analytics dashboard",
        "Standard QR security",
        "Community support",
        "Mobile app access",
        "Basic invoice generation"
      ],
      limitations: [
        "No DropGo delivery credits",
        "Limited to 5 active products",
        "Standard processing speed"
      ],
      cta: "Start Free",
      ctaLink: "/register",
      popular: false,
      color: "neon-green"
    },
    professional: {
      name: "Professional",
      icon: <Zap className="w-6 h-6" />,
      price: { monthly: "$29", yearly: "$290" },
      description: "Everything you need to scale your product business",
      features: [
        "1,000 AI scans per month",
        "50 DropGo delivery credits",
        "Advanced analytics & insights",
        "Priority customer support",
        "Custom branding options",
        "API access (limited)",
        "Inventory management",
        "Multi-user team access (5 users)",
        "Advanced QR security",
        "Bulk operations"
      ],
      savings: billingCycle === 'yearly' ? "Save $58/year" : undefined,
      cta: "Start 7-Day Trial",
      ctaLink: "/register?plan=professional",
      popular: true,
      color: "neon-blue"
    },
    enterprise: {
      name: "Enterprise",
      icon: <Crown className="w-6 h-6" />,
      price: { monthly: "Custom", yearly: "Custom" },
      description: "Advanced features for large-scale operations",
      features: [
        "Unlimited AI scans",
        "Unlimited DropGo credits",
        "White-label solution",
        "Dedicated account manager",
        "Custom integrations",
        "Full API access",
        "Advanced security compliance",
        "24/7 phone support",
        "Custom analytics dashboard",
        "Multi-location support",
        "Advanced user management",
        "SLA guarantee (99.9% uptime)"
      ],
      cta: "Contact Sales",
      ctaAction: "contact",
      popular: false,
      color: "neon-purple"
    }
  };

  const handleContactSales = () => {
    // This would typically open a contact form or calendar booking
    alert('Contact sales form would open here. For demo purposes, redirecting to email.');
    window.location.href = 'mailto:sales@lensship.com?subject=Enterprise Plan Inquiry';
  };

  const currentPlan = selectedPlan ? plans[selectedPlan] : plans.professional;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-xl border-neon-blue/20 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-neon-blue">
            <span>Choose Your Plan</span>
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4 hover:bg-neon-blue/10"
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="py-6">
          {/* Billing Toggle */}
          <div className="flex justify-center mb-8">
            <Tabs value={billingCycle} onValueChange={(value) => setBillingCycle(value as 'monthly' | 'yearly')} className="w-auto">
              <TabsList className="bg-card/50 border border-neon-blue/20">
                <TabsTrigger value="monthly" className="data-[state=active]:bg-neon-blue data-[state=active]:text-background">
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="yearly" className="data-[state=active]:bg-neon-blue data-[state=active]:text-background">
                  Yearly
                  <Badge className="ml-2 bg-neon-green text-background">Save 20%</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(plans).map(([key, plan]) => (
              <GlassCard
                key={key}
                variant={plan.popular ? "glow" : "default"}
                className={`relative p-6 ${plan.popular ? 'border-neon-blue shadow-lg shadow-neon-blue/20' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-neon-blue text-background">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${plan.color}/20 mb-4`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-neon-blue mb-2">
                    {plan.price[billingCycle]}
                    {plan.price[billingCycle] !== 'Free' && plan.price[billingCycle] !== 'Custom' && (
                      <span className="text-lg text-foreground/60">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                    )}
                  </div>
                  {'savings' in plan && plan.savings && billingCycle === 'yearly' && (
                    <Badge variant="outline" className="border-neon-green text-neon-green">
                      {plan.savings}
                    </Badge>
                  )}
                  <p className="text-sm text-foreground/70 mt-2">{plan.description}</p>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-neon-green mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {'limitations' in plan && plan.limitations && (
                    <div className="pt-3 border-t border-border/50">
                      <p className="text-xs text-foreground/50 mb-2">Limitations:</p>
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <X className="w-3 h-3 text-foreground/30 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-foreground/50">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {'ctaAction' in plan && plan.ctaAction === 'contact' ? (
                    <>
                      <Button 
                        onClick={handleContactSales}
                        className="w-full bg-neon-purple hover:bg-neon-purple/90 text-background"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        {plan.cta}
                      </Button>
                      <div className="text-center space-y-2">
                        <div className="flex items-center justify-center space-x-2 text-sm text-foreground/60">
                          <Mail className="w-4 h-4" />
                          <span>sales@lensship.com</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-sm text-foreground/60">
                          <Calendar className="w-4 h-4" />
                          <span>Schedule a demo call</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link to={'ctaLink' in plan ? plan.ctaLink || '/register' : '/register'}>
                      <Button 
                        className={`w-full ${
                          plan.popular 
                            ? 'bg-neon-blue hover:bg-neon-blue/90 text-background' 
                            : 'border-neon-blue text-neon-blue hover:bg-neon-blue/10'
                        }`}
                        variant={plan.popular ? 'default' : 'outline'}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Feature Comparison */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-center mb-6">Feature Comparison</h3>
            <GlassCard variant="default" className="p-6">
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-semibold">Feature</div>
                <div className="font-semibold text-center">Starter</div>
                <div className="font-semibold text-center">Professional</div>
                <div className="font-semibold text-center">Enterprise</div>
                
                <div className="col-span-4 border-t border-border my-2"></div>
                
                <div>Monthly AI Scans</div>
                <div className="text-center">100</div>
                <div className="text-center">1,000</div>
                <div className="text-center">Unlimited</div>
                
                <div>DropGo Credits</div>
                <div className="text-center">-</div>
                <div className="text-center">50</div>
                <div className="text-center">Unlimited</div>
                
                <div>Team Members</div>
                <div className="text-center">1</div>
                <div className="text-center">5</div>
                <div className="text-center">Unlimited</div>
                
                <div>API Access</div>
                <div className="text-center">-</div>
                <div className="text-center">Limited</div>
                <div className="text-center">Full</div>
                
                <div>Support</div>
                <div className="text-center">Community</div>
                <div className="text-center">Priority</div>
                <div className="text-center">24/7 Dedicated</div>
              </div>
            </GlassCard>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;