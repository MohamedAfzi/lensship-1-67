import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Ticket submission validation schema
export const ticketFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  category: z.enum(['technical', 'billing', 'account', 'feature-request', 'bug-report', 'other'], {
    required_error: 'Please select a category'
  }),
  priority: z.enum(['low', 'medium', 'high', 'urgent'], {
    required_error: 'Please select a priority level'
  }),
  description: z.string().min(20, 'Description must be at least 20 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type TicketFormData = z.infer<typeof ticketFormSchema>;