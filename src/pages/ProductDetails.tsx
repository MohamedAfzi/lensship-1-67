import { useParams, useNavigate } from 'react-router-dom';
import { Edit, Download, Eye, Share2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/navigation/BackButton';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/glass';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import TrendingBadge from '@/components/product/TrendingBadge';
import StarRating from '@/components/product/StarRating';
import SupplierInfo from '@/components/product/SupplierInfo';
import RelatedProducts from '@/components/product/RelatedProducts';
import { mockProducts, mockSupplierHubs, mockIndependentSellers } from '@/data/flowshipData';
import { FlowShipProduct } from '@/types/flowship';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Find product in FlowShip data
  const product = mockProducts.find(p => p.id === id);
  
  // Get supplier info
  const supplier = product ? (
    mockSupplierHubs.find(h => h.id === product.supplierId) ||
    mockIndependentSellers.find(s => s.id === product.supplierId)
  ) : null;

  // Calculate trending score for product
  const calculateTrendingScore = (product: FlowShipProduct): number => {
    const rating = 4.0 + Math.random() * 1.0;
    const ratingScore = (rating / 5) * 0.4;
    const stockScore = (Math.min(product.stockQuantity, 50) / 50) * 0.3;
    const priceBonus = product.price > 200000 ? 0.3 : product.price > 100000 ? 0.2 : 0.15;
    return ratingScore + stockScore + priceBonus;
  };

  const trendingScore = product ? calculateTrendingScore(product) : 0;
  const rating = 4.0 + Math.random() * 1.0;
  const reviewCount = Math.floor(Math.random() * 100) + 20;
  
  // Get related products (same category, excluding current product)
  const relatedProducts = mockProducts
    .filter(p => p.id !== id && p.category === product?.category)
    .slice(0, 8);

  // Get supplier products (same supplier, excluding current product)
  const supplierProducts = mockProducts
    .filter(p => p.id !== id && p.supplierId === product?.supplierId)
    .slice(0, 8);

  // Update page title
  useEffect(() => {
    if (product) {
      document.title = `${product.name} - FlowShip Marketplace`;
    }
    return () => {
      document.title = 'FlowShip Marketplace';
    };
  }, [product]);

  // Format price in Yemeni Rial
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-YE', {
      style: 'currency',
      currency: 'YER',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <GlassCard className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
            <Edit className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Product Not Found</h1>
          <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')} variant="outline">
            Back to Home
          </Button>
        </GlassCard>
      </div>
    );
  }

  const handleImportProduct = () => {
    toast({
      title: "Product Imported",
      description: `${product.name} has been added to your inventory.`,
    });
    // Redirect to listings after a delay
    setTimeout(() => {
      navigate('/listings');
    }, 1500);
  };

  const handleViewInventory = () => {
    navigate('/listings');
  };

  const handleSupplierClick = () => {
    if (supplier) {
      navigate(`/products/${supplier.id}`);
    }
  };

  const handleShareProduct = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Product link has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Share Failed",
        description: "Unable to copy product link.",
        variant: "destructive",
      });
    }
  };

  const calculateSalePercentage = () => {
    if (!product?.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-mobile-surface border-b border-mobile-border">
        <BackButton />
        
        <h1 className="text-lg font-semibold text-foreground">Product Details</h1>
        
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShareProduct}
            className="text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Share2 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/edit-listing/${product.id}`)}
            className="text-primary hover:bg-primary/10"
          >
            <Edit className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Product Image Gallery */}
        <GlassCard className="overflow-hidden p-6">
          <div className="relative">
            <ProductImageGallery
              images={product.images}
              productName={product.name}
            />
            
            {/* Status Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              <TrendingBadge score={trendingScore} />
              {product.originalPrice && (
                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-[0_0_12px_hsl(var(--neon-pink)/0.4)]">
                  Save {calculateSalePercentage()}%
                </Badge>
              )}
            </div>
            
            <div className="absolute top-4 right-4 z-10">
              <Badge variant={product.inStock ? "secondary" : "destructive"}>
                {product.inStock ? `${product.stockQuantity} in stock` : 'Out of stock'}
              </Badge>
            </div>
          </div>
        </GlassCard>

        {/* Product Information */}
        <GlassCard className="p-6">
          <div className="space-y-6">
            {/* Header Section */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-3">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <StarRating 
                  rating={rating} 
                  reviewCount={reviewCount}
                  size="md"
                />
                <Badge variant="outline" className="border-neon-blue/30 text-neon-blue">
                  {product.category}
                </Badge>
              </div>
              
              {/* Price Display */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <div className="flex flex-col">
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="text-sm text-green-400 font-medium">
                      Save {calculateSalePercentage()}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Supplier Information */}
            {supplier && (
              <div className="border-t border-mobile-border pt-6">
                <h3 className="text-lg font-semibold mb-3">Supplier Information</h3>
                <SupplierInfo supplier={supplier} />
              </div>
            )}

            {/* Description */}
            <div className="border-t border-mobile-border pt-6">
              <h3 className="text-lg font-semibold mb-3">Product Description</h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground leading-relaxed text-base">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="border-t border-mobile-border pt-6">
                <h3 className="text-lg font-semibold mb-4">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <GlassCard key={key} variant="subtle" className="p-4 border border-border/20">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground font-medium">{key}</span>
                        <span className="font-semibold text-foreground">{value}</span>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Action Buttons */}
        <GlassCard variant="glow" className="p-6">
          <div className="space-y-4">
            <div className="flex gap-3">
              <Button
                onClick={handleImportProduct}
                disabled={!product.inStock}
                className="flex-1 bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:from-neon-blue/90 hover:to-neon-purple/90 transition-all duration-300 shadow-[0_0_20px_hsl(var(--neon-blue)/0.3)]"
                size="lg"
              >
                <Download className="h-5 w-5 mr-2" />
                Import Product
              </Button>
              <Button
                variant="outline"
                onClick={handleViewInventory}
                className="flex-1 border-neon-blue/30 hover:bg-neon-blue/10 hover:border-neon-blue/50"
                size="lg"
              >
                <Eye className="h-5 w-5 mr-2" />
                View Inventory
              </Button>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => navigate(`/edit-listing/${product.id}`)}
                className="flex-1 border-border/50 hover:bg-accent"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Product
              </Button>
              <Button
                variant="outline"
                onClick={handleShareProduct}
                className="flex-1 border-border/50 hover:bg-accent"
              >
                <Copy className="h-4 w-4 mr-2" />
                Share Link
              </Button>
            </div>
          </div>
        </GlassCard>

        {/* Supplier Products */}
        {supplierProducts.length > 0 && (
          <RelatedProducts
            products={supplierProducts}
            title={`More from ${supplier?.name}`}
            viewAllLink={`/products/${supplier?.id}`}
          />
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts
            products={relatedProducts}
            title={`Similar ${product.category} Products`}
            viewAllLink={`/flowship?category=${encodeURIComponent(product.category)}`}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;