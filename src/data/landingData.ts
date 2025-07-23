import { 
  Search, 
  FileText, 
  Truck, 
  Shield, 
  BarChart3, 
  Wifi,
  Camera,
  CheckCircle,
  Workflow,
  Network,
  Building2
} from 'lucide-react';

export const features = [
  {
    id: "ai-scan",
    icon: Search,
    title: "AI-Powered Product Recognition",
    description: "90% accuracy rate with instant product identification using advanced computer vision and machine learning algorithms.",
    route: '/camera-scan'
  },
  {
    id: "auto-invoice",
    icon: FileText,
    title: "Smart Invoice Generation",
    description: "Automated cost calculation, dynamic profit margins, tax computation, and shipping optimization in under 2 seconds.",
    route: '/new-listing'
  },
  {
    id: "flowship-dropshipping",
    icon: Workflow,
    title: "FlowShip Dropshipping Network",
    description: "Access 500+ verified suppliers across all 20 Yemeni governorates with one-click product import and seamless fulfillment.",
    route: '/flowship'
  },
  {
    id: "dropgo-delivery",
    icon: Truck,
    title: "DropGo Delivery Network",
    description: "Connect with 50,000+ verified delivery partners across major cities with real-time GPS tracking and delivery guarantees.",
    route: '/orders/new'
  },
  {
    id: "qr-security",
    icon: Shield,
    title: "Encrypted QR Verification",
    description: "Military-grade encryption with time-based OTP codes for 100% secure product handoff and fraud prevention."
  },
  {
    id: "dashboard",
    icon: BarChart3,
    title: "Real-Time Analytics Hub",
    description: "Live inventory tracking, sales forecasting, profit analysis, and performance insights with customizable KPI dashboards.",
    route: '/'
  },
  {
    id: "offline-mode",
    icon: Wifi,
    title: "Offline-First Architecture", 
    description: "Complete functionality without internet - scan, process, and queue operations with automatic sync when connected."
  }
];

export const steps = [
  {
    icon: Camera,
    title: "AI Scan & Recognition",
    description: "Point your camera at any product for instant AI-powered identification with 90%+ accuracy rate and automatic data extraction.",
    route: '/camera-scan'
  },
  {
    icon: FileText,
    title: "Smart Configuration",
    description: "Auto-generated pricing, profit optimization, inventory sync, and DropGo delivery assignment in under 2 seconds.",
    route: '/new-listing'
  },
  {
    icon: CheckCircle,
    title: "Secure Fulfillment",
    description: "Military-grade QR verification, real-time GPS tracking, and automated delivery confirmation through DropGo network.",
    route: '/orders/deliveries'
  }
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    features: ["100 AI scans/month", "Basic QR generation", "Community support", "Offline mode", "1 delivery agent"],
    cta: "Start Free Trial",
    popular: false,
    actionType: 'navigate' as const,
    actionRoute: '/register'
  },
  {
    name: "Professional",
    price: "$29",
    period: "/month",
    features: ["1,000 AI scans/month", "FlowShip access (Basic)", "50 DropGo delivery credits", "Advanced analytics", "Priority support", "Unlimited delivery agents", "Custom branding"],
    cta: "Get Professional",
    popular: true,
    actionType: 'modal' as const,
    actionData: { type: 'pricing', plan: 'professional' }
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Unlimited AI scans", "FlowShip access (Premium)", "Unlimited DropGo credits", "White-label solution", "Dedicated account manager", "API access", "Custom integrations"],
    cta: "Contact Sales",
    popular: false,
    actionType: 'modal' as const,
    actionData: { type: 'contact', contactType: 'sales' }
  }
];

export const faqs = [
  {
    question: "How accurate is the AI product recognition?",
    answer: "Our computer vision AI achieves 90%+ accuracy across 100,000+ product categories. It gets smarter with each scan, learning from user corrections and new product data."
  },
  {
    question: "What is FlowShip and how does it work?",
    answer: "FlowShip is our integrated dropshipping platform connecting you with 500+ verified suppliers across all 20 Yemeni governorates. Browse products from commercial hubs and independent sellers, import with one click, and start selling without holding inventory."
  },
  {
    question: "Can I integrate my existing inventory management system?",
    answer: "Yes! LensShip offers seamless API integration with popular platforms like Shopify, WooCommerce, and custom inventory systems. Data syncs in real-time."
  },
  {
    question: "How does the DropGo delivery network ensure security?",
    answer: "Every delivery uses military-grade encrypted QR codes with time-based authentication. Drivers are verified with background checks, and all handoffs are GPS-tracked with photo confirmation."
  },
  {
    question: "What happens if my internet connection fails during scanning?",
    answer: "Our offline-first architecture lets you scan, process, and queue operations without internet. Everything syncs automatically when you reconnect, with zero data loss."
  },
  {
    question: "Can I customize pricing and profit margins?",
    answer: "Absolutely! Set custom pricing rules, dynamic profit margins, seasonal adjustments, and bulk discounts. Our AI suggests optimal pricing based on market trends and competitor analysis."
  },
  {
    question: "How do I track my delivery performance and analytics?",
    answer: "Access real-time dashboards showing delivery success rates, customer satisfaction scores, revenue analytics, and performance insights. Export reports and set up custom alerts."
  }
];