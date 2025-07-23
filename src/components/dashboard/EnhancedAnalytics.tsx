import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Download,
  FileText,
  Share2,
  Zap,
  Target,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Package,
  Eye,
  Clock
} from 'lucide-react';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface AnalyticsMetric {
  id: string;
  title: string;
  value: number;
  previousValue: number;
  change: number;
  changeDirection: 'up' | 'down';
  suffix?: string;
  prefix?: string;
  color: string;
  icon: React.ComponentType<any>;
  description: string;
}

interface TimeSeriesData {
  period: string;
  value: number;
  trend: 'up' | 'down' | 'neutral';
}

interface ProductPerformance {
  id: string;
  name: string;
  views: number;
  conversions: number;
  revenue: number;
  conversionRate: number;
  trend: 'up' | 'down' | 'neutral';
}

const EnhancedAnalytics = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'trends'>('overview');
  const [isExporting, setIsExporting] = useState(false);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: false,
  });

  // Mock analytics data
  const metrics: AnalyticsMetric[] = [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: 24580,
      previousValue: 19200,
      change: 28.0,
      changeDirection: 'up',
      prefix: '$',
      color: 'text-neon-green',
      icon: DollarSign,
      description: 'Revenue generated from all sales channels'
    },
    {
      id: 'products',
      title: 'Active Products',
      value: 1247,
      previousValue: 1156,
      change: 7.9,
      changeDirection: 'up',
      color: 'text-neon-blue',
      icon: Package,
      description: 'Currently listed products across all platforms'
    },
    {
      id: 'views',
      title: 'Product Views',
      value: 89400,
      previousValue: 76300,
      change: 17.2,
      changeDirection: 'up',
      color: 'text-neon-purple',
      icon: Eye,
      description: 'Total views across all product listings'
    },
    {
      id: 'conversion',
      title: 'Conversion Rate',
      value: 3.4,
      previousValue: 2.8,
      change: 21.4,
      changeDirection: 'up',
      suffix: '%',
      color: 'text-neon-pink',
      icon: Target,
      description: 'Percentage of views that convert to sales'
    },
    {
      id: 'response-time',
      title: 'Avg Response Time',
      value: 2.1,
      previousValue: 2.8,
      change: -25.0,
      changeDirection: 'down',
      suffix: 's',
      color: 'text-neon-cyan',
      icon: Clock,
      description: 'Average time to respond to customer inquiries'
    }
  ];

  const timeSeriesData: TimeSeriesData[] = [
    { period: 'Week 1', value: 4200, trend: 'up' },
    { period: 'Week 2', value: 5100, trend: 'up' },
    { period: 'Week 3', value: 4800, trend: 'down' },
    { period: 'Week 4', value: 6200, trend: 'up' },
    { period: 'Week 5', value: 7100, trend: 'up' },
  ];

  const topProducts: ProductPerformance[] = [
    { 
      id: '1', 
      name: 'Wireless Headphones Pro', 
      views: 12400, 
      conversions: 340, 
      revenue: 8500,
      conversionRate: 2.74,
      trend: 'up'
    },
    { 
      id: '2', 
      name: 'Smart Phone Case', 
      views: 8900, 
      conversions: 220, 
      revenue: 3300,
      conversionRate: 2.47,
      trend: 'up'
    },
    { 
      id: '3', 
      name: 'Bluetooth Speaker', 
      views: 7200, 
      conversions: 180, 
      revenue: 4200,
      conversionRate: 2.50,
      trend: 'neutral'
    },
    { 
      id: '4', 
      name: 'Gaming Mouse', 
      views: 6100, 
      conversions: 125, 
      revenue: 2800,
      conversionRate: 2.05,
      trend: 'down'
    },
  ];

  const handleExport = async (format: 'pdf' | 'excel') => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would generate and download the file
    console.log(`Exporting analytics data as ${format}`);
    
    setIsExporting(false);
  };

  const AnalyticsCard = ({ metric }: { metric: AnalyticsMetric }) => {
    const animatedValue = useAnimatedCounter({
      end: metric.value,
      duration: 2000,
      isActive: isIntersecting
    });

    const IconComponent = metric.icon;
    const isPositive = metric.changeDirection === 'up';
    const changeColor = isPositive ? 'text-neon-green' : 'text-destructive';
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;

    return (
      <Card className="bg-mobile-surface border-mobile-border hover:border-neon-blue/50 transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue/20 to-neon-blue/40 flex items-center justify-center`}>
              <IconComponent className={`h-5 w-5 ${metric.color}`} />
            </div>
            <div className="flex items-center gap-1">
              <TrendIcon className={`h-4 w-4 ${changeColor}`} />
              <span className={`text-sm font-medium ${changeColor}`}>
                {Math.abs(metric.change)}%
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-mobile-text-secondary">
              {metric.title}
            </h3>
            <div className="text-2xl font-bold text-mobile-text-primary">
              {metric.prefix}{animatedValue.toLocaleString()}{metric.suffix}
            </div>
            <p className="text-xs text-mobile-text-secondary">
              {metric.description}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  const TimeSeriesChart = () => (
    <Card className="bg-mobile-surface border-mobile-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-mobile-text-primary flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-neon-blue" />
          Revenue Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeSeriesData.map((data, index) => {
            const maxValue = Math.max(...timeSeriesData.map(d => d.value));
            const percentage = (data.value / maxValue) * 100;
            
            return (
              <div key={index} className="flex items-center gap-4">
                <div className="w-16 text-sm text-mobile-text-secondary">
                  {data.period}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={percentage} 
                      className="flex-1 h-2"
                    />
                    <span className="text-sm font-medium text-mobile-text-primary w-16">
                      ${data.value.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="w-6 flex justify-center">
                  {data.trend === 'up' && <ArrowUpRight className="h-4 w-4 text-neon-green" />}
                  {data.trend === 'down' && <ArrowDownRight className="h-4 w-4 text-destructive" />}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  const ProductPerformanceTable = () => (
    <Card className="bg-mobile-surface border-mobile-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-mobile-text-primary flex items-center gap-2">
          <Target className="h-5 w-5 text-neon-pink" />
          Top Performing Products
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div key={product.id} className="flex items-center gap-4 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
              <div className="text-sm font-medium text-mobile-text-secondary w-6">
                #{index + 1}
              </div>
              <div className="flex-1">
                <div className="font-medium text-mobile-text-primary">
                  {product.name}
                </div>
                <div className="text-sm text-mobile-text-secondary">
                  {product.views.toLocaleString()} views • {product.conversions} conversions
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-mobile-text-primary">
                  ${product.revenue.toLocaleString()}
                </div>
                <div className="text-sm text-mobile-text-secondary">
                  {product.conversionRate}% CVR
                </div>
              </div>
              <div className="w-6 flex justify-center">
                {product.trend === 'up' && <ArrowUpRight className="h-4 w-4 text-neon-green" />}
                {product.trend === 'down' && <ArrowDownRight className="h-4 w-4 text-destructive" />}
                {product.trend === 'neutral' && <div className="h-4 w-4" />}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6" ref={targetRef as React.RefObject<HTMLDivElement>}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-mobile-text-primary">
            Advanced Analytics
          </h2>
          <p className="text-mobile-text-secondary">
            Real-time insights into your business performance
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Time range selector */}
          <div className="flex items-center gap-1 bg-mobile-surface border border-mobile-border rounded-lg p-1">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-xs ${
                  timeRange === range 
                    ? 'bg-neon-blue text-white' 
                    : 'text-mobile-text-secondary hover:text-mobile-text-primary'
                }`}
              >
                {range}
              </Button>
            ))}
          </div>
          
          {/* Export options */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
            className="border-mobile-border hover:bg-mobile-surface"
          >
            {isExporting ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Export
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 bg-mobile-surface border border-mobile-border rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'performance', label: 'Performance', icon: Target },
          { id: 'trends', label: 'Trends', icon: TrendingUp },
        ].map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={activeTab === id ? 'default' : 'ghost'}
            onClick={() => setActiveTab(id as typeof activeTab)}
            className={`flex items-center gap-2 ${
              activeTab === id 
                ? 'bg-neon-blue text-white' 
                : 'text-mobile-text-secondary hover:text-mobile-text-primary'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {metrics.map((metric) => (
              <AnalyticsCard key={metric.id} metric={metric} />
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TimeSeriesChart />
            <ProductPerformanceTable />
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-6">
          <ProductPerformanceTable />
          
          {/* Performance insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-mobile-surface border-mobile-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-mobile-text-primary">
                  Performance Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-neon-green/10 border border-neon-green/30 rounded-lg">
                    <Zap className="h-5 w-5 text-neon-green" />
                    <div>
                      <div className="text-sm font-medium text-mobile-text-primary">
                        Top Performer
                      </div>
                      <div className="text-xs text-mobile-text-secondary">
                        Wireless Headphones Pro leading with 2.74% CVR
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-neon-pink/10 border border-neon-pink/30 rounded-lg">
                    <Target className="h-5 w-5 text-neon-pink" />
                    <div>
                      <div className="text-sm font-medium text-mobile-text-primary">
                        Optimization Opportunity
                      </div>
                      <div className="text-xs text-mobile-text-secondary">
                        Gaming Mouse has potential for 15% CVR improvement
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-mobile-surface border-mobile-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-mobile-text-primary">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-neon-blue hover:bg-neon-blue/80 text-white">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="w-full border-mobile-border hover:bg-mobile-surface">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'trends' && (
        <div className="space-y-6">
          <TimeSeriesChart />
          
          {/* Trend analysis */}
          <Card className="bg-mobile-surface border-mobile-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-mobile-text-primary">
                Trend Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div>
                    <div className="font-medium text-mobile-text-primary">
                      Revenue Growth
                    </div>
                    <div className="text-sm text-mobile-text-secondary">
                      Consistent upward trend over last 30 days
                    </div>
                  </div>
                  <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                    +28%
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div>
                    <div className="font-medium text-mobile-text-primary">
                      Product Views
                    </div>
                    <div className="text-sm text-mobile-text-secondary">
                      Strong increase in product discovery
                    </div>
                  </div>
                  <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                    +17%
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div>
                    <div className="font-medium text-mobile-text-primary">
                      Conversion Rate
                    </div>
                    <div className="text-sm text-mobile-text-secondary">
                      Improved user experience driving conversions
                    </div>
                  </div>
                  <Badge className="bg-neon-pink/20 text-neon-pink border-neon-pink/30">
                    +21%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EnhancedAnalytics;