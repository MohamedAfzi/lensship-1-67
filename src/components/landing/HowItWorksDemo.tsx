import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/glass';
import { Camera, FileText, CheckCircle, ArrowRight, X, Scan, Settings, Truck } from 'lucide-react';

interface HowItWorksDemoProps {
  isOpen: boolean;
  onClose: () => void;
  step: {
    title: string;
    description: string;
    icon: React.ReactNode;
  };
}

const HowItWorksDemo = ({ isOpen, onClose, step }: HowItWorksDemoProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Add null check to prevent crashes
  if (!step) {
    return null;
  }

  const demoSteps = [
    {
      title: "Scan Product",
      description: "AI-powered recognition in action",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-40 h-40 mx-auto bg-gradient-to-br from-neon-blue/20 to-neon-blue/5 rounded-xl flex items-center justify-center animate-glass-pulse">
              <div className="relative">
                <Camera className="w-12 h-12 text-neon-blue" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-neon-blue rounded-full flex items-center justify-center animate-pulse">
                  <Scan className="w-3 h-3 text-background" />
                </div>
              </div>
            </div>
            <p className="mt-4 text-lg font-medium">Scanning...</p>
            <div className="mt-2 w-32 h-2 bg-card/50 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-neon-blue to-neon-cyan rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
          </div>
          <GlassCard variant="default" className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Product Recognition:</span>
                <span className="text-neon-blue font-medium">97.3%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Category:</span>
                <span className="text-foreground/80">Electronics</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Brand:</span>
                <span className="text-foreground/80">Sony WH-1000XM4</span>
              </div>
            </div>
          </GlassCard>
        </div>
      )
    },
    {
      title: "Configure Settings",
      description: "Set pricing and delivery options",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-40 h-40 mx-auto bg-gradient-to-br from-neon-blue/20 to-neon-blue/5 rounded-xl flex items-center justify-center">
              <Settings className="w-12 h-12 text-neon-blue animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <p className="mt-4 text-lg font-medium">Configuring Product</p>
          </div>
          <div className="space-y-4">
            <GlassCard variant="default" className="p-4">
              <h4 className="font-medium mb-3 text-neon-blue">Pricing Configuration</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Base Cost:</span>
                  <span className="font-medium">$299.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Profit Margin:</span>
                  <span className="text-neon-green font-medium">25% ($75.00)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Final Price:</span>
                  <span className="text-neon-blue font-bold">$374.99</span>
                </div>
              </div>
            </GlassCard>
            <GlassCard variant="default" className="p-4">
              <h4 className="font-medium mb-3 text-neon-blue">Delivery Method</h4>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-neon-blue rounded-full animate-pulse"></div>
                <span className="text-sm">DropGo Express - Same Day</span>
              </div>
            </GlassCard>
          </div>
        </div>
      )
    },
    {
      title: "Secure Delivery",
      description: "QR verification and handoff",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-40 h-40 mx-auto bg-gradient-to-br from-neon-green/20 to-neon-green/5 rounded-xl flex items-center justify-center animate-glass-float">
              <div className="relative">
                <CheckCircle className="w-12 h-12 text-neon-green" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-neon-blue rounded-full flex items-center justify-center">
                  <Truck className="w-4 h-4 text-background" />
                </div>
              </div>
            </div>
            <p className="mt-4 text-lg font-medium text-neon-green">Delivery Complete!</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-neon-green/10 rounded-lg border border-neon-green/20">
              <CheckCircle className="w-5 h-5 text-neon-green" />
              <div>
                <p className="font-medium">QR Code Verified</p>
                <p className="text-sm text-foreground/60">Secure handoff confirmed</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-neon-blue/10 rounded-lg border border-neon-blue/20">
              <CheckCircle className="w-5 h-5 text-neon-blue" />
              <div>
                <p className="font-medium">Payment Processed</p>
                <p className="text-sm text-foreground/60">$374.99 transferred</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-card/50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-neon-cyan" />
              <div>
                <p className="font-medium">Customer Notified</p>
                <p className="text-sm text-foreground/60">5-star delivery rating</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-xl border-neon-blue/20">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-neon-blue">
            <span>How LensShip Works</span>
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
          {/* Step Progress */}
          <div className="flex items-center justify-center mb-8">
            {demoSteps.map((_, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    index <= currentStep 
                      ? 'bg-neon-blue border-neon-blue text-background' 
                      : 'border-border text-foreground/50'
                  }`}
                >
                  {index + 1}
                </div>
                {index < demoSteps.length - 1 && (
                  <div 
                    className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                      index < currentStep ? 'bg-neon-blue' : 'bg-border'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Current Step Content */}
          <div className="min-h-[400px]">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">{demoSteps[currentStep].title}</h3>
              <p className="text-foreground/70">{demoSteps[currentStep].description}</p>
            </div>
            {demoSteps[currentStep].content}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 0}
            className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 disabled:opacity-50"
          >
            Previous
          </Button>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10">
              Close
            </Button>
            
            {currentStep < demoSteps.length - 1 ? (
              <Button onClick={nextStep} className="bg-neon-blue hover:bg-neon-blue/90 text-background">
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button className="bg-neon-green hover:bg-neon-green/90 text-background">
                Start Using LensShip
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HowItWorksDemo;