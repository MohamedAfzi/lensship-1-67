
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, User, Mail, Lock, Building, Phone, Store, ShoppingBag, ShoppingCart, Warehouse } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { registerSchema, RegisterFormData } from '@/lib/auth-schemas';
import { useToast } from '@/hooks/use-toast';
import { SelectableCard } from '@/components/ui/selectable-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useService } from '@/contexts/ServiceContext';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { serviceBrand } = useService();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      accountType: undefined,
      vendorCategory: undefined,
      agreeToTerms: false,
    },
  });

  const vendorCategories = [
    {
      value: 'retail_merchant',
      title: 'Retail Merchant',
      description: 'Individual or small business selling products',
      icon: <Store className="h-5 w-5" />
    },
    {
      value: 'commercial_center',
      title: 'Commercial Center',
      description: 'Business complex or commercial hub',
      icon: <Building className="h-5 w-5" />
    },
    {
      value: 'shopping_mall',
      title: 'Shopping Mall',
      description: 'Large retail complex with multiple stores',
      icon: <ShoppingBag className="h-5 w-5" />
    },
    {
      value: 'supermarket',
      title: 'Supermarket',
      description: 'Large self-service store selling groceries',
      icon: <ShoppingCart className="h-5 w-5" />
    }
  ];

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      // Placeholder for actual registration logic
      console.log('Registration data:', data);
      toast({
        title: "Registration successful",
        description: "Welcome! Your account has been created.",
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getServiceButtonStyle = () => ({
    backgroundColor: serviceBrand.primaryColor,
    color: 'hsl(var(--background))',
    borderColor: serviceBrand.primaryColor
  });

  const getServiceLinkStyle = () => ({
    color: serviceBrand.primaryColor
  });

  const getInputStyle = () => ({
    '--tw-ring-color': serviceBrand.primaryColor,
  } as React.CSSProperties);

  return (
    <AuthLayout title="Sign Up" subtitle="Create your account to get started.">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="accountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-mobile-text-primary">Account Type</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger 
                      className="h-12 bg-mobile-surface border-mobile-border text-mobile-text-primary focus:border-2 transition-colors duration-300"
                      style={getInputStyle()}
                    >
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vendor">Vendor / Supplier</SelectItem>
                      <SelectItem value="dropshipping">Dropshipping</SelectItem>
                      <SelectItem value="delivery_agent">Delivery Agent</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch('accountType') === 'vendor' && (
            <FormField
              control={form.control}
              name="vendorCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-mobile-text-primary">Vendor Category</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {vendorCategories.map((category) => (
                        <SelectableCard
                          key={category.value}
                          id={category.value}
                          value={category.value}
                          selectedValue={field.value}
                          onSelect={field.onChange}
                          title={category.title}
                          description={category.description}
                          icon={category.icon}
                          className="animate-fade-in"
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-mobile-text-primary">Full Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    className="h-12 bg-mobile-surface border-mobile-border text-mobile-text-primary focus:border-2 transition-colors duration-300"
                    style={getInputStyle()}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-mobile-text-primary">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 bg-mobile-surface border-mobile-border text-mobile-text-primary focus:border-2 transition-colors duration-300"
                    style={getInputStyle()}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-mobile-text-primary">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="h-12 bg-mobile-surface border-mobile-border text-mobile-text-primary pr-12 focus:border-2 transition-colors duration-300"
                      style={getInputStyle()}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-mobile-text-secondary hover:text-mobile-text-primary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-mobile-text-primary">Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="h-12 bg-mobile-surface border-mobile-border text-mobile-text-primary pr-12 focus:border-2 transition-colors duration-300"
                      style={getInputStyle()}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-mobile-text-secondary hover:text-mobile-text-primary"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm text-mobile-text-secondary">
                    I agree to the{' '}
                    <Link 
                      to="/terms" 
                      className="hover:underline transition-colors duration-300"
                      style={getServiceLinkStyle()}
                    >
                      Terms of Service
                    </Link>
                    {' '}
                    and{' '}
                    <Link 
                      to="/privacy" 
                      className="hover:underline transition-colors duration-300"
                      style={getServiceLinkStyle()}
                    >
                      Privacy Policy
                    </Link>
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-12 hover:scale-105 transition-all duration-300"
            style={getServiceButtonStyle()}
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-mobile-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-mobile-text-secondary">Or continue with</span>
            </div>
          </div>

          <SocialLoginButtons type="register" />

          <p className="text-center text-sm text-mobile-text-secondary">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="hover:underline font-medium transition-colors duration-300"
              style={getServiceLinkStyle()}
            >
              Sign in
            </Link>
          </p>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default Register;
