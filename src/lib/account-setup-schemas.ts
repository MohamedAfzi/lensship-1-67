import { z } from 'zod';

// Personal information validation schema
export const personalInfoSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  profilePhoto: z.string().optional(),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
  countryCode: z.string().default('+1'),
  dateOfBirth: z.string().optional(),
  bio: z.string().max(250, 'Bio must be less than 250 characters').optional(),
  address: z.string().min(5, 'Please enter a valid address'),
  emergencyContact: z.string().optional(),
});

// Store information validation schema
export const storeInfoSchema = z.object({
  storeName: z.string().min(2, 'Store name must be at least 2 characters'),
  storeCategory: z.string().min(1, 'Please select a store category'),
  storeSubcategory: z.string().min(1, 'Please select a subcategory'),
  storeTitle: z.string().max(100, 'Store title must be less than 100 characters').optional(),
  storeDescription: z.string().max(500, 'Description must be less than 500 characters').optional(),
  businessType: z.enum(['individual', 'small_business', 'company']),
  storeLogo: z.string().optional(),
  storeBanner: z.string().optional(),
  businessRegistrationNumber: z.string().optional(),
  taxId: z.string().optional(),
  websiteUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  instagramUrl: z.string().url('Please enter a valid Instagram URL').optional().or(z.literal('')),
  facebookUrl: z.string().url('Please enter a valid Facebook URL').optional().or(z.literal('')),
  twitterUrl: z.string().url('Please enter a valid Twitter URL').optional().or(z.literal('')),
});

// Preferences validation schema
export const preferencesSchema = z.object({
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  profileVisibility: z.enum(['public', 'private']).default('public'),
  shareContactInfo: z.boolean().default(false),
  language: z.string().default('en'),
  currency: z.string().default('USD'),
  shippingZones: z.array(z.string()).default([]),
  paymentMethods: z.array(z.string()).default([]),
  businessHours: z.object({
    monday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }).optional(),
    tuesday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }).optional(),
    wednesday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }).optional(),
    thursday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }).optional(),
    friday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }).optional(),
    saturday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }).optional(),
    sunday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }).optional(),
  }).optional(),
  autoResponses: z.boolean().default(false),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type StoreInfoFormData = z.infer<typeof storeInfoSchema>;
export type PreferencesFormData = z.infer<typeof preferencesSchema>;