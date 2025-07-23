import { useMemo, useState } from 'react';
import { InventoryProduct } from '@/types/product';
import { mockInventoryProducts } from '@/data/mockProducts';
import { isWithinInterval, subDays } from 'date-fns';

export interface InventoryFilters {
  dateRange: { start: Date; end: Date } | null;
  categories: string[];
  stores: string[];
}

export interface InventoryMetrics {
  totalValue: number;
  totalItems: number;
  averageItemValue: number;
  publishedValue: number;
  outOfStockValue: number;
  categoryBreakdown: Array<{
    category: string;
    value: number;
    count: number;
    percentage: number;
  }>;
  storeBreakdown: Array<{
    store: string;
    value: number;
    count: number;
    percentage: number;
  }>;
  topValueProducts: InventoryProduct[];
  lowStockProducts: InventoryProduct[];
  stockTurnoverRate: number;
}

export interface InventoryTrendData {
  date: string;
  value: number;
  published: number;
  outOfStock: number;
}

export const useInventoryCalculations = () => {
  const products = mockInventoryProducts;
  
  const [filters, setFilters] = useState<InventoryFilters>({
    dateRange: null,
    categories: [],
    stores: [],
  });

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }
      
      // Store filter
      if (filters.stores.length > 0 && !filters.stores.includes(product.storeName)) {
        return false;
      }
      
      // Date range filter (for demonstration, we'll use a mock createdAt date)
      if (filters.dateRange) {
        // Mock: assume products were created in the last 30 days randomly
        const mockCreatedAt = subDays(new Date(), Math.floor(Math.random() * 30));
        if (!isWithinInterval(mockCreatedAt, filters.dateRange)) {
          return false;
        }
      }
      
      return true;
    });
  }, [products, filters]);

  const metrics = useMemo<InventoryMetrics>(() => {
    const totalValue = filteredProducts.reduce((sum, product) => 
      sum + (product.price * product.stockQuantity), 0
    );
    
    const totalItems = filteredProducts.reduce((sum, product) => sum + product.stockQuantity, 0);
    const averageItemValue = totalValue / Math.max(totalItems, 1);
    
    const publishedProducts = filteredProducts.filter(p => p.status === 'published');
    const outOfStockProducts = filteredProducts.filter(p => p.status === 'out_of_stock');
    
    const publishedValue = publishedProducts.reduce((sum, product) => 
      sum + (product.price * product.stockQuantity), 0
    );
    
    const outOfStockValue = outOfStockProducts.reduce((sum, product) => 
      sum + (product.price * product.stockQuantity), 0
    );

    // Category breakdown
    const categoryMap = new Map<string, { value: number; count: number }>();
    filteredProducts.forEach(product => {
      const current = categoryMap.get(product.category) || { value: 0, count: 0 };
      current.value += product.price * product.stockQuantity;
      current.count += product.stockQuantity;
      categoryMap.set(product.category, current);
    });

    const categoryBreakdown = Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      value: data.value,
      count: data.count,
      percentage: totalValue > 0 ? (data.value / totalValue) * 100 : 0,
    })).sort((a, b) => b.value - a.value);

    // Store breakdown
    const storeMap = new Map<string, { value: number; count: number }>();
    filteredProducts.forEach(product => {
      const current = storeMap.get(product.storeName) || { value: 0, count: 0 };
      current.value += product.price * product.stockQuantity;
      current.count += product.stockQuantity;
      storeMap.set(product.storeName, current);
    });

    const storeBreakdown = Array.from(storeMap.entries()).map(([store, data]) => ({
      store,
      value: data.value,
      count: data.count,
      percentage: totalValue > 0 ? (data.value / totalValue) * 100 : 0,
    })).sort((a, b) => b.value - a.value);

    // Top value products
    const topValueProducts = [...filteredProducts]
      .sort((a, b) => (b.price * b.stockQuantity) - (a.price * a.stockQuantity))
      .slice(0, 5);

    // Low stock products (stock quantity < 10)
    const lowStockProducts = filteredProducts.filter(p => p.stockQuantity < 10 && p.stockQuantity > 0);

    // Mock stock turnover rate
    const stockTurnoverRate = 0.75; // 75% turnover rate

    return {
      totalValue,
      totalItems,
      averageItemValue,
      publishedValue,
      outOfStockValue,
      categoryBreakdown,
      storeBreakdown,
      topValueProducts,
      lowStockProducts,
      stockTurnoverRate,
    };
  }, [filteredProducts]);

  const trendData = useMemo<InventoryTrendData[]>(() => {
    // Generate mock trend data for the last 30 days based on filtered data
    const days = filters.dateRange ? 
      Math.ceil((filters.dateRange.end.getTime() - filters.dateRange.start.getTime()) / (1000 * 60 * 60 * 24)) + 1 : 
      30;
    const baseValue = metrics.totalValue;
    
    return Array.from({ length: Math.min(days, 30) }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (Math.min(days, 30) - 1 - i));
      
      // Add some realistic variance
      const variance = 0.1; // 10% variance
      const randomFactor = 1 + (Math.random() - 0.5) * variance;
      const trendFactor = 1 + (i / Math.min(days, 30)) * 0.05; // 5% growth trend
      
      const totalValue = baseValue * randomFactor * trendFactor;
      const published = totalValue * 0.85; // 85% published
      const outOfStock = totalValue * 0.15; // 15% out of stock
      
      return {
        date: date.toISOString().split('T')[0],
        value: Math.round(totalValue),
        published: Math.round(published),
        outOfStock: Math.round(outOfStock),
      };
    });
  }, [metrics.totalValue, filters.dateRange]);

  // Get unique categories and stores for filter options
  const availableCategories = useMemo(() => 
    [...new Set(products.map(p => p.category))].sort(), 
    [products]
  );
  
  const availableStores = useMemo(() => 
    [...new Set(products.map(p => p.storeName))].sort(), 
    [products]
  );

  return { 
    metrics, 
    trendData, 
    filters, 
    setFilters,
    availableCategories,
    availableStores,
  };
};