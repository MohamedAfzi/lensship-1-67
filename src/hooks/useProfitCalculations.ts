import { useMemo } from 'react';
import { mockProducts } from '@/data/flowshipData';
import { FlowShipProduct } from '@/types/flowship';

interface ProfitMetrics {
  totalProfit: number;
  totalRevenue: number;
  profitMargin: number;
  monthlyGrowth: number;
  roi: number;
  riskyProducts: number;
  productProfits: Array<{
    id: string;
    name: string;
    profit: number;
    margin: number;
    category: string;
    supplierId: string;
  }>;
  categoryProfits: Array<{
    category: string;
    profit: number;
    margin: number;
    productCount: number;
  }>;
  supplierProfits: Array<{
    supplierId: string;
    profit: number;
    productCount: number;
  }>;
}

export const useProfitCalculations = (): ProfitMetrics => {
  return useMemo(() => {
    // Calculate profit for each product
    const productProfits = mockProducts.map((product: FlowShipProduct) => {
      const profit = product.originalPrice 
        ? (product.originalPrice - product.price) * (product.stockQuantity || 1)
        : 0;
      const margin = product.originalPrice 
        ? ((product.originalPrice - product.price) / product.originalPrice) * 100
        : 0;
      
      return {
        id: product.id,
        name: product.name,
        profit,
        margin,
        category: product.category,
        supplierId: product.supplierId,
      };
    });

    // Calculate total metrics
    const totalProfit = productProfits.reduce((sum, p) => sum + p.profit, 0);
    const totalRevenue = mockProducts.reduce((sum, p) => sum + (p.originalPrice || p.price) * (p.stockQuantity || 1), 0);
    const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
    
    // Calculate risky products (margin < 15%)
    const riskyProducts = productProfits.filter(p => p.margin < 15).length;

    // Calculate category profits
    const categoryMap = new Map<string, { profit: number; productCount: number; totalRevenue: number }>();
    productProfits.forEach(p => {
      const existing = categoryMap.get(p.category) || { profit: 0, productCount: 0, totalRevenue: 0 };
      const product = mockProducts.find(prod => prod.id === p.id);
      const revenue = (product?.originalPrice || product?.price || 0) * (product?.stockQuantity || 1);
      
      categoryMap.set(p.category, {
        profit: existing.profit + p.profit,
        productCount: existing.productCount + 1,
        totalRevenue: existing.totalRevenue + revenue
      });
    });

    const categoryProfits = Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      profit: data.profit,
      margin: data.totalRevenue > 0 ? (data.profit / data.totalRevenue) * 100 : 0,
      productCount: data.productCount
    }));

    // Calculate supplier profits
    const supplierMap = new Map<string, { profit: number; productCount: number }>();
    productProfits.forEach(p => {
      const existing = supplierMap.get(p.supplierId) || { profit: 0, productCount: 0 };
      supplierMap.set(p.supplierId, {
        profit: existing.profit + p.profit,
        productCount: existing.productCount + 1
      });
    });

    const supplierProfits = Array.from(supplierMap.entries()).map(([supplierId, data]) => ({
      supplierId,
      profit: data.profit,
      productCount: data.productCount
    }));

    // Simulate monthly growth (would be calculated from historical data in real app)
    const monthlyGrowth = Math.random() * 20 - 5; // Random between -5% and 15%
    
    // Calculate ROI (simplified calculation)
    const totalInvestment = mockProducts.reduce((sum, p) => sum + p.price * (p.stockQuantity || 1), 0);
    const roi = totalInvestment > 0 ? (totalProfit / totalInvestment) * 100 : 0;

    return {
      totalProfit,
      totalRevenue,
      profitMargin,
      monthlyGrowth,
      roi,
      riskyProducts,
      productProfits,
      categoryProfits,
      supplierProfits
    };
  }, []);
};