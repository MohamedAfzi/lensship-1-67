
export interface ServiceNavigationConfig {
  serviceLinks: Array<{
    label: string;
    href: string;
    description?: string;
  }>;
  productLinks: Array<{
    label: string;
    href: string;
    description?: string;
  }>;
  helpContext: string;
  serviceName: string;
  serviceSlug: string;
}

export const navigationConfigs: Record<string, ServiceNavigationConfig> = {
  lensship: {
    serviceName: 'LensShip',
    serviceSlug: 'lensship',
    helpContext: 'product-scanning-and-discovery',
    serviceLinks: [
      { label: 'Features', href: '#features', description: 'Discover our key features' },
      { label: 'How It Works', href: '#how-it-works', description: 'Learn how LensShip works' },
      { label: 'Pricing', href: '#pricing', description: 'View our pricing plans' },
      { label: 'API', href: '#api', description: 'Access our developer API' }
    ],
    productLinks: [
      { label: 'Product Discovery', href: '#discovery', description: 'Smart product identification' },
      { label: 'Smart Scanning', href: '#scanning', description: 'AI-powered image scanning' },
      { label: 'Analytics', href: '#analytics', description: 'Comprehensive analytics dashboard' }
    ]
  },
  flowship: {
    serviceName: 'FlowShip',
    serviceSlug: 'flowship',
    helpContext: 'dropshipping-and-suppliers',
    serviceLinks: [
      { label: 'Suppliers', href: '#suppliers', description: 'Connect with verified suppliers' },
      { label: 'Analytics', href: '#analytics', description: 'Market trend analysis' },
      { label: 'Fulfillment', href: '#fulfillment', description: 'Automated order fulfillment' }
    ],
    productLinks: [
      { label: 'Supplier Network', href: '#network', description: 'Global supplier ecosystem' },
      { label: 'Market Tools', href: '#tools', description: 'Business intelligence tools' },
      { label: 'Order Management', href: '#orders', description: 'Streamlined order processing' }
    ]
  },
  dropgo: {
    serviceName: 'DropGo',
    serviceSlug: 'dropgo',
    helpContext: 'delivery-and-logistics',
    serviceLinks: [
      { label: 'Coverage', href: '#coverage', description: 'View delivery coverage areas' },
      { label: 'Tracking', href: '#tracking', description: 'Real-time package tracking' },
      { label: 'Drivers', href: '#drivers', description: 'Join our driver network' }
    ],
    productLinks: [
      { label: 'Delivery Solutions', href: '#solutions', description: 'Comprehensive delivery options' },
      { label: 'Real-time Tracking', href: '#realtime', description: 'Live delivery updates' },
      { label: 'Fleet Management', href: '#fleet', description: 'Manage your delivery fleet' }
    ]
  }
};

export const globalNavigationLinks = {
  company: [
    { label: 'About', href: '/about', description: 'Learn about our company' },
    { label: 'Careers', href: '/careers', description: 'Join our team' },
    { label: 'Blog', href: '/blog', description: 'Read our latest updates' },
    { label: 'Contact', href: '/contact', description: 'Get in touch with us' }
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy', description: 'Our privacy commitment' },
    { label: 'Terms of Use', href: '/terms', description: 'Terms and conditions' },
    { label: 'Security', href: '/security', description: 'Security information' }
  ]
};
