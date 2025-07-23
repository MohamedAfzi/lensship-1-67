import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GlassCard } from '@/components/glass';
import { X, Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'general' | 'sales' | 'demo';
}

const ContactModal = ({ isOpen, onClose, type = 'general' }: ContactModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: type === 'sales' ? 'sales' : type === 'demo' ? 'demo' : '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      inquiryType: '',
      message: ''
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getTitle = () => {
    switch (type) {
      case 'sales': return 'Contact Sales Team';
      case 'demo': return 'Request Demo';
      default: return 'Get in Touch';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'sales': return 'Ready to scale your business? Let\'s discuss how LensShip can help.';
      case 'demo': return 'See LensShip in action with a personalized demo session.';
      default: return 'Have questions? We\'d love to hear from you.';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-xl border-neon-blue/20 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-neon-blue">
            <Mail className="w-5 h-5" />
            <span>{getTitle()}</span>
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
          <p className="text-foreground/70 mb-8 text-center">{getDescription()}</p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <GlassCard variant="default" className="p-6">
                <h3 className="font-semibold text-neon-blue mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-neon-blue" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-foreground/60">hello@lensship.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-neon-green/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-neon-green" />
                    </div>
                    <div>
                      <p className="font-medium">Sales</p>
                      <p className="text-sm text-foreground/60">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-neon-purple" />
                    </div>
                    <div>
                      <p className="font-medium">Office</p>
                      <p className="text-sm text-foreground/60">San Francisco, CA</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-neon-cyan" />
                    </div>
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-sm text-foreground/60">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {type === 'demo' && (
                <GlassCard variant="glow" className="p-6">
                  <h4 className="font-semibold text-neon-blue mb-3">What to Expect</h4>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li>• 30-minute personalized demo</li>
                    <li>• Live product scanning simulation</li>
                    <li>• Q&A session with our team</li>
                    <li>• Custom pricing discussion</li>
                    <li>• Implementation roadmap</li>
                  </ul>
                </GlassCard>
              )}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <GlassCard variant="default" className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="John Doe"
                        required
                        className="bg-card/50 border-neon-blue/20 focus:border-neon-blue"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="john@company.com"
                        required
                        className="bg-card/50 border-neon-blue/20 focus:border-neon-blue"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        placeholder="Acme Corp"
                        className="bg-card/50 border-neon-blue/20 focus:border-neon-blue"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="bg-card/50 border-neon-blue/20 focus:border-neon-blue"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiry-type">Inquiry Type</Label>
                    <Select value={formData.inquiryType} onValueChange={(value) => handleChange('inquiryType', value)}>
                      <SelectTrigger className="bg-card/50 border-neon-blue/20 focus:border-neon-blue">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-neon-blue/20">
                        <SelectItem value="general">General Question</SelectItem>
                        <SelectItem value="sales">Sales Inquiry</SelectItem>
                        <SelectItem value="demo">Request Demo</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="pricing">Pricing Information</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Tell us about your needs, questions, or how we can help you..."
                      rows={5}
                      required
                      className="bg-card/50 border-neon-blue/20 focus:border-neon-blue resize-none"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="flex-1 border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                      className="flex-1 bg-neon-blue hover:bg-neon-blue/90 text-background"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </GlassCard>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;