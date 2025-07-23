import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Bell, MessageSquare, Save } from 'lucide-react';
import BackButton from '@/components/navigation/BackButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { deliveryAgentProfileSchema, type DeliveryAgentProfile } from '@/lib/delivery-agent-schemas';
import { useDeliveryAgent } from '@/hooks/useDeliveryAgent';
import { useToast } from '@/hooks/use-toast';

const DeliveryAgentSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile, saveProfile } = useDeliveryAgent();

  const form = useForm<DeliveryAgentProfile>({
    resolver: zodResolver(deliveryAgentProfileSchema),
    defaultValues: profile || {
      name: '',
      phone: '',
      email: '',
      emailNotifications: true,
      smsNotifications: false,
    },
  });

  const smsNotifications = form.watch('smsNotifications');

  const onSubmit = (data: DeliveryAgentProfile) => {
    saveProfile(data);
    toast({
      title: "Settings Saved",
      description: "Your delivery agent profile has been updated successfully.",
    });
    navigate('/settings/user');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-mobile-header border-b border-mobile-border px-4 py-3">
        <div className="flex items-center">
          <BackButton />
          <h1 className="flex-1 text-center text-lg font-semibold text-foreground pr-16">
            Delivery Agent Settings
          </h1>
        </div>
      </div>

      <div className="px-4 py-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Information */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <User className="h-5 w-5 text-neon-blue" />
                  Delivery Agent Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Agent Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter delivery agent name" 
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
                  name="phone"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Email Address *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="agent@example.com" 
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

            {/* Notification Settings */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Bell className="h-5 w-5 text-neon-blue" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="emailNotifications"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <FormLabel className="text-foreground font-medium">Email Notifications</FormLabel>
                          <p className="text-xs text-muted-foreground">Receive delivery updates via email</p>
                        </div>
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

                <FormField
                  control={form.control}
                  name="smsNotifications"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <FormLabel className="text-foreground font-medium">SMS Notifications</FormLabel>
                          <p className="text-xs text-muted-foreground">Receive delivery updates via SMS</p>
                        </div>
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

                {smsNotifications && (
                  <Alert className="border-yellow-500/50 bg-yellow-500/10">
                    <MessageSquare className="h-4 w-4 text-yellow-500" />
                    <AlertDescription className="text-yellow-200">
                      ⚠️ Enabling SMS notifications will incur additional charges.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Save Button */}
            <Button 
              type="submit" 
              className="w-full bg-neon-blue hover:bg-neon-blue/80 text-black"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Delivery Agent Settings
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DeliveryAgentSettings;