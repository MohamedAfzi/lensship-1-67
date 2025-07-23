
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { loginSchema, LoginFormData } from '@/lib/auth-schemas';
import { useToast } from '@/hooks/use-toast';
import { useService } from '@/contexts/ServiceContext';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { serviceBrand } = useService();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Placeholder for actual login logic
      console.log('Login data:', data);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
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

  return (
    <AuthLayout title="Sign In" subtitle="Welcome back! Please sign in to your account.">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    style={{ 
                      '--tw-ring-color': serviceBrand.primaryColor,
                    } as React.CSSProperties}
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
                      placeholder="Enter your password"
                      className="h-12 bg-mobile-surface border-mobile-border text-mobile-text-primary pr-12 focus:border-2 transition-colors duration-300"
                      style={{ 
                        '--tw-ring-color': serviceBrand.primaryColor,
                      } as React.CSSProperties}
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

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
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
                      Remember me
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Link
              to="/forgot-password"
              className="text-sm hover:underline transition-colors duration-300"
              style={getServiceLinkStyle()}
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full h-12 hover:scale-105 transition-all duration-300"
            style={getServiceButtonStyle()}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-mobile-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-mobile-text-secondary">Or continue with</span>
            </div>
          </div>

          <SocialLoginButtons type="login" />

          <p className="text-center text-sm text-mobile-text-secondary">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="hover:underline font-medium transition-colors duration-300"
              style={getServiceLinkStyle()}
            >
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default Login;
