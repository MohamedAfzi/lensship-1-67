import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SetupLayout } from '@/components/account-setup/SetupLayout';
import { ImageUploader } from '@/components/account-setup/ImageUploader';
import { CategorySelector } from '@/components/account-setup/CategorySelector';
import { storeInfoSchema, StoreInfoFormData } from '@/lib/account-setup-schemas';
import { useToast } from '@/hooks/use-toast';

const AccountSetupStore = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<StoreInfoFormData>({
    resolver: zodResolver(storeInfoSchema),
    defaultValues: {
      storeName: '',
      storeCategory: '',
      storeSubcategory: '',
      storeTitle: '',
      storeDescription: '',
      businessType: 'individual',
      storeLogo: '',
      storeBanner: '',
      businessRegistrationNumber: '',
      taxId: '',
      websiteUrl: '',
      instagramUrl: '',
      facebookUrl: '',
      twitterUrl: '',
    },
  });

  const onSubmit = (data: StoreInfoFormData) => {
    // Store data in localStorage for now
    localStorage.setItem('accountSetup_store', JSON.stringify(data));
    
    toast({
      title: "Store information saved",
      description: "Moving to preferences...",
    });
    
    navigate('/account-setup/preferences');
  };

  const handleBack = () => {
    navigate('/account-setup/personal');
  };

  return (
    <SetupLayout
      title="Store Setup"
      subtitle="Set up your store information and branding"
      currentStep={2}
      totalSteps={4}
      onBack={handleBack}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Store Logo */}
          <FormField
            control={form.control}
            name="storeLogo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-mobile-text-primary">Store Logo</FormLabel>
                <FormControl>
                  <ImageUploader
                    type="logo"
                    value={field.value}
                    onChange={field.onChange}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Store Name */}
          <FormField
            control={form.control}
            name="storeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-mobile-text-primary">Store Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your store name"
                    className="bg-mobile-surface border-mobile-border text-mobile-text-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Store Category */}
          <FormItem>
            <FormLabel className="text-mobile-text-primary">Store Category *</FormLabel>
            <CategorySelector
              selectedCategory={form.watch('storeCategory')}
              selectedSubcategory={form.watch('storeSubcategory')}
              onCategoryChange={(category) => {
                form.setValue('storeCategory', category);
                form.setValue('storeSubcategory', ''); // Reset subcategory
              }}
              onSubcategoryChange={(subcategory) => form.setValue('storeSubcategory', subcategory)}
            />
            {form.formState.errors.storeCategory && (
              <p className="text-sm font-medium text-destructive mt-1">
                {form.formState.errors.storeCategory.message}
              </p>
            )}
          </FormItem>

          {/* Business Type */}
          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-mobile-text-primary">Business Type *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-mobile-surface border-mobile-border text-mobile-text-primary">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-mobile-surface border-mobile-border">
                    <SelectItem value="individual" className="text-mobile-text-primary">Individual</SelectItem>
                    <SelectItem value="small_business" className="text-mobile-text-primary">Small Business</SelectItem>
                    <SelectItem value="company" className="text-mobile-text-primary">Company</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Store Title */}
          <FormField
            control={form.control}
            name="storeTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-mobile-text-primary">Store Tagline</FormLabel>
                <FormControl>
                  <Input
                    placeholder="A catchy tagline for your store"
                    maxLength={100}
                    className="bg-mobile-surface border-mobile-border text-mobile-text-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Store Description */}
          <FormField
            control={form.control}
            name="storeDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-mobile-text-primary">Store Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your store and what you sell..."
                    maxLength={500}
                    className="bg-mobile-surface border-mobile-border text-mobile-text-primary resize-none"
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-between items-center">
                  <FormMessage />
                  <span className="text-xs text-mobile-text-secondary">
                    {field.value?.length || 0}/500
                  </span>
                </div>
              </FormItem>
            )}
          />

          {/* Store Banner */}
          <FormField
            control={form.control}
            name="storeBanner"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-mobile-text-primary">Store Banner</FormLabel>
                <FormControl>
                  <ImageUploader
                    type="banner"
                    value={field.value}
                    onChange={field.onChange}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Website URL */}
          <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-mobile-text-primary">Website URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://your-website.com"
                    className="bg-mobile-surface border-mobile-border text-mobile-text-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Social Media Links */}
          <div className="space-y-4">
            <h3 className="text-mobile-text-primary font-medium">Social Media (Optional)</h3>
            
            <FormField
              control={form.control}
              name="instagramUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-mobile-text-primary">Instagram</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://instagram.com/yourusername"
                      className="bg-mobile-surface border-mobile-border text-mobile-text-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="facebookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-mobile-text-primary">Facebook</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://facebook.com/yourpage"
                      className="bg-mobile-surface border-mobile-border text-mobile-text-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Continue to Preferences
          </Button>
        </form>
      </Form>
    </SetupLayout>
  );
};

export default AccountSetupStore;