import React, { useState, useCallback } from 'react';
import { Info, Bot, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/navigation/BackButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { AddPhotosCard } from '@/components/AddPhotosCard';
import { PhotoSelectionSheet } from '@/components/PhotoSelectionSheet';
import { PhotoSuccessPopup } from '@/components/PhotoSuccessPopup';
import { LiveCameraView } from '@/components/LiveCameraView';
import { AIAssistPopover } from '@/components/AIAssistPopover';
import ProductVariantsSection from '@/components/ProductVariantsSection';
import AdditionalAttributesSection from '@/components/AdditionalAttributesSection';
import { usePhotoManager } from '@/hooks/usePhotoManager';
import { useToast } from '@/hooks/use-toast';

import { CATEGORIES, getSubcategories } from '@/lib/categories';

const NewListingForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    purchasePrice: '',
    category: '',
    subcategory: '',
    condition: '',
    description: '',
    tags: '',
    sku: '',
    availability: 'List as In Stock',
    stockQuantity: 0,
    lowStockThreshold: 5,
    trackInventory: false,
    offerShipping: false,
    publicMeetup: true,
    doorPickup: true,
    doorDropoff: true
  });

  const [productVariants, setProductVariants] = useState([]);
  const [additionalAttributes, setAdditionalAttributes] = useState({
    brand: '',
    model: '',
    weight: '',
    dimensions: '',
    material: '',
    warranty: '',
    yearOfManufacture: '',
    customAttributes: {}
  });

  const [isPhotoSheetOpen, setIsPhotoSheetOpen] = useState(false);
  const [isLiveCameraOpen, setIsLiveCameraOpen] = useState(false);
  const [successPhoto, setSuccessPhoto] = useState<any>(null);
  const [isAIAssistOpen, setIsAIAssistOpen] = useState(false);
  
  const { 
    photos, 
    isLoading, 
    removePhoto, 
    setMainPhoto, 
    takePhoto, 
    selectFromGallery,
    selectMultipleFromGallery 
  } = usePhotoManager();

  const { toast } = useToast();

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      // Reset subcategory when category changes
      if (field === 'category') {
        newData.subcategory = '';
      }
      return newData;
    });
  };


  const handleTakePhoto = async () => {
    setIsLiveCameraOpen(true);
  };

  const handleLiveCameraCapture = async (blob: Blob) => {
    const photo = await takePhoto(blob);
    if (photo) {
      setSuccessPhoto(photo);
      // Don't immediately close camera - let user confirm the scanned product first
      // Camera will close when they click "Use Product" or manually close
    }
  };

  const handleSelectFromGallery = async () => {
    const photo = await selectFromGallery();
    if (photo) {
      setSuccessPhoto(photo);
    }
  };

  const handleSelectMultiple = async () => {
    await selectMultipleFromGallery();
  };

  const handleAIToneSelect = (tone: 'formal' | 'friendly' | 'professional') => {
    // Mock AI tone adjustment
    const currentDesc = formData.description;
    let newDesc = currentDesc;
    
    if (tone === 'formal') {
      newDesc = currentDesc ? `${currentDesc} (refined with formal tone)` : 'This product has been professionally curated with attention to detail.';
    } else if (tone === 'friendly') {
      newDesc = currentDesc ? `${currentDesc} (made more casual and friendly)` : 'This awesome product is perfect for you! You\'ll absolutely love it.';
    } else if (tone === 'professional') {
      newDesc = currentDesc ? `${currentDesc} (enhanced with professional marketing tone)` : 'Premium quality product designed to meet your professional needs with exceptional performance.';
    }
    
    handleInputChange('description', newDesc);
    toast({ title: "Success", description: `Description updated with ${tone} tone` });
  };

  const handlePublishToFB = () => {
    toast({ title: "Success", description: "Product successfully published to FB Marketplace" });
  };

  const handleShareListing = async () => {
    try {
      // Aggregate listing data
      const categoryLabel = formData.category ? CATEGORIES[formData.category]?.label || formData.category : '';
      const subcategoryLabel = formData.subcategory ? getSubcategories(formData.category)[formData.subcategory]?.label || formData.subcategory : '';
      
      // Create comprehensive listing content
      const listingContent = [
        formData.title || 'Untitled Listing',
        formData.price ? `Price: $${formData.price}` : '',
        categoryLabel ? `Category: ${categoryLabel}` : '',
        subcategoryLabel ? `Subcategory: ${subcategoryLabel}` : '',
        formData.condition ? `Condition: ${formData.condition}` : '',
        formData.description || '',
        formData.tags ? `Tags: ${formData.tags}` : '',
        additionalAttributes.brand ? `Brand: ${additionalAttributes.brand}` : '',
        additionalAttributes.model ? `Model: ${additionalAttributes.model}` : '',
        formData.offerShipping ? 'Shipping available' : '',
        photos.length > 0 ? `Photos: ${photos.length} image(s)` : ''
      ].filter(Boolean).join('\n');
      
      // UTF-8 encode the content
      const encodedContent = encodeURIComponent(listingContent);
      const shareData = {
        title: formData.title || 'Product Listing',
        text: listingContent,
        url: window.location.href
      };

      // Check if Web Share API is supported
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast({ title: "Success", description: "Listing shared successfully" });
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(listingContent);
        toast({ title: "Success", description: "Listing details copied to clipboard" });
      }
    } catch (error) {
      console.error('Error sharing listing:', error);
      // Fallback for any errors
      try {
        const fallbackContent = `${formData.title || 'Product Listing'}\nPrice: $${formData.price || 'N/A'}`;
        await navigator.clipboard.writeText(fallbackContent);
        toast({ title: "Info", description: "Basic listing details copied to clipboard" });
      } catch (clipboardError) {
        toast({ title: "Error", description: "Unable to share listing" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-mobile-header border-b border-mobile-border">
        <div className="flex items-center gap-3">
          <BackButton />
          <h1 className="text-lg font-semibold">New listing</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`text-primary ${isAIAssistOpen ? 'bg-accent' : ''}`}
            onClick={() => setIsAIAssistOpen(!isAIAssistOpen)}
            title="Toggle AI Assistant"
          >
            <Bot className="h-4 w-4 mr-1" />
            AI
          </Button>
          <Button variant="ghost" size="sm" className="text-primary">
            Next
          </Button>
        </div>
      </div>


      <div className="p-4 space-y-6">

        {/* Add Photos */}
        <AddPhotosCard
          photos={photos}
          onAddPhotos={() => setIsPhotoSheetOpen(true)}
          onRemovePhoto={removePhoto}
          onSetMainPhoto={setMainPhoto}
          onMultiSelect={handleSelectMultiple}
          isLoading={isLoading}
        />

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">Title</Label>
            <Input
              id="title"
              placeholder="What are you selling?"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="bg-mobile-surface border-mobile-border"
            />
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium">Selling Price</Label>
              <Input
                id="price"
                placeholder="0"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="bg-mobile-surface border-mobile-border"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="purchase-price" className="text-sm font-medium">Purchase Price</Label>
              <Input
                id="purchase-price"
                placeholder="0"
                value={formData.purchasePrice}
                onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                className="bg-mobile-surface border-mobile-border"
              />
              <p className="text-xs text-muted-foreground">Optional, for profit tracking</p>
            </div>
          </div>

          {/* Profit margin display */}
          {formData.price && formData.purchasePrice && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
              <p className="text-sm text-green-700 dark:text-green-300">
                Profit Margin: {Math.round(((parseFloat(formData.price) - parseFloat(formData.purchasePrice)) / parseFloat(formData.price)) * 100)}%
                (${(parseFloat(formData.price) - parseFloat(formData.purchasePrice)).toFixed(2)} profit)
              </p>
            </div>
          )}

          {/* Category */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger className="bg-mobile-surface border-mobile-border">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-mobile-border">
                {Object.entries(CATEGORIES).map(([key, config]) => (
                  <SelectItem key={key} value={key}>{config.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subcategory */}
          {formData.category && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Subcategory</Label>
              <Select value={formData.subcategory} onValueChange={(value) => handleInputChange('subcategory', value)}>
                <SelectTrigger className="bg-mobile-surface border-mobile-border">
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-mobile-border">
                  {Object.entries(getSubcategories(formData.category)).map(([key, config]) => (
                    <SelectItem key={key} value={key}>{config.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Condition */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Condition</Label>
            <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
              <SelectTrigger className="bg-mobile-surface border-mobile-border">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-mobile-border">
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="like-new">Like New</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
                <SelectItem value="poor">Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your item"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="bg-mobile-surface border-mobile-border min-h-[100px] resize-none"
              rows={4}
            />
            <p className="text-xs text-muted-foreground">Optional</p>
          </div>


          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-medium">Tags</Label>
            <Input
              id="tags"
              placeholder="Add tags to help buyers find your item"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              className="bg-mobile-surface border-mobile-border"
            />
            <p className="text-xs text-muted-foreground">Optional, Limit: 20 tags</p>
          </div>

          {/* SKU */}
          <div className="space-y-2">
            <Label htmlFor="sku" className="text-sm font-medium">SKU</Label>
            <Input
              id="sku"
              placeholder="Enter SKU"
              value={formData.sku}
              onChange={(e) => handleInputChange('sku', e.target.value)}
              className="bg-mobile-surface border-mobile-border"
            />
            <p className="text-xs text-muted-foreground">Optional, Only visible to you</p>
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Availability</Label>
            <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
              <SelectTrigger className="bg-mobile-surface border-mobile-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-mobile-border">
                <SelectItem value="List as In Stock">List as In Stock</SelectItem>
                <SelectItem value="List as Out of Stock">List as Out of Stock</SelectItem>
                <SelectItem value="Hide from Catalog">Hide from Catalog</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stock Management */}
        <div className="space-y-4">
          <h3 className="font-medium">Stock Management</h3>
          
          <div className="flex items-center justify-between py-2">
            <Label htmlFor="track-inventory" className="text-sm font-medium">Track inventory</Label>
            <Switch
              id="track-inventory"
              checked={formData.trackInventory}
              onCheckedChange={(checked) => handleInputChange('trackInventory', checked)}
            />
          </div>

          {formData.trackInventory && (
            <div className="bg-mobile-surface border border-mobile-border rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="stock-quantity" className="text-sm font-medium">Stock Quantity</Label>
                  <Input
                    id="stock-quantity"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.stockQuantity}
                    onChange={(e) => handleInputChange('stockQuantity', parseInt(e.target.value) || 0)}
                    className="bg-background border-mobile-border"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="low-stock" className="text-sm font-medium">Low Stock Alert</Label>
                  <Input
                    id="low-stock"
                    type="number"
                    min="0"
                    placeholder="5"
                    value={formData.lowStockThreshold}
                    onChange={(e) => handleInputChange('lowStockThreshold', parseInt(e.target.value) || 5)}
                    className="bg-background border-mobile-border"
                  />
                  <p className="text-xs text-muted-foreground">Alert when stock is low</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Product Variants */}
        <ProductVariantsSection
          category={formData.category}
          subcategory={formData.subcategory}
          variants={productVariants}
          onVariantsChange={setProductVariants}
        />

        {/* Additional Attributes */}
        <AdditionalAttributesSection
          category={formData.category}
          subcategory={formData.subcategory}
          attributes={additionalAttributes}
          onAttributesChange={setAdditionalAttributes}
        />

        {/* Offer Shipping */}
        <div className="flex items-center justify-between py-2">
          <Label htmlFor="offer-shipping" className="text-sm font-medium">Offer shipping</Label>
          <Switch
            id="offer-shipping"
            checked={formData.offerShipping}
            onCheckedChange={(checked) => handleInputChange('offerShipping', checked)}
          />
        </div>

        {/* Meetup Preferences */}
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Meetup preferences</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Buyers will be able to see your preferences on your listing.{' '}
              <span className="text-primary">Learn more</span>
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-muted rounded flex items-center justify-center mt-0.5">
                <Info className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Public meetup</p>
                    <p className="text-sm text-muted-foreground">Meet at a public location.</p>
                    <p className="text-sm text-primary">See Safety Tips</p>
                  </div>
                  <Checkbox
                    checked={formData.publicMeetup}
                    onCheckedChange={(checked) => handleInputChange('publicMeetup', checked)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-muted rounded flex items-center justify-center mt-0.5">
                <Info className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Door pickup</p>
                    <p className="text-sm text-muted-foreground">Buyer picks up at your door.</p>
                  </div>
                  <Checkbox
                    checked={formData.doorPickup}
                    onCheckedChange={(checked) => handleInputChange('doorPickup', checked)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-muted rounded flex items-center justify-center mt-0.5">
                <Info className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Door dropoff</p>
                    <p className="text-sm text-muted-foreground">You drop off at buyer's door.</p>
                  </div>
                  <Checkbox
                    checked={formData.doorDropoff}
                    onCheckedChange={(checked) => handleInputChange('doorDropoff', checked)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Bottom Action Buttons */}
        <div className="flex items-center gap-3 pt-6 pb-4 border-t border-mobile-border">
          <Button
            onClick={handlePublishToFB}
            className="flex-1 h-12 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Publish to FB Marketplace
          </Button>
          <Button
            variant="outline"
            className="h-12 px-6 border-mobile-border"
          >
            Save
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full border-mobile-border"
            onClick={handleShareListing}
            title="Share listing details"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* AI Assist Popover */}
      <AIAssistPopover
        isOpen={isAIAssistOpen}
        onClose={() => setIsAIAssistOpen(false)}
        onToneSelect={handleAIToneSelect}
      />

      {/* Photo Selection Sheet */}
      <PhotoSelectionSheet
        isOpen={isPhotoSheetOpen}
        onClose={() => setIsPhotoSheetOpen(false)}
        onTakePhoto={handleTakePhoto}
        onSelectFromGallery={handleSelectFromGallery}
        onSelectMultiple={handleSelectMultiple}
        isLoading={isLoading}
      />

      {/* Live Camera View */}
      <LiveCameraView
        isOpen={isLiveCameraOpen}
        onClose={() => setIsLiveCameraOpen(false)}
        onCapture={handleLiveCameraCapture}
        isLoading={isLoading}
      />

      {/* Success Pop-up */}
      <PhotoSuccessPopup
        photo={successPhoto}
        productTitle={formData.title}
        productPrice={formData.price}
        onClose={() => setSuccessPhoto(null)}
      />
    </div>
  );
};

export default NewListingForm;