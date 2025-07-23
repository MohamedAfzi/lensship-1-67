import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SetupLayout } from '@/components/account-setup/SetupLayout';
import { preferencesSchema, PreferencesFormData } from '@/lib/account-setup-schemas';
import { useToast } from '@/hooks/use-toast';

const AccountSetupPreferences = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      profileVisibility: 'public',
      shareContactInfo: false,
      language: 'en',
      currency: 'USD',
      shippingZones: [],
      paymentMethods: [],
      autoResponses: false,
    },
  });

  const onSubmit = (data: PreferencesFormData) => {
    // Store data in localStorage for now
    localStorage.setItem('accountSetup_preferences', JSON.stringify(data));
    
    toast({
      title: "Preferences saved",
      description: "Completing setup...",
    });
    
    navigate('/account-setup/complete');
  };

  const handleBack = () => {
    navigate('/account-setup/store');
  };

  return (
    <SetupLayout
      title="Preferences"
      subtitle="Customize your experience and settings"
      currentStep={3}
      totalSteps={4}
      onBack={handleBack}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Notifications */}
          <div className="space-y-4">
            <h3 className="text-mobile-text-primary font-medium">Notifications</h3>
            
            <FormField
              control={form.control}
              name="emailNotifications"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel className="text-mobile-text-primary">Email Notifications</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pushNotifications"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel className="text-mobile-text-primary">Push Notifications</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="smsNotifications"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel className="text-mobile-text-primary">SMS Notifications</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Privacy */}
          <div className="space-y-4">
            <h3 className="text-mobile-text-primary font-medium">Privacy</h3>
            
            <FormField
              control={form.control}
              name="profileVisibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-mobile-text-primary">Profile Visibility</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-mobile-surface border-mobile-border text-mobile-text-primary">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-mobile-surface border-mobile-border">
                      <SelectItem value="public" className="text-mobile-text-primary">Public</SelectItem>
                      <SelectItem value="private" className="text-mobile-text-primary">Private</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shareContactInfo"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel className="text-mobile-text-primary">Share Contact Info</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Localization */}
          <div className="space-y-4">
            <h3 className="text-mobile-text-primary font-medium">Localization</h3>
            
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-mobile-text-primary">Language</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-mobile-surface border-mobile-border text-mobile-text-primary">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-mobile-surface border-mobile-border">
                      <SelectItem value="en" className="text-mobile-text-primary">English</SelectItem>
                      <SelectItem value="es" className="text-mobile-text-primary">Spanish</SelectItem>
                      <SelectItem value="fr" className="text-mobile-text-primary">French</SelectItem>
                      <SelectItem value="de" className="text-mobile-text-primary">German</SelectItem>
                      <SelectItem value="ar" className="text-mobile-text-primary">Arabic</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-mobile-text-primary">Currency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-mobile-surface border-mobile-border text-mobile-text-primary">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-mobile-surface border-mobile-border">
                      <SelectItem value="USD" className="text-mobile-text-primary">USD ($)</SelectItem>
                      <SelectItem value="EUR" className="text-mobile-text-primary">EUR (€)</SelectItem>
                      <SelectItem value="GBP" className="text-mobile-text-primary">GBP (£)</SelectItem>
                      <SelectItem value="CAD" className="text-mobile-text-primary">CAD (C$)</SelectItem>
                      <SelectItem value="AUD" className="text-mobile-text-primary">AUD (A$)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Business Settings */}
          <div className="space-y-4">
            <h3 className="text-mobile-text-primary font-medium">Business Settings</h3>
            
            <FormField
              control={form.control}
              name="autoResponses"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <div>
                    <FormLabel className="text-mobile-text-primary">Auto Responses</FormLabel>
                    <p className="text-xs text-mobile-text-secondary mt-1">
                      Automatically respond to inquiries
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Complete Setup
          </Button>
        </form>
      </Form>
    </SetupLayout>
  );
};

export default AccountSetupPreferences;