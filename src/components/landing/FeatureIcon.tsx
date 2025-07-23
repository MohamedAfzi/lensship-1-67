import React from 'react';
import { 
  Search, 
  Brain, 
  Zap, 
  Truck, 
  Package, 
  MapPin, 
  Shield, 
  Lock, 
  CheckCircle, 
  BarChart3, 
  TrendingUp, 
  Activity,
  LucideIcon 
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Feature category mapping with color coding
const featureIconMap: Record<string, { icon: LucideIcon; category: 'ai' | 'delivery' | 'security' | 'analytics' }> = {
  // AI/Recognition features
  'ai scans': { icon: Search, category: 'ai' },
  'recognition': { icon: Brain, category: 'ai' },
  'smart': { icon: Zap, category: 'ai' },
  'intelligence': { icon: Brain, category: 'ai' },
  'automated': { icon: Zap, category: 'ai' },
  
  // Delivery features
  'delivery': { icon: Truck, category: 'delivery' },
  'dropgo': { icon: Package, category: 'delivery' },
  'shipping': { icon: Truck, category: 'delivery' },
  'gps': { icon: MapPin, category: 'delivery' },
  'fulfillment': { icon: Package, category: 'delivery' },
  
  // Security features
  'security': { icon: Shield, category: 'security' },
  'encryption': { icon: Lock, category: 'security' },
  'qr': { icon: Shield, category: 'security' },
  'verification': { icon: CheckCircle, category: 'security' },
  'secure': { icon: Lock, category: 'security' },
  
  // Analytics features
  'analytics': { icon: BarChart3, category: 'analytics' },
  'dashboard': { icon: TrendingUp, category: 'analytics' },
  'monitoring': { icon: Activity, category: 'analytics' },
  'insights': { icon: BarChart3, category: 'analytics' },
  'performance': { icon: TrendingUp, category: 'analytics' },
};

const categoryColors = {
  ai: 'text-neon-blue',
  delivery: 'text-orange-400',
  security: 'text-neon-green',
  analytics: 'text-neon-purple',
};

interface FeatureIconProps {
  feature: string;
  className?: string;
  size?: number;
  animated?: boolean;
}

const FeatureIcon: React.FC<FeatureIconProps> = ({ 
  feature, 
  className, 
  size = 20,
  animated = true 
}) => {
  // Find the best matching icon based on feature text
  const findBestMatch = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Direct keyword matches
    for (const [keyword, config] of Object.entries(featureIconMap)) {
      if (lowerText.includes(keyword)) {
        return config;
      }
    }
    
    // Fallback to default
    return { icon: CheckCircle, category: 'security' as const };
  };

  const { icon: IconComponent, category } = findBestMatch(feature);
  const colorClass = categoryColors[category];

  return (
    <div className={cn(
      "flex-shrink-0 flex items-center justify-center",
      animated && "transition-all duration-300 group-hover:scale-110",
      className
    )}>
      <IconComponent 
        size={size} 
        className={cn(
          colorClass,
          animated && "transition-all duration-300",
          "drop-shadow-sm"
        )}
      />
    </div>
  );
};

export default FeatureIcon;