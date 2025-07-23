import { Store, Building2, ShoppingBag, ShoppingCart, User } from 'lucide-react';
import type { Supplier } from '@/types/flowship';

export interface EntityTypeConfig {
  color: string;
  colorName: string;
  icon: typeof Store;
  label: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  hoverShadow: string;
}

export const entityTypeConfigs: Record<string, EntityTypeConfig> = {
  retailSeller: {
    color: 'neon-green',
    colorName: 'green',
    icon: User,
    label: 'Retail Seller',
    gradientFrom: 'from-neon-green',
    gradientTo: 'to-neon-green/80',
    borderColor: 'border-neon-green/30',
    hoverShadow: 'hover:shadow-neon-green/30',
  },
  shoppingCenter: {
    color: 'neon-blue',
    colorName: 'blue',
    icon: Building2,
    label: 'Shopping Center',
    gradientFrom: 'from-neon-blue',
    gradientTo: 'to-neon-blue/80',
    borderColor: 'border-neon-blue/30',
    hoverShadow: 'hover:shadow-neon-blue/30',
  },
  commercialMall: {
    color: 'neon-purple',
    colorName: 'purple',
    icon: ShoppingBag,
    label: 'Commercial Mall',
    gradientFrom: 'from-neon-purple',
    gradientTo: 'to-neon-purple/80',
    borderColor: 'border-neon-purple/30',
    hoverShadow: 'hover:shadow-neon-purple/30',
  },
  supermarket: {
    color: 'neon-orange',
    colorName: 'orange',
    icon: ShoppingCart,
    label: 'Supermarket',
    gradientFrom: 'from-neon-orange',
    gradientTo: 'to-neon-orange/80',
    borderColor: 'border-neon-orange/30',
    hoverShadow: 'hover:shadow-neon-orange/30',
  },
};

export const getEntityTypeConfig = (entityType: string): EntityTypeConfig => {
  return entityTypeConfigs[entityType] || entityTypeConfigs.retailSeller;
};

export const getEntityTypeStyles = (supplier: Supplier) => {
  const config = getEntityTypeConfig(supplier.entityType);
  
  return {
    config,
    primaryColor: `text-${config.color}`,
    bgGradient: `bg-gradient-to-br from-${config.color}/20 to-${config.color}/10`,
    borderTheme: `border-3 ${config.borderColor}`,
    buttonGradient: `bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo}`,
    buttonHover: `hover:${config.gradientFrom}/90 hover:${config.gradientTo}/70`,
    outlineBorder: config.borderColor,
    outlineText: `text-${config.color}`,
    outlineHover: `hover:bg-${config.color}/10 hover:${config.borderColor.replace('/30', '/50')}`,
    verifiedBg: `bg-${config.color}/10`,
    verifiedText: `text-${config.color}`,
    verifiedBorder: `border-${config.color}/20`,
    cardHover: `hover:shadow-lg ${config.hoverShadow}`,
    statColor: `text-${config.color}`,
  };
};