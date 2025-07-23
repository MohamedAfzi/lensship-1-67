import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/navigation/BackButton';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import FlowShipProductCard from '@/components/flowship/FlowShipProductCard';
import AdvancedFilters from '@/components/flowship/AdvancedFilters';
import FilterChips from '@/components/flowship/FilterChips';
import ActionToolbar from '@/components/flowship/ActionToolbar';
import ImportSuccessModal from '@/components/flowship/ImportSuccessModal';

import { 
  mockProducts,
  mockSupplierHubs,
  mockIndependentSellers,
  categories 
} from '@/data/flowshipData';

type ViewMode = 'grid' | 'list';

const Products = () => {
  const navigate = useNavigate();
  const { entityId } = useParams<{ entityId: string }>();
  const { toast } = useToast();

  // Find the entity (hub or seller)
  const entity = useMemo(() => {
    const hub = mockSupplierHubs.find(h => h.id === entityId);
    const seller = mockIndependentSellers.find(s => s.id === entityId);
    return hub || seller;
  }, [entityId]);

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [importedProducts, setImportedProducts] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Filter products based on entity and other filters
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      // Filter by entity
      const matchesEntity = product.supplierId === entityId;
      
      // Filter by search query
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by category
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      
      // Filter by price range
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      // Filter by stock
      const matchesStock = !inStockOnly || product.inStock;
      
      return matchesEntity && matchesSearch && matchesCategory && matchesPrice && matchesStock;
    });
  }, [entityId, searchQuery, selectedCategory, priceRange, inStockOnly]);

  // Handlers
  const handleProductSelect = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleProductImport = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
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
    const selectedProductData = mockProducts.filter(p => selectedProducts.includes(p.id));
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
    setSortBy('relevance');
  };

  if (!entity) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Entity Not Found</h1>
          <Button onClick={() => navigate('/flowship')}>
            Return to FlowShip
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-mobile-surface border-b border-mobile-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <BackButton fallbackRoute="/flowship" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Products from {entity.name}</h1>
              <p className="text-sm text-muted-foreground">
                {entity.entityType.charAt(0).toUpperCase() + entity.entityType.slice(1)} • {entity.region}
              </p>
            </div>
          </div>

          {/* Search and View Toggle */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-mobile-surface border-mobile-border focus:border-neon-blue/50 transition-colors"
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
            <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as ViewMode)}>
              <ToggleGroupItem value="grid" aria-label="Grid view">
                <Grid className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List view">
                <List className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
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
        {filteredProducts.length > 0 ? (
          <div className={`grid gap-4 ${viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
            {filteredProducts.map((product) => (
              <FlowShipProductCard
                key={product.id}
                product={product}
                isSelected={selectedProducts.includes(product.id)}
                onSelect={handleProductSelect}
                onImport={handleProductImport}
                onEdit={handleProductEdit}
                showCheckbox={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your criteria.</p>
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

export default Products;