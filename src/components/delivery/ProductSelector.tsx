import { useState } from 'react';
import { Search, QrCode, Package } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { mockInventoryProducts } from '@/data/mockProducts';
import { InventoryProduct } from '@/types/product';

interface ProductSelectorProps {
  selectedProduct: InventoryProduct | null;
  onProductSelect: (product: InventoryProduct) => void;
  onScanQR: () => void;
}

export const ProductSelector = ({ selectedProduct, onProductSelect, onScanQR }: ProductSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [stockFilter, setStockFilter] = useState(false);

  const filteredProducts = mockInventoryProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const hasStock = stockFilter ? product.stockQuantity > 0 : true;
    return matchesSearch && hasStock;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Select Product</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onScanQR}
          className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10"
        >
          <QrCode className="h-4 w-4 mr-2" />
          Scan QR
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search product by name or paste product link"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="stock-filter"
          checked={stockFilter}
          onCheckedChange={setStockFilter}
        />
        <Label htmlFor="stock-filter" className="text-sm text-muted-foreground">
          Available in stock only
        </Label>
      </div>

      {selectedProduct && (
        <Card className="bg-neon-blue/10 border-neon-blue/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <img 
                src={selectedProduct.thumbnail} 
                alt={selectedProduct.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{selectedProduct.name}</h4>
                <p className="text-sm text-muted-foreground">${selectedProduct.price}</p>
              </div>
              <Badge variant="secondary" className="bg-neon-green/20 text-neon-green">
                Stock: {selectedProduct.stockQuantity}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {filteredProducts.map((product) => (
          <Card 
            key={product.id}
            className={`cursor-pointer transition-all hover:border-neon-blue/50 ${
              selectedProduct?.id === product.id ? 'border-neon-blue bg-neon-blue/5' : 'border-border'
            }`}
            onClick={() => onProductSelect(product)}
          >
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <img 
                  src={product.thumbnail} 
                  alt={product.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-foreground text-sm">{product.name}</h4>
                  <p className="text-xs text-muted-foreground">${product.price} • {product.category}</p>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={product.stockQuantity > 0 ? "secondary" : "destructive"}
                    className={product.stockQuantity > 0 ? 
                      "bg-neon-green/20 text-neon-green" : 
                      "bg-destructive/20 text-destructive"
                    }
                  >
                    {product.stockQuantity > 0 ? `${product.stockQuantity} left` : 'Out of stock'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="bg-card border-border">
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No products found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};