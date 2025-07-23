import { z } from 'zod';

export const newDeliverySchema = z.object({
  productId: z.string().min(1, 'Please select a product'),
  buyerName: z.string().min(2, 'Buyer name must be at least 2 characters'),
  buyerPhone: z.string().min(10, 'Please enter a valid phone number'),
  deliveryAddress: z.string().min(10, 'Please enter a complete address'),
  region: z.string().min(1, 'Please select a region'),
  notes: z.string().optional(),
  paymentStatus: z.enum(['paid', 'cod']),
  receiptId: z.string().optional(),
  codAmount: z.number().optional(),
  deliveryExecutionType: z.enum(['personal', 'dropgo']),
  deliveryMethod: z.enum(['manual', 'qr']).optional(),
});

export type NewDeliveryForm = z.infer<typeof newDeliverySchema>;

export interface DeliveryQRData {
  type: 'pickup' | 'delivery';
  productId: string;
  sessionId: string;
  timestamp: number;
}

// Mock regions for now - in real app this would come from API
export const mockRegions = [
  { value: 'downtown', label: 'Downtown' },
  { value: 'midtown', label: 'Midtown' },
  { value: 'uptown', label: 'Uptown' },
  { value: 'eastside', label: 'Eastside' },
  { value: 'westside', label: 'Westside' },
  { value: 'suburb', label: 'Suburb' },
];