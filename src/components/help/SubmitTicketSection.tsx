import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GlassCard } from '@/components/glass';
import { Badge } from '@/components/ui/badge';
import { 
  Ticket, 
  Send, 
  Clock, 
  AlertTriangle, 
  Info,
  CheckCircle2,
  Paperclip,
  X
} from 'lucide-react';
import { ticketFormSchema, TicketFormData } from '@/lib/help-schemas';
import { ticketCategories, priorityLevels } from '@/data/helpData';
import { useToast } from '@/hooks/use-toast';

const SubmitTicketSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketFormSchema),
    mode: 'onChange'
  });

  const watchedCategory = watch('category');
  const watchedPriority = watch('priority');

  const generateTicketId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `LS-${timestamp}-${random}`.toUpperCase();
  };

  const onSubmit = async (data: TicketFormData) => {
    setIsSubmitting(true);
    
    // Simulate ticket submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const ticketId = generateTicketId();
    
    // Store ticket in localStorage for demo purposes
    const ticket = {
      id: ticketId,
      ...data,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const existingTickets = JSON.parse(localStorage.getItem('lensship_tickets') || '[]');
    existingTickets.unshift(ticket);
    localStorage.setItem('lensship_tickets', JSON.stringify(existingTickets));
    
    setSubmittedTicket(ticketId);
    
    toast({
      title: "Ticket submitted successfully!",
      description: `Your ticket ${ticketId} has been created. We'll update you via email.`,
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
    const fileInput = document.getElementById('ticket-file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-neon-green bg-neon-green/20';
      case 'medium': return 'text-neon-blue bg-neon-blue/20';
      case 'high': return 'text-neon-orange bg-neon-orange/20';
      case 'urgent': return 'text-destructive bg-destructive/20';
      default: return 'text-muted-foreground bg-muted/20';
    }
  };

  if (submittedTicket) {
    return (
      <GlassCard className="p-8 text-center">
        <CheckCircle2 className="w-16 h-16 text-neon-green mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-foreground mb-2">
          Ticket Submitted Successfully!
        </h3>
        <p className="text-muted-foreground mb-4">
          Your support ticket has been created with ID:
        </p>
        <div className="bg-neon-blue/20 border border-neon-blue/30 rounded-lg p-4 mb-6">
          <span className="text-neon-blue font-mono text-lg">{submittedTicket}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          We'll send updates to your email address. You can expect a response within 24 hours.
        </p>
        <Button
          onClick={() => setSubmittedTicket(null)}
          className="bg-neon-blue hover:bg-neon-blue/90 text-background"
        >
          Submit Another Ticket
        </Button>
      </GlassCard>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Ticket Information */}
      <div className="space-y-4">
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center">
              <Ticket className="w-5 h-5 text-neon-blue" />
            </div>
            <h3 className="font-semibold text-neon-blue">Support Ticket</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-neon-blue mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground">
                Submit a detailed ticket for complex issues that require investigation.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-neon-green mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground">
                You'll receive a ticket ID and email updates on progress.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-neon-orange mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground">
                Choose the right priority level to help us triage your issue.
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h4 className="font-semibold text-foreground mb-3">Response Times</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Low Priority:</span>
              <span className="text-neon-green">48-72 hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Medium Priority:</span>
              <span className="text-neon-blue">24-48 hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">High Priority:</span>
              <span className="text-neon-orange">12-24 hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Urgent:</span>
              <span className="text-destructive">2-6 hours</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Ticket Form */}
      <div className="lg:col-span-2">
        <GlassCard className="p-6">
          <h3 className="font-semibold text-foreground mb-6">Create Support Ticket</h3>
          
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
                placeholder="Brief description of the issue"
                className="bg-card/50 border-border/50 focus:border-neon-blue"
              />
              {errors.subject && (
                <p className="text-sm text-destructive">{errors.subject.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select onValueChange={(value) => setValue('category', value as any)}>
                  <SelectTrigger className="bg-card/50 border-border/50 focus:border-neon-blue">
                    <SelectValue placeholder="Select issue category" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border/50">
                    {ticketCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Priority Level *</Label>
                <Select onValueChange={(value) => setValue('priority', value as any)}>
                  <SelectTrigger className="bg-card/50 border-border/50 focus:border-neon-blue">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border/50">
                    {priorityLevels.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getPriorityColor(priority.value)}>
                            {priority.label}
                          </Badge>
                          <span className="text-xs text-muted-foreground ml-2">
                            {priority.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.priority && (
                  <p className="text-sm text-destructive">{errors.priority.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description *</Label>
              <Textarea
                {...register('description')}
                placeholder="Please provide a detailed description of the issue, including steps to reproduce, error messages, and any other relevant information..."
                rows={6}
                className="bg-card/50 border-border/50 focus:border-neon-blue resize-none"
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
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
                  onClick={() => document.getElementById('ticket-file-upload')?.click()}
                >
                  <Paperclip className="w-4 h-4 mr-2" />
                  Attach File
                </Button>
                <input
                  id="ticket-file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.log"
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
                Supported formats: PDF, DOC, TXT, PNG, JPG, LOG files (Max 10MB)
              </p>
            </div>

            {watchedPriority && (
              <div className="p-4 rounded-lg bg-card/30 border border-border/30">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getPriorityColor(watchedPriority)}>
                    {priorityLevels.find(p => p.value === watchedPriority)?.label}
                  </Badge>
                  <span className="text-sm font-medium">Expected Response Time</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {watchedPriority === 'low' && 'We typically respond to low priority tickets within 48-72 hours.'}
                  {watchedPriority === 'medium' && 'We typically respond to medium priority tickets within 24-48 hours.'}
                  {watchedPriority === 'high' && 'We typically respond to high priority tickets within 12-24 hours.'}
                  {watchedPriority === 'urgent' && 'We respond to urgent tickets within 2-6 hours. Please ensure this truly requires immediate attention.'}
                </p>
              </div>
            )}

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
                    <span>Creating Ticket...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>Submit Ticket</span>
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

export default SubmitTicketSection;