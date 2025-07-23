import { FAQItem, ContactInfo, SystemStatus, Resource } from '@/types/help';

export const helpFAQs: FAQItem[] = [
  // Getting Started
  {
    question: "How do I get started with LensShip?",
    answer: "Getting started is easy! First, download the app and create your account. Complete the onboarding process by setting up your store profile, then start scanning products with our AI-powered camera. You can also browse our FlowShip marketplace to find products to dropship.",
    category: "getting-started",
    priority: "high"
  },
  {
    question: "What devices are compatible with LensShip?",
    answer: "LensShip works on iOS 12+ and Android 8+. For optimal camera scanning performance, we recommend devices with at least 8MP cameras. The app also has a responsive web version for desktop management.",
    category: "getting-started",
    priority: "high"
  },
  {
    question: "How accurate is the AI product recognition?",
    answer: "Our computer vision AI achieves 90%+ accuracy across 100,000+ product categories. It gets smarter with each scan, learning from user corrections and new product data.",
    category: "getting-started",
    priority: "high"
  },

  // Account Management
  {
    question: "How do I update my profile information?",
    answer: "Go to Settings > User Settings to update your personal information, store details, and preferences. Changes are saved automatically and sync across all your devices.",
    category: "account",
    priority: "medium"
  },
  {
    question: "Can I have multiple stores under one account?",
    answer: "Currently, each account supports one store profile. For multiple stores, you'll need separate accounts. Enterprise solutions for multi-store management are coming soon.",
    category: "account",
    priority: "medium"
  },
  {
    question: "How do I delete my account?",
    answer: "To delete your account, go to Settings > User Settings > Account Management. This action is permanent and will remove all your data, listings, and analytics.",
    category: "account",
    priority: "low"
  },

  // Payments & Billing
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, PayPal, and local payment methods in Yemen including mobile money. Enterprise customers can also use bank transfers.",
    category: "payments",
    priority: "high"
  },
  {
    question: "How does the subscription billing work?",
    answer: "Subscriptions are billed monthly or annually based on your chosen plan. You can upgrade, downgrade, or cancel anytime. Pro-rated billing applies when changing plans mid-cycle.",
    category: "payments",
    priority: "medium"
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee for all paid plans. Refunds are processed within 5-7 business days to your original payment method.",
    category: "payments",
    priority: "medium"
  },

  // Technical Issues
  {
    question: "The camera scanning isn't working properly. What should I do?",
    answer: "First, ensure you've granted camera permissions. Clean your camera lens and ensure good lighting. If issues persist, restart the app or try scanning in better lighting conditions. Contact support if problems continue.",
    category: "technical",
    priority: "high"
  },
  {
    question: "My app is running slowly. How can I fix this?",
    answer: "Try closing other apps, restarting your device, or clearing the app cache. Ensure you have the latest app version installed. For persistent issues, check your internet connection and available storage space.",
    category: "technical",
    priority: "medium"
  },
  {
    question: "How do I sync my data across devices?",
    answer: "Data automatically syncs when you're logged in with the same account and have an internet connection. Manual sync can be triggered in Settings > Data & Storage > Sync Now.",
    category: "technical",
    priority: "medium"
  },
  {
    question: "What happens if my internet connection fails during scanning?",
    answer: "Our offline-first architecture lets you scan, process, and queue operations without internet. Everything syncs automatically when you reconnect, with zero data loss.",
    category: "technical",
    priority: "low"
  },

  // App Features
  {
    question: "What is FlowShip and how does it work?",
    answer: "FlowShip is our integrated dropshipping platform connecting you with 500+ verified suppliers across all 20 Yemeni governorates. Browse products from commercial hubs and independent sellers, import with one click, and start selling without holding inventory.",
    category: "features",
    priority: "high"
  },
  {
    question: "How does the DropGo delivery network ensure security?",
    answer: "Every delivery uses military-grade encrypted QR codes with time-based authentication. Drivers are verified with background checks, and all handoffs are GPS-tracked with photo confirmation.",
    category: "features",
    priority: "high"
  },
  {
    question: "Can I customize pricing and profit margins?",
    answer: "Absolutely! Set custom pricing rules, dynamic profit margins, seasonal adjustments, and bulk discounts. Our AI suggests optimal pricing based on market trends and competitor analysis.",
    category: "features",
    priority: "medium"
  },
  {
    question: "How do I track my delivery performance and analytics?",
    answer: "Access real-time dashboards showing delivery success rates, customer satisfaction scores, revenue analytics, and performance insights. Export reports and set up custom alerts.",
    category: "features",
    priority: "medium"
  },
  {
    question: "Can I integrate my existing inventory management system?",
    answer: "Yes! LensShip offers seamless API integration with popular platforms like Shopify, WooCommerce, and custom inventory systems. Data syncs in real-time.",
    category: "features",
    priority: "low"
  }
];

