import React, { useState } from 'react';
import BackButton from '@/components/navigation/BackButton';
import { GlassCard } from '@/components/glass/GlassCard';
import { ProfitMetricsCards } from '@/components/profit/ProfitMetricsCards';
import { 
  ProfitTrendChart, 
  CategoryBreakdownChart, 
  SupplierPerformanceChart,
  ProfitProjectionChart 
} from '@/components/profit/ProfitCharts';
import { ProfitOptimizationSuggestions } from '@/components/profit/ProfitOptimizationSuggestions';
import { useProfitCalculations } from '@/hooks/useProfitCalculations';
import { 
  TrendingUp, 
  Download, 
  Settings, 
  Calendar,
  AlertCircle,
  Target,
  BarChart3,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProfitProjection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const profitData = useProfitCalculations();

  const periods = [
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '1year', label: '1 Year' },
    { value: '2years', label: '2 Years' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-lg bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BackButton />
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-neon-blue" />
                  <span>Profit Projection</span>
                </h1>
                <p className="text-sm text-muted-foreground">
                  Comprehensive financial analytics and profit forecasting
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {periods.map((period) => (
                  <Button
                    key={period.value}
                    variant={selectedPeriod === period.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod(period.value)}
                    className="text-xs"
                  >
                    {period.label}
                  </Button>
                ))}
              </div>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Alert Banner */}
        <GlassCard variant="subtle" className="p-4 border-neon-blue/30 bg-neon-blue/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-neon-blue" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Profit optimization opportunities identified
                </p>
                <p className="text-xs text-muted-foreground">
                  Potential to increase monthly profits by +83% through strategic adjustments
                </p>
              </div>
            </div>
            <Badge className="bg-neon-green/10 text-neon-green border-neon-green/20">
              +YER 165K/month
            </Badge>
          </div>
        </GlassCard>

        {/* Metrics Cards */}
        <ProfitMetricsCards 
          totalProfit={profitData.totalProfit}
          profitMargin={profitData.profitMargin}
          monthlyGrowth={profitData.monthlyGrowth}
          roi={profitData.roi}
          totalRevenue={profitData.totalRevenue}
          riskyProducts={profitData.riskyProducts}
        />

        {/* Charts and Analytics */}
        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-card/50">
            <TabsTrigger value="trends" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Trends</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Categories</span>
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Suppliers</span>
            </TabsTrigger>
            <TabsTrigger value="projections" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Projections</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="trends" className="space-y-6">
              <ProfitTrendChart />
            </TabsContent>
            
            <TabsContent value="categories" className="space-y-6">
              <CategoryBreakdownChart />
            </TabsContent>
            
            <TabsContent value="suppliers" className="space-y-6">
              <SupplierPerformanceChart />
            </TabsContent>
            
            <TabsContent value="projections" className="space-y-6">
              <ProfitProjectionChart />
            </TabsContent>
          </div>
        </Tabs>

        {/* Optimization Suggestions */}
        <ProfitOptimizationSuggestions />

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard variant="glow" className="p-6 text-center">
            <Target className="h-8 w-8 text-neon-blue mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Profit Goal</h3>
            <p className="text-2xl font-bold text-neon-blue">YER 300K</p>
            <p className="text-sm text-muted-foreground">Target for next month</p>
            <div className="mt-3">
              <div className="w-full bg-muted/20 rounded-full h-2">
                <div 
                  className="bg-neon-blue h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${Math.min((profitData.totalProfit / 300000) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {((profitData.totalProfit / 300000) * 100).toFixed(1)}% achieved
              </p>
            </div>
          </GlassCard>

          <GlassCard variant="glow" className="p-6 text-center">
            <BarChart3 className="h-8 w-8 text-neon-green mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Best Category</h3>
            <p className="text-xl font-bold text-neon-green">
              {profitData.categoryProfits.sort((a, b) => b.margin - a.margin)[0]?.category || 'N/A'}
            </p>
            <p className="text-sm text-muted-foreground">
              {profitData.categoryProfits.sort((a, b) => b.margin - a.margin)[0]?.margin.toFixed(1) || 0}% margin
            </p>
          </GlassCard>

          <GlassCard variant="glow" className="p-6 text-center">
            <DollarSign className="h-8 w-8 text-neon-orange mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Avg. Product Profit</h3>
            <p className="text-xl font-bold text-neon-orange">
              YER {(profitData.totalProfit / profitData.productProfits.length).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>
            <p className="text-sm text-muted-foreground">Per product</p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default ProfitProjection;