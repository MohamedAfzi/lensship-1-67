import { z } from 'zod';

export const deliveryAgentProfileSchema = z.object({
  name: z.string().min(2, 'Agent name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
});

export type DeliveryAgentProfile = z.infer<typeof deliveryAgentProfileSchema>;

export interface DeliveryAgentSettings {
  profile: DeliveryAgentProfile | null;
  isComplete: boolean;
}