export const contactInfo: ContactInfo = {
  email: "support@lensship.com",
  phone: "+967 1 234 567",
  supportHours: "Sunday - Thursday: 9:00 AM - 6:00 PM (Yemen Time)",
  responseTime: "Within 24 hours"
};

export const systemStatuses: SystemStatus[] = [
  {
    service: "API & Core Services",
    status: "online",
    description: "All systems operational",
    lastUpdated: new Date().toISOString(),
    icon: "server"
  },
  {
    service: "Payment Processing",
    status: "online",
    description: "All payment gateways functioning normally",
    lastUpdated: new Date().toISOString(),
    icon: "credit-card"
  },
  {
    service: "Camera & Scanning",
    status: "online",
    description: "AI recognition services operating normally",
    lastUpdated: new Date().toISOString(),
    icon: "camera"
  },
  {
    service: "FlowShip Marketplace",
    status: "online",
    description: "All supplier connections active",
    lastUpdated: new Date().toISOString(),
    icon: "shopping-bag"
  },
  {
    service: "Database & Analytics",
    status: "online",
    description: "Data services running smoothly",
    lastUpdated: new Date().toISOString(),
    icon: "database"
  },
  {
    service: "Mobile Push Notifications",
    status: "online",
    description: "Notification services operational",
    lastUpdated: new Date().toISOString(),
    icon: "bell"
  }
];

export const helpResources: Resource[] = [
  {
    title: "Quick Start Guide",
    description: "Get up and running with LensShip in under 10 minutes",
    type: "guide",
    url: "/guides/quick-start",
    icon: "rocket"
  },
  {
    title: "Product Scanning Tutorial",
    description: "Master the art of AI-powered product recognition",
    type: "video",
    url: "https://youtube.com/watch?v=demo1",
    icon: "play-circle"
  },
  {
    title: "FlowShip Supplier Guide",
    description: "Complete guide to finding and working with suppliers",
    type: "pdf",
    url: "/docs/flowship-guide.pdf",
    icon: "file-text"
  },
  {
    title: "API Documentation",
    description: "Technical documentation for developers",
    type: "link",
    url: "https://docs.lensship.com/api",
    icon: "code"
  },
  {
    title: "Video Tutorials Playlist",
    description: "Complete video course covering all features",
    type: "video",
    url: "https://youtube.com/playlist?list=demo",
    icon: "youtube"
  },
  {
    title: "Best Practices Guide",
    description: "Tips and tricks for maximizing your success",
    type: "pdf",
    url: "/docs/best-practices.pdf",
    icon: "lightbulb"
  }
];

export const ticketCategories = [
  { value: 'technical', label: 'Technical Issue' },
  { value: 'billing', label: 'Billing & Payments' },
  { value: 'account', label: 'Account Management' },
  { value: 'feature-request', label: 'Feature Request' },
  { value: 'bug-report', label: 'Bug Report' },
  { value: 'other', label: 'Other' }
];

export const priorityLevels = [
  { value: 'low', label: 'Low', description: 'General inquiry, no urgency' },
  { value: 'medium', label: 'Medium', description: 'Affects workflow but not critical' },
  { value: 'high', label: 'High', description: 'Significant impact on business' },
  { value: 'urgent', label: 'Urgent', description: 'Critical issue requiring immediate attention' }
];