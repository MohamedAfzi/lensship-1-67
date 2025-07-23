import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/navigation/BackButton';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

import FlowShipProductCard from '@/components/flowship/FlowShipProductCard';
import AdvancedFilters from '@/components/flowship/AdvancedFilters';
import FilterChips from '@/components/flowship/FilterChips';
import ActionToolbar from '@/components/flowship/ActionToolbar';
import ImportSuccessModal from '@/components/flowship/ImportSuccessModal';

import { mockProducts, mockSupplierHubs, mockIndependentSellers } from '@/data/flowshipData';
import type { FlowShipProduct } from '@/types/flowship';

const TopTrendingProducts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [importedProducts, setImportedProducts] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('trending');

  // Calculate trending score for products
  const calculateTrendingScore = (product: FlowShipProduct): number => {
    // Generate simulated rating (4.0-5.0)
    const rating = 4.0 + Math.random() * 1.0;
    
    // Calculate trending score based on:
    // - Rating (40% weight)
    // - Stock quantity as proxy for sales volume (30% weight) 
    // - Price tier bonus for premium products (30% weight)
    const ratingScore = (rating / 5) * 0.4;
    const stockScore = (Math.min(product.stockQuantity, 50) / 50) * 0.3;
    const priceBonus = product.price > 200000 ? 0.3 : product.price > 100000 ? 0.2 : 0.15;
    
    return ratingScore + stockScore + priceBonus;
  };

  // Get trending products with filtering
  const trendingProducts = useMemo(() => {
    let products = mockProducts
      .map(product => ({
        ...product,
        trendingScore: calculateTrendingScore(product),
        rating: 4.0 + Math.random() * 1.0 // Simulated rating
      }))
      .filter(product => {
        // Only show products with good ratings and stock
        return product.rating >= 4.0 && product.stockQuantity > 0;
      });

    // Apply filters
    if (searchQuery) {
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      products = products.filter(product => product.category === selectedCategory);
    }

    if (priceRange) {
      products = products.filter(product =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
    }

    if (inStockOnly) {
      products = products.filter(product => product.inStock);
    }

    // Apply sorting
    products.sort((a, b) => {
      switch (sortBy) {
        case 'trending':
          return b.trendingScore - a.trendingScore;
        case 'rating':
          return b.rating - a.rating;
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        default:
          return b.trendingScore - a.trendingScore;
      }
    });

    return products.slice(0, 50); // Limit to top 50 trending products
  }, [searchQuery, selectedCategory, priceRange, inStockOnly, sortBy]);

  // Get supplier name for product
  const getSupplierName = (supplierId: string): string => {
    const hub = mockSupplierHubs.find(h => h.id === supplierId);
    const seller = mockIndependentSellers.find(s => s.id === supplierId);
    return hub?.name || seller?.name || 'Unknown Supplier';
  };

  // Handlers
  const handleProductSelect = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleProductImport = (productId: string) => {
    const product = trendingProducts.find(p => p.id === productId);
    if (product) {
      setImportedProducts([product.name]);
      setShowSuccessModal(true);
      toast({
        title: "Product Imported",
        description: `${product.name} has been added to your inventory.`,
      });
    }
  };

  const handleProductEdit = (productId: string) => {
    navigate(`/edit-listing/${productId}`);
  };

  const handleBulkImport = () => {
    const selectedProductData = trendingProducts.filter(p => selectedProducts.includes(p.id));
    setImportedProducts(selectedProductData.map(p => p.name));
    setShowSuccessModal(true);
    setSelectedProducts([]);
    toast({
      title: "Bulk Import Successful",
      description: `${selectedProducts.length} products have been imported to your inventory.`,
    });
  };

  const handleViewInventory = () => {
    setShowSuccessModal(false);
    navigate('/listings');
  };

  const handleClearAllFilters = () => {
    setSelectedCategory(undefined);
    setPriceRange([0, 1000000]);
    setInStockOnly(false);
    setSortBy('trending');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-mobile-surface border-b border-mobile-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <BackButton fallbackRoute="/" />
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/30 backdrop-blur-sm">
                <Flame className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  Top Trending Products
                  <Badge variant="secondary" className="bg-orange-500/10 text-orange-400 border-orange-500/20">
                    🔥 Hot
                  </Badge>
                </h1>
                <p className="text-sm text-muted-foreground">
                  Explore the most in-demand and highly rated products from trusted FlowShip suppliers
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Input
                placeholder="Search trending products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-mobile-surface border-mobile-border focus:border-neon-blue/50 transition-colors"
              />
            </div>
            <AdvancedFilters
              selectedCategory={selectedCategory}
              priceRange={priceRange}
              inStockOnly={inStockOnly}
              sortBy={sortBy}
              onCategoryChange={setSelectedCategory}
              onPriceRangeChange={setPriceRange}
              onInStockChange={setInStockOnly}
              onSortChange={setSortBy}
            />
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-3 mb-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px] bg-mobile-surface border-mobile-border">
                <TrendingUp className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trending">🔥 Trending Score</SelectItem>
                <SelectItem value="rating">⭐ Highest Rating</SelectItem>
                <SelectItem value="price_low">💰 Price: Low to High</SelectItem>
                <SelectItem value="price_high">💰 Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            
            {(selectedCategory || inStockOnly || searchQuery) && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClearAllFilters}
                className="border-mobile-border hover:bg-mobile-surface/80"
              >
                Clear Filters
              </Button>
            )}
          </div>

          {/* Filter Chips */}
          <FilterChips
            selectedRegion="all"
            selectedCategory={selectedCategory}
            onRegionChange={() => {}}
            onCategoryChange={setSelectedCategory}
            onClearAll={handleClearAllFilters}
          />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="mb-6">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Showing {trendingProducts.length} trending products</span>
            <div className="w-1 h-1 rounded-full bg-muted-foreground/50"></div>
            <span>Sorted by {sortBy === 'trending' ? 'Trending Score' : sortBy}</span>
          </div>
        </div>

        {/* Products Grid */}
        {trendingProducts.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {trendingProducts.map((product, index) => (
              <div key={product.id} className="relative">
                {/* Trending Badge for Top 10 */}
                {index < 10 && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <Badge 
                      className={`
                        text-xs font-bold px-2 py-1 rounded-full shadow-lg
                        ${index < 3 ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse' :
                          'bg-gradient-to-r from-amber-500 to-orange-500 text-white'}
                      `}
                    >
                      🔥 #{index + 1}
                    </Badge>
                  </div>
                )}
                
                <FlowShipProductCard
                  product={product}
                  isSelected={selectedProducts.includes(product.id)}
                  onSelect={handleProductSelect}
                  onImport={handleProductImport}
                  onEdit={handleProductEdit}
                  showCheckbox={true}
                  className="h-full"
                />
                
                {/* Additional Product Info */}
                <div className="mt-2 p-2 rounded-lg bg-mobile-surface/50 border border-mobile-border/50">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      From: {getSupplierName(product.supplierId)}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-muted-foreground">
                        {(product as any).rating?.toFixed(1) || '4.5'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No trending products found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filters to see more results.</p>
            <Button variant="outline" onClick={handleClearAllFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Action Toolbar */}
      <ActionToolbar
        selectedCount={selectedProducts.length}
        onBulkImport={handleBulkImport}
        onViewSelected={() => console.log('View selected')}
        onClearSelection={() => setSelectedProducts([])}
        isVisible={selectedProducts.length > 0}
      />

      {/* Success Modal */}
      <ImportSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onViewInventory={handleViewInventory}
        importedCount={importedProducts.length}
        productNames={importedProducts}
      />
    </div>
  );
};

export default TopTrendingProducts;