import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getAttributes } from '@/lib/categories';

interface AdditionalAttributes {
  brand: string;
  model: string;
  weight: string;
  dimensions: string;
  material: string;
  warranty: string;
  yearOfManufacture: string;
  customAttributes: { [key: string]: string };
}

interface AdditionalAttributesSectionProps {
  category: string;
  subcategory: string;
  attributes: AdditionalAttributes;
  onAttributesChange: (attributes: AdditionalAttributes) => void;
}

const AdditionalAttributesSection: React.FC<AdditionalAttributesSectionProps> = ({
  category,
  subcategory,
  attributes,
  onAttributesChange
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAttributeChange = (field: keyof AdditionalAttributes, value: string) => {
    onAttributesChange({
      ...attributes,
      [field]: value
    });
  };

  const handleCustomAttributeChange = (key: string, value: string) => {
    onAttributesChange({
      ...attributes,
      customAttributes: {
        ...attributes.customAttributes,
        [key]: value
      }
    });
  };

  const getCategorySpecificFields = () => {
    // Get subcategory-specific attributes
    const subcategoryAttributes = getAttributes(category, subcategory);
    
    const commonFields = (
      <>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="brand" className="text-sm font-medium">Brand</Label>
            <Input
              id="brand"
              placeholder="Brand name"
              value={attributes.brand}
              onChange={(e) => handleAttributeChange('brand', e.target.value)}
              className="bg-background border-mobile-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="model" className="text-sm font-medium">Model</Label>
            <Input
              id="model"
              placeholder="Model/Product code"
              value={attributes.model}
              onChange={(e) => handleAttributeChange('model', e.target.value)}
              className="bg-background border-mobile-border"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-sm font-medium">Weight</Label>
            <Input
              id="weight"
              placeholder="e.g., 2.5 kg"
              value={attributes.weight}
              onChange={(e) => handleAttributeChange('weight', e.target.value)}
              className="bg-background border-mobile-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="year" className="text-sm font-medium">Year</Label>
            <Select value={attributes.yearOfManufacture} onValueChange={(value) => handleAttributeChange('yearOfManufacture', value)}>
              <SelectTrigger className="bg-background border-mobile-border">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-mobile-border">
                {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
                <SelectItem value="older">Older than {new Date().getFullYear() - 20}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </>
    );

    // Render subcategory-specific attributes
    const subcategoryFields = Object.entries(subcategoryAttributes).map(([key, config]) => {
      const fieldId = `custom-${key}`;
      const currentValue = attributes.customAttributes[key] || '';
      
      return (
        <div key={key} className="space-y-2">
          <Label htmlFor={fieldId} className="text-sm font-medium">
            {config.label}
            {config.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          
          {config.type === 'select' ? (
            <Select value={currentValue} onValueChange={(value) => handleCustomAttributeChange(key, value)}>
              <SelectTrigger className="bg-background border-mobile-border">
                <SelectValue placeholder={`Select ${config.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent className="bg-popover border-mobile-border">
                {config.options?.map(option => (
                  <SelectItem key={option} value={option.toLowerCase()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              id={fieldId}
              type={config.type}
              placeholder={`Enter ${config.label.toLowerCase()}`}
              value={currentValue}
              onChange={(e) => handleCustomAttributeChange(key, e.target.value)}
              className="bg-background border-mobile-border"
            />
          )}
        </div>
      );
    });

    return (
      <div className="space-y-4">
        {commonFields}
        {subcategoryFields.length > 0 && (
          <div className="space-y-4">
            <div className="border-t border-mobile-border pt-4">
              <h4 className="text-sm font-medium mb-3">Category-Specific Attributes</h4>
              <div className="grid grid-cols-1 gap-4">
                {subcategoryFields}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Additional Attributes</h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-muted-foreground hover:text-foreground"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              More
            </>
          )}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="bg-mobile-surface border border-mobile-border rounded-lg p-4 space-y-4">
          {getCategorySpecificFields()}
          <p className="text-xs text-muted-foreground">
            Additional product information helps buyers make informed decisions
          </p>
        </div>
      )}
    </div>
  );
};

export default AdditionalAttributesSection;