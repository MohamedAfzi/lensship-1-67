export interface FAQItem {
  question: string;
  answer: string;
  category: 'getting-started' | 'account' | 'payments' | 'technical' | 'features';
  priority?: 'high' | 'medium' | 'low';
}

export interface ContactInfo {
  email: string;
  phone: string;
  supportHours: string;
  responseTime: string;
}

export interface TicketFormData {
  name: string;
  email: string;
  subject: string;
  category: 'technical' | 'billing' | 'account' | 'feature-request' | 'bug-report' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  description: string;
  attachment?: File;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  attachment?: File;
}

export interface SystemStatus {
  service: string;
  status: 'online' | 'degraded' | 'offline' | 'maintenance';
  description: string;
  lastUpdated: string;
  icon: string;
}

export interface Resource {
  title: string;
  description: string;
  type: 'video' | 'pdf' | 'link' | 'guide';
  url: string;
  icon: string;
}

export interface Ticket {
  id: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdAt: string;
  updatedAt: string;
}