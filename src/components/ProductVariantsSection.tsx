import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { getSizeOptions, getColorOptions } from '@/lib/categories';

interface ProductVariant {
  color: string;
  size: string;
  stock: number;
}

interface ProductVariantsSectionProps {
  category: string;
  subcategory: string;
  variants: ProductVariant[];
  onVariantsChange: (variants: ProductVariant[]) => void;
}

const ProductVariantsSection: React.FC<ProductVariantsSectionProps> = ({
  category,
  subcategory,
  variants,
  onVariantsChange
}) => {
  const sizeOptions = getSizeOptions(category, subcategory);
  const colorOptions = getColorOptions(category, subcategory);

  const addVariant = () => {
    const newVariant: ProductVariant = {
      color: '',
      size: '',
      stock: 0
    };
    onVariantsChange([...variants, newVariant]);
  };

  const removeVariant = (index: number) => {
    const newVariants = variants.filter((_, i) => i !== index);
    onVariantsChange(newVariants);
  };

  const updateVariant = (index: number, field: keyof ProductVariant, value: string | number) => {
    const newVariants = variants.map((variant, i) => 
      i === index ? { ...variant, [field]: value } : variant
    );
    onVariantsChange(newVariants);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Product Variants</h3>
        <Button 
          type="button"
          variant="outline" 
          size="sm" 
          onClick={addVariant}
          className="text-xs"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add Variant
        </Button>
      </div>
      
      {variants.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Add variants to track different colors, sizes, or configurations
        </p>
      ) : (
        <div className="space-y-3">
          {variants.map((variant, index) => (
            <div key={index} className="bg-mobile-surface border border-mobile-border rounded-lg p-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Variant {index + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeVariant(index)}
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">Color</Label>
                  <Select 
                    value={variant.color} 
                    onValueChange={(value) => updateVariant(index, 'color', value)}
                  >
                    <SelectTrigger className="h-8 text-xs bg-background border-mobile-border">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-mobile-border">
                      {colorOptions.map(color => (
                        <SelectItem key={color} value={color.toLowerCase()}>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full border"
                              style={{ backgroundColor: color.toLowerCase() }}
                            />
                            {color}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs">Size</Label>
                  <Select 
                    value={variant.size} 
                    onValueChange={(value) => updateVariant(index, 'size', value)}
                  >
                    <SelectTrigger className="h-8 text-xs bg-background border-mobile-border">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                     <SelectContent className="bg-popover border-mobile-border">
                       {sizeOptions.map(size => (
                         <SelectItem key={size} value={size}>
                           {size}
                         </SelectItem>
                       ))}
                     </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs">Stock</Label>
                  <Input
                    type="number"
                    min="0"
                    value={variant.stock}
                    onChange={(e) => updateVariant(index, 'stock', parseInt(e.target.value) || 0)}
                    className="h-8 text-xs bg-background border-mobile-border"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductVariantsSection;