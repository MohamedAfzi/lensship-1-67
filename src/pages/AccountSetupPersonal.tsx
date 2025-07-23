import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SetupLayout } from '@/components/account-setup/SetupLayout';
import { ImageUploader } from '@/components/account-setup/ImageUploader';
import { PhoneInput } from '@/components/account-setup/PhoneInput';
import { personalInfoSchema, PersonalInfoFormData } from '@/lib/account-setup-schemas';
import { useToast } from '@/hooks/use-toast';

const AccountSetupPersonal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: '',
      profilePhoto: '',
      phoneNumber: '',
      countryCode: '+1',
      dateOfBirth: '',
      bio: '',
      address: '',
      emergencyContact: '',
    },
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    // Store data in localStorage for now
    localStorage.setItem('accountSetup_personal', JSON.stringify(data));
    
    toast({
      title: "Personal information saved",
      description: "Moving to store setup...",
    });
    
    navigate('/account-setup/store');
  };

  return (
    <SetupLayout
      title="Personal Info"
      subtitle="Tell us about yourself to get started"
      currentStep={1}
      totalSteps={4}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Photo */}
          <FormField
            control={form.control}
            name="profilePhoto"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-mobile-text-primary">Profile Photo</FormLabel>
                <FormControl>
                  <ImageUploader
                    type="profile"
                    value={field.value}
                    onChange={field.onChange}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-mobile-text-primary">Full Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    className="bg-mobile-surface border-mobile-border text-mobile-text-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormItem>
            <FormLabel className="text-mobile-text-primary">Phone Number *</FormLabel>
            <PhoneInput
              countryCode={form.watch('countryCode')}
              phoneNumber={form.watch('phoneNumber')}
              onCountryCodeChange={(code) => form.setValue('countryCode', code)}
              onPhoneNumberChange={(number) => form.setValue('phoneNumber', number)}
              error={form.formState.errors.phoneNumber?.message}
            />
          </FormItem>

          {/* Date of Birth */}
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-mobile-text-primary">Date of Birth</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="bg-mobile-surface border-mobile-border text-mobile-text-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bio */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-mobile-text-primary">Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about yourself... (max 250 characters)"
                    maxLength={250}
                    className="bg-mobile-surface border-mobile-border text-mobile-text-primary resize-none"
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-between items-center">
                  <FormMessage />
                  <span className="text-xs text-mobile-text-secondary">
                    {field.value?.length || 0}/250
                  </span>
                </div>
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-mobile-text-primary">Address *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your address"
                    className="bg-mobile-surface border-mobile-border text-mobile-text-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Emergency Contact */}
          <FormField
            control={form.control}
            name="emergencyContact"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-mobile-text-primary">Emergency Contact</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Emergency contact number"
                    className="bg-mobile-surface border-mobile-border text-mobile-text-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Continue to Store Setup
          </Button>
        </form>
      </Form>
    </SetupLayout>
  );
};

export default AccountSetupPersonal;