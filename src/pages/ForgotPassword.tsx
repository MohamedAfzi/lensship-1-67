
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { forgotPasswordSchema, ForgotPasswordFormData } from '@/lib/auth-schemas';
import { useToast } from '@/hooks/use-toast';
import { useService } from '@/contexts/ServiceContext';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();
  const { serviceBrand } = useService();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      // Placeholder for actual forgot password logic
      console.log('Forgot password data:', data);
      setEmailSent(true);
      toast({
        title: "Reset link sent",
        description: "Check your email for password reset instructions.",
      });
    } catch (error) {
      toast({
        title: "Failed to send reset link",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getServiceButtonStyle = (isPrimary: boolean = true) => {
    if (isPrimary) {
      return {
        backgroundColor: serviceBrand.primaryColor,
        color: 'hsl(var(--background))',
        borderColor: serviceBrand.primaryColor
      };
    }
    return {
      borderColor: `${serviceBrand.primaryColor}40`,
      color: serviceBrand.primaryColor
    };
  };

  const getServiceLinkStyle = () => ({
    color: serviceBrand.primaryColor
  });

  const getServiceIconStyle = () => ({
    backgroundColor: `${serviceBrand.primaryColor}20`,
    color: serviceBrand.primaryColor
  });

  if (emailSent) {
    return (
      <AuthLayout title="Check Your Email" showBackButton={false}>
        <div className="text-center space-y-6">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-colors duration-300"
            style={getServiceIconStyle()}
          >
            <Mail className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-mobile-text-primary">
              Reset link sent
            </h2>
            <p className="text-mobile-text-secondary">
              We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-mobile-border text-mobile-text-primary hover:bg-mobile-surface transition-all duration-300"
              style={getServiceButtonStyle(false)}
              onClick={() => setEmailSent(false)}
            >
              Send another email
            </Button>

            <Link to="/login">
              <Button
                type="button"
                className="w-full h-12 hover:scale-105 transition-all duration-300"
                style={getServiceButtonStyle()}
              >
                Back to Sign In
              </Button>
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Forgot Password" 
      subtitle="Enter your email address and we'll send you a link to reset your password."
    >
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

          <Button
            type="submit"
            className="w-full h-12 hover:scale-105 transition-all duration-300"
            style={getServiceButtonStyle()}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>

          <div className="text-center">
            <Link
              to="/login"
              className="text-sm hover:underline transition-colors duration-300"
              style={getServiceLinkStyle()}
            >
              Back to Sign In
            </Link>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default ForgotPassword;
