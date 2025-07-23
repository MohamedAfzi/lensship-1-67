import React from 'react';
import { GlassCard } from '@/components/glass/GlassCard';
import { 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Target, 
  DollarSign,
  Package,
  Users,
  ShoppingCart
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface OptimizationSuggestion {
  id: string;
  type: 'high' | 'medium' | 'low';
  category: 'pricing' | 'inventory' | 'supplier' | 'product';
  title: string;
  description: string;
  impact: string;
  action: string;
  icon: React.ReactNode;
}

const suggestions: OptimizationSuggestion[] = [
  {
    id: '1',
    type: 'high',
    category: 'pricing',
    title: 'Optimize Electronics Pricing',
    description: 'Samsung Galaxy A54 and iPhone 15 Pro have room for 15-20% price increase based on market analysis.',
    impact: '+YER 85,000/month',
    action: 'Adjust pricing strategy',
    icon: <TrendingUp className="h-5 w-5" />
  },
  {
    id: '2',
    type: 'high',
    category: 'inventory',
    title: 'Reduce Low-Margin Products',
    description: 'Sports & Outdoor category shows 18.4% margin. Consider focusing on higher-margin alternatives.',
    impact: '+12% overall margin',
    action: 'Review product mix',
    icon: <Package className="h-5 w-5" />
  },
  {
    id: '3',
    type: 'medium',
    category: 'supplier',
    title: 'Negotiate Better Terms',
    description: 'Al-Hidaa Supermarket provides high volume. Negotiate for better wholesale pricing.',
    impact: '+YER 45,000/month',
    action: 'Contact supplier',
    icon: <Users className="h-5 w-5" />
  },
  {
    id: '4',
    type: 'medium',
    category: 'product',
    title: 'Expand Home & Garden',
    description: 'Home & Garden shows strong 22.8% margins with growing demand. Consider expanding inventory.',
    impact: '+YER 35,000/month',
    action: 'Increase stock',
    icon: <ShoppingCart className="h-5 w-5" />
  },
  {
    id: '5',
    type: 'low',
    category: 'inventory',
    title: 'Clear Slow-Moving Stock',
    description: 'Some clothing items have been in inventory for 60+ days. Consider promotional pricing.',
    impact: '+YER 15,000 one-time',
    action: 'Run promotions',
    icon: <AlertTriangle className="h-5 w-5" />
  }
];

const typeColors = {
  high: 'bg-destructive/10 text-destructive border-destructive/20',
  medium: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  low: 'bg-muted/50 text-muted-foreground border-border'
};

const categoryIcons = {
  pricing: <DollarSign className="h-4 w-4" />,
  inventory: <Package className="h-4 w-4" />,
  supplier: <Users className="h-4 w-4" />,
  product: <ShoppingCart className="h-4 w-4" />
};

export const ProfitOptimizationSuggestions: React.FC = () => {
  return (
    <GlassCard variant="glow" className="p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Lightbulb className="h-5 w-5 text-neon-blue" />
          <h3 className="text-lg font-semibold text-foreground">Profit Optimization Suggestions</h3>
        </div>
        <p className="text-sm text-muted-foreground">AI-powered recommendations to maximize your profit margins</p>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div 
            key={suggestion.id}
            className="p-4 rounded-lg border border-border/50 bg-card/30 hover:bg-card/50 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  {suggestion.icon}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground">{suggestion.title}</h4>
                    <Badge className={typeColors[suggestion.type]} variant="outline">
                      {suggestion.type.toUpperCase()} IMPACT
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {categoryIcons[suggestion.category]}
                      <span className="ml-1 capitalize">{suggestion.category}</span>
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3">
              {suggestion.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="text-muted-foreground">Potential Impact: </span>
                  <span className="font-semibold text-neon-green">{suggestion.impact}</span>
                </div>
              </div>
              <button className="px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors">
                {suggestion.action}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-neon-blue/5 border border-neon-blue/20">
        <div className="flex items-center space-x-2 mb-2">
          <Target className="h-4 w-4 text-neon-blue" />
          <h4 className="font-medium text-foreground">Total Optimization Potential</h4>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          Implementing all high and medium priority suggestions could increase monthly profit by:
        </p>
        <div className="text-2xl font-bold text-neon-blue">+YER 165,000/month</div>
        <div className="text-sm text-muted-foreground">
          That's a potential 83% increase in monthly profits
        </div>
      </div>
    </GlassCard>
  );
};