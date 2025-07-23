import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import BackButton from '@/components/navigation/BackButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/product/ProductCard';
import { FilterBar } from '@/components/product/FilterBar';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { mockDiscoveredProducts, mockInventoryProducts } from '@/data/mockProducts';
import { ProductFilters, ViewMode, ProductType } from '@/types/product';
import { useToast } from '@/hooks/use-toast';

const ProductListings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'discovered' | 'inventory'>('discovered');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  
  const [discoveredFilters, setDiscoveredFilters] = useState<ProductFilters>({
    search: '',
    sortBy: 'date_desc',
  });
  
  const [inventoryFilters, setInventoryFilters] = useState<ProductFilters>({
    search: '',
    sortBy: 'date_desc',
  });

  const [discoveredProducts, setDiscoveredProducts] = useState(mockDiscoveredProducts);
  const [inventoryProducts, setInventoryProducts] = useState(mockInventoryProducts);

  // Filter and sort products
  const filteredDiscovered = useMemo(() => {
    let products = [...discoveredProducts];
    
    // Search filter
    if (discoveredFilters.search) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(discoveredFilters.search.toLowerCase()) ||
        p.id.toLowerCase().includes(discoveredFilters.search.toLowerCase())
      );
    }
    
    // Category filter
    if (discoveredFilters.category) {
      products = products.filter(p => p.category === discoveredFilters.category);
    }
    
    // Sort
    products.sort((a, b) => {
      switch (discoveredFilters.sortBy) {
        case 'date_desc':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'date_asc':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        default:
          return 0;
      }
    });
    
    return products;
  }, [discoveredProducts, discoveredFilters]);

  const filteredInventory = useMemo(() => {
    let products = [...inventoryProducts];
    
    // Search filter
    if (inventoryFilters.search) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(inventoryFilters.search.toLowerCase()) ||
        p.id.toLowerCase().includes(inventoryFilters.search.toLowerCase())
      );
    }
    
    // Category filter
    if (inventoryFilters.category) {
      products = products.filter(p => p.category === inventoryFilters.category);
    }
    
    // Sort
    products.sort((a, b) => {
      switch (inventoryFilters.sortBy) {
        case 'date_desc':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'date_asc':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'stock_desc':
          return b.stockQuantity - a.stockQuantity;
        case 'stock_asc':
          return a.stockQuantity - b.stockQuantity;
        default:
          return 0;
      }
    });
    
    return products;
  }, [inventoryProducts, inventoryFilters]);

  const handleEdit = (id: string) => {
    navigate(`/edit-listing/${id}`);
  };

  const handleCardClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  const handleDelete = (id: string) => {
    if (activeTab === 'discovered') {
      setDiscoveredProducts(prev => prev.filter(p => p.id !== id));
    } else {
      setInventoryProducts(prev => prev.filter(p => p.id !== id));
    }
    
    toast({
      title: "Product Deleted",
      description: "Product has been successfully deleted.",
    });
  };

  const handlePublish = (id: string) => {
    const product = discoveredProducts.find(p => p.id === id);
    if (product) {
      // Remove from discovered
      setDiscoveredProducts(prev => prev.filter(p => p.id !== id));
      
      // Add to inventory
      const inventoryProduct = {
        ...product,
        status: 'published' as const,
        stockQuantity: 10, // Default stock
      };
      setInventoryProducts(prev => [...prev, inventoryProduct]);
      
      toast({
        title: "Product Published",
        description: `${product.name} has been published to inventory.`,
      });
    }
  };

  const gridClassName = viewMode === 'grid' 
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
    : 'space-y-3';

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <BackButton />
        </div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Product Listings</h1>
          <p className="text-muted-foreground">Manage your discovered and inventory products</p>
        </div>

        <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-card/50 p-1">
            <TabsTrigger 
              value="discovered" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Discovered ({discoveredProducts.length})
            </TabsTrigger>
            <TabsTrigger 
              value="inventory"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Inventory ({inventoryProducts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discovered" className="space-y-6">
            <FilterBar
              filters={discoveredFilters}
              viewMode={viewMode}
              onFiltersChange={(updates) => setDiscoveredFilters(prev => ({ ...prev, ...updates }))}
              onViewModeChange={setViewMode}
              showStockSort={false}
            />
            
            {filteredDiscovered.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No discovered products</h3>
                <p className="text-muted-foreground mb-4">Start by scanning or uploading product images</p>
              </div>
            ) : (
              <div className={gridClassName}>
                {filteredDiscovered.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onPublish={handlePublish}
                    onCardClick={handleCardClick}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <FilterBar
              filters={inventoryFilters}
              viewMode={viewMode}
              onFiltersChange={(updates) => setInventoryFilters(prev => ({ ...prev, ...updates }))}
              onViewModeChange={setViewMode}
              showStockSort={true}
            />
            
            {filteredInventory.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No inventory products</h3>
                <p className="text-muted-foreground mb-4">Publish discovered products to add them to inventory</p>
              </div>
            ) : (
              <div className={gridClassName}>
                {filteredInventory.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onCardClick={handleCardClick}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ProductListings;