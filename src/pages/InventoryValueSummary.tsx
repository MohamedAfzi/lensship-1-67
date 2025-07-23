import { useRef } from 'react';
import BackButton from '@/components/navigation/BackButton';
import { useInventoryCalculations } from '@/hooks/useInventoryCalculations';
import { InventoryValueCards } from '@/components/inventory/InventoryValueCards';
import { InventoryTrendChart } from '@/components/inventory/InventoryTrendChart';
import { CategoryBreakdownChart } from '@/components/inventory/CategoryBreakdownChart';
import { TopValueProducts } from '@/components/inventory/TopValueProducts';
import { InventoryHealthMetrics } from '@/components/inventory/InventoryHealthMetrics';
import { InventoryFilters } from '@/components/inventory/InventoryFilters';
import { InventoryExport } from '@/components/inventory/InventoryExport';

const InventoryValueSummary = () => {
  const { 
    metrics, 
    trendData, 
    filters, 
    setFilters, 
    availableCategories, 
    availableStores 
  } = useInventoryCalculations();
  
  const dashboardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-6">
          <BackButton />
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Inventory Value Summary</h1>
            <p className="text-muted-foreground">
              Comprehensive analytics and insights for your inventory valuation
            </p>
          </div>
          <InventoryExport metrics={metrics} dashboardRef={dashboardRef} />
        </div>

        <InventoryFilters 
          filters={filters}
          setFilters={setFilters}
          availableCategories={availableCategories}
          availableStores={availableStores}
        />

        <div ref={dashboardRef}>
          <InventoryValueCards metrics={metrics} />
          
          <InventoryTrendChart data={trendData} />
          
          <CategoryBreakdownChart metrics={metrics} />
          
          <TopValueProducts products={metrics.topValueProducts} />
          
          <InventoryHealthMetrics 
            lowStockProducts={metrics.lowStockProducts}
            stockTurnoverRate={metrics.stockTurnoverRate}
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryValueSummary;