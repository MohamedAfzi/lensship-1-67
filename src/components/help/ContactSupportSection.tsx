import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/glass';
import { 
  Mail, 
  Phone, 
  Clock, 
  Send, 
  MessageCircle, 
  ExternalLink,
  Paperclip,
  X
} from 'lucide-react';
import { contactFormSchema, ContactFormData } from '@/lib/help-schemas';
import { contactInfo } from '@/data/helpData';
import { useToast } from '@/hooks/use-toast';

const ContactSupportSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    reset();
    setSelectedFile(null);
    setIsSubmitting(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB.",
          variant: "destructive"
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Contact Information */}
      <div className="space-y-4">
        <GlassCard className="p-6">
          <h3 className="font-semibold text-neon-blue mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-neon-blue" />
              </div>
              <div>
                <p className="font-medium">Email Support</p>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm text-neon-blue hover:underline"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neon-green/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-neon-green" />
              </div>
              <div>
                <p className="font-medium">Phone Support</p>
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="text-sm text-neon-green hover:underline"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-neon-purple" />
              </div>
              <div>
                <p className="font-medium">Support Hours</p>
                <p className="text-sm text-muted-foreground">{contactInfo.supportHours}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-neon-cyan" />
              </div>
              <div>
                <p className="font-medium">Response Time</p>
                <p className="text-sm text-muted-foreground">{contactInfo.responseTime}</p>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h4 className="font-semibold text-neon-blue mb-3">Quick Actions</h4>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10"
              onClick={() => window.open('https://wa.me/967123456789', '_blank')}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp Support
              <ExternalLink className="w-3 h-3 ml-auto" />
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start border-neon-green/30 text-neon-green hover:bg-neon-green/10"
              onClick={() => window.open('mailto:support@lensship.com', '_blank')}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Us Directly
              <ExternalLink className="w-3 h-3 ml-auto" />
            </Button>
          </div>
        </GlassCard>
      </div>

      {/* Contact Form */}
      <div className="lg:col-span-2">
        <GlassCard className="p-6">
          <h3 className="font-semibold text-foreground mb-6">Send us a Message</h3>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  {...register('name')}
                  placeholder="Your full name"
                  className="bg-card/50 border-border/50 focus:border-neon-blue"
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="your@email.com"
                  className="bg-card/50 border-border/50 focus:border-neon-blue"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                {...register('subject')}
                placeholder="Brief description of your inquiry"
                className="bg-card/50 border-border/50 focus:border-neon-blue"
              />
              {errors.subject && (
                <p className="text-sm text-destructive">{errors.subject.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                {...register('message')}
                placeholder="Please provide details about your question or issue..."
                rows={5}
                className="bg-card/50 border-border/50 focus:border-neon-blue resize-none"
              />
              {errors.message && (
                <p className="text-sm text-destructive">{errors.message.message}</p>
              )}
            </div>

            {/* File Attachment */}
            <div className="space-y-2">
              <Label>Attachment (Optional)</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-border/50"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Paperclip className="w-4 h-4 mr-2" />
                  Attach File
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                  onChange={handleFileSelect}
                />
                {selectedFile && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{selectedFile.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Supported formats: PDF, DOC, TXT, PNG, JPG (Max 10MB)
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => reset()}
                className="flex-1 border-border/50"
              >
                Reset Form
              </Button>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="flex-1 bg-neon-blue hover:bg-neon-blue/90 text-background"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
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
  );
};

export default ContactSupportSection;