
export interface HelpContextConfig {
  title: string;
  description: string;
  faqCategories: string[];
  supportChannels: Array<{
    type: 'email' | 'phone' | 'chat';
    label: string;
    value: string;
    available: string;
  }>;
  quickLinks: Array<{
    label: string;
    href: string;
    icon: string;
  }>;
}

export const helpConfigs: Record<string, HelpContextConfig> = {
  'product-scanning-and-discovery': {
    title: 'LensShip Help & Support',
    description: 'Get help with product scanning, discovery, and inventory management',
    faqCategories: ['scanning', 'product-discovery', 'inventory', 'pricing', 'api'],
    supportChannels: [
      { type: 'email', label: 'Email Support', value: 'support@lensship.com', available: '24/7' },
      { type: 'phone', label: 'Phone Support', value: '+967 1 234 567', available: 'Mon-Fri 9AM-6PM' },
      { type: 'chat', label: 'Live Chat', value: 'Available now', available: '24/7' }
    ],
    quickLinks: [
      { label: 'Getting Started Guide', href: '/help/getting-started', icon: '🚀' },
      { label: 'Scanning Tutorial', href: '/help/scanning', icon: '📱' },
      { label: 'API Documentation', href: '/help/api', icon: '💻' }
    ]
  },
  'dropshipping-and-suppliers': {
    title: 'FlowShip Help & Support',
    description: 'Get help with dropshipping, suppliers, and order management',
    faqCategories: ['suppliers', 'dropshipping', 'orders', 'payments', 'analytics'],
    supportChannels: [
      { type: 'email', label: 'Email Support', value: 'support@flowship.com', available: '24/7' },
      { type: 'phone', label: 'Phone Support', value: '+967 1 234 568', available: 'Mon-Fri 9AM-6PM' },
      { type: 'chat', label: 'Live Chat', value: 'Available now', available: '24/7' }
    ],
    quickLinks: [
      { label: 'Supplier Onboarding', href: '/help/suppliers', icon: '🤝' },
      { label: 'Order Management', href: '/help/orders', icon: '📦' },
      { label: 'Market Analytics', href: '/help/analytics', icon: '📊' }
    ]
  },
  'delivery-and-logistics': {
    title: 'DropGo Help & Support',
    description: 'Get help with deliveries, tracking, and logistics management',
    faqCategories: ['delivery', 'tracking', 'drivers', 'coverage', 'pricing'],
    supportChannels: [
      { type: 'email', label: 'Email Support', value: 'support@dropgo.com', available: '24/7' },
      { type: 'phone', label: 'Phone Support', value: '+967 1 234 569', available: 'Mon-Fri 9AM-6PM' },
      { type: 'chat', label: 'Live Chat', value: 'Available now', available: '24/7' }
    ],
    quickLinks: [
      { label: 'Delivery Guide', href: '/help/delivery', icon: '🚚' },
      { label: 'Driver Portal', href: '/help/drivers', icon: '👤' },
      { label: 'Coverage Areas', href: '/help/coverage', icon: '🗺️' }
    ]
  }
};
