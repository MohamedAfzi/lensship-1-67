import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QrCode, User, MapPin, CreditCard, Truck, Package, DollarSign, Banknote } from 'lucide-react';
import BackButton from '@/components/navigation/BackButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleButtonGroup } from '@/components/ui/toggle-button-group';
import { Label } from '@/components/ui/label';
import { ProductSelector } from '@/components/delivery/ProductSelector';
import { QRScanner } from '@/components/delivery/QRScanner';
import { newDeliverySchema, type NewDeliveryForm, mockRegions } from '@/lib/delivery-schemas';
import { DeliveryExecutionOptions } from '@/components/delivery/DeliveryExecutionOptions';
import { InventoryProduct } from '@/types/product';
import { mockInventoryProducts } from '@/data/mockProducts';
import { useToast } from '@/hooks/use-toast';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

const NewDelivery = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<InventoryProduct | null>(null);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NewDeliveryForm>({
    resolver: zodResolver(newDeliverySchema),
    defaultValues: {
      productId: '',
      buyerName: '',
      buyerPhone: '',
      deliveryAddress: '',
      region: '',
      notes: '',
      paymentStatus: 'cod',
      receiptId: '',
      codAmount: 0,
      deliveryExecutionType: '' as any,
      deliveryMethod: 'manual',
    },
  });

  const paymentStatus = form.watch('paymentStatus');

  const paymentOptions = [
    {
      value: 'paid',
      label: 'Paid',
      description: 'Payment already completed',
      icon: <CreditCard className="h-4 w-4" />
    },
    {
      value: 'cod',
      label: 'Cash on Delivery',
      description: 'Payment on delivery',
      icon: <Banknote className="h-4 w-4" />
    }
  ];

  const handleProductSelect = (product: InventoryProduct) => {
    setSelectedProduct(product);
    form.setValue('productId', product.id);
    if (paymentStatus === 'cod') {
      form.setValue('codAmount', product.price);
    }
  };

  const handleQRScan = (data: string) => {
    try {
      const qrData = JSON.parse(data);
      if (qrData.productId) {
        // Find product by ID - in real app this would be an API call
        const product = mockInventoryProducts.find(p => p.id === qrData.productId);
        if (product) {
          handleProductSelect(product);
          toast({
            title: "Product Found",
            description: `${product.name} has been selected.`,
          });
        }
      }
    } catch (error) {
      toast({
        title: "Invalid QR Code",
        description: "The scanned QR code is not valid.",
        variant: "destructive",
      });
    }
  };

  const validatePhoneNumber = (phone: string) => {
    try {
      const phoneNumber = parsePhoneNumber(phone, 'US');
      return phoneNumber.isValid();
    } catch {
      return isValidPhoneNumber(phone);
    }
  };

  const onSubmit = async (data: NewDeliveryForm) => {
    if (!selectedProduct) {
      toast({
        title: "Product Required",
        description: "Please select a product for delivery.",
        variant: "destructive",
      });
      return;
    }

    if (!validatePhoneNumber(data.buyerPhone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Delivery Created",
        description: `Delivery order has been created successfully for ${selectedProduct.name}.`,
      });
      
      navigate('/orders/deliveries');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create delivery order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-mobile-header border-b border-mobile-border px-4 py-3">
        <div className="flex items-center">
          <BackButton />
          <h1 className="flex-1 text-center text-lg font-semibold text-foreground pr-16">
            New Delivery
          </h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Product Selection */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Package className="h-5 w-5 text-neon-blue" />
                  Product Selection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProductSelector
                  selectedProduct={selectedProduct}
                  onProductSelect={handleProductSelect}
                  onScanQR={() => setShowQRScanner(true)}
                />
              </CardContent>
            </Card>

            {/* Buyer Information */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <User className="h-5 w-5 text-neon-blue" />
                  Buyer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="buyerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter buyer's full name" className="bg-background border-border" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="buyerPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Phone Number *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="+1 (555) 000-0000" 
                          className="bg-background border-border" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deliveryAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Delivery Address *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter complete delivery address"
                          className="bg-background border-border"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">City/Region *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background border-border">
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockRegions.map((region) => (
                            <SelectItem key={region.value} value={region.value}>
                              {region.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any special instructions or notes"
                          className="bg-background border-border"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Payment Details */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <CreditCard className="h-5 w-5 text-neon-blue" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="paymentStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Payment Status</FormLabel>
                      <FormControl>
                        <ToggleButtonGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          options={paymentOptions}
                          size="sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {paymentStatus === 'paid' && (
                  <FormField
                    control={form.control}
                    name="receiptId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Receipt/Reference Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter receipt or reference number"
                            className="bg-background border-border"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {paymentStatus === 'cod' && (
                  <FormField
                    control={form.control}
                    name="codAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Amount to Collect</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="bg-background border-border"
                            value={field.value || selectedProduct?.price || 0}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </CardContent>
            </Card>

            {/* Delivery Execution Options */}
            <DeliveryExecutionOptions
              value={form.watch('deliveryExecutionType')}
              onChange={(value) => form.setValue('deliveryExecutionType', value)}
              onMethodChange={(method) => form.setValue('deliveryMethod', method)}
              selectedMethod={form.watch('deliveryMethod')}
            />

            {/* Order Summary */}
            {selectedProduct && (
              <Card className="bg-gradient-to-r from-neon-blue/10 to-neon-blue/5 border-neon-blue/30">
                <CardHeader className="pb-4">
                  <CardTitle className="text-foreground">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Product:</span>
                    <span className="text-foreground font-medium">{selectedProduct.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="text-foreground font-medium">${selectedProduct.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Payment:</span>
                    <span className="text-foreground font-medium">
                      {paymentStatus === 'paid' ? 'Already Paid' : 'Cash on Delivery'}
                    </span>
                  </div>
                  {paymentStatus === 'cod' && (
                    <div className="flex justify-between items-center border-t border-neon-blue/20 pt-2">
                      <span className="text-foreground font-medium">Amount to Collect:</span>
                      <span className="text-neon-blue font-bold text-lg">
                        ${form.watch('codAmount') || selectedProduct.price}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </form>
        </Form>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button 
          onClick={form.handleSubmit(onSubmit)}
          disabled={!selectedProduct || isSubmitting}
          className="w-full bg-neon-blue hover:bg-neon-blue/90 text-white font-semibold py-3 rounded-xl disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Delivery...
            </div>
          ) : (
            'Create Delivery Order'
          )}
        </Button>
      </div>

      {/* QR Scanner Modal */}
      <QRScanner
        isOpen={showQRScanner}
        onClose={() => setShowQRScanner(false)}
        onScan={handleQRScan}
        title="Scan Product QR Code"
      />
    </div>
  );
};

export default NewDelivery;