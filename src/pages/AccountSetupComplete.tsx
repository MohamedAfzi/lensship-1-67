import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, User, Store, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SetupLayout } from '@/components/account-setup/SetupLayout';
import { PersonalInfoFormData, StoreInfoFormData, PreferencesFormData } from '@/lib/account-setup-schemas';

const AccountSetupComplete = () => {
  const navigate = useNavigate();
  const [setupData, setSetupData] = useState<{
    personal?: PersonalInfoFormData;
    store?: StoreInfoFormData;
    preferences?: PreferencesFormData;
  }>({});

  useEffect(() => {
    // Load setup data from localStorage
    const personalData = localStorage.getItem('accountSetup_personal');
    const storeData = localStorage.getItem('accountSetup_store');
    const preferencesData = localStorage.getItem('accountSetup_preferences');

    setSetupData({
      personal: personalData ? JSON.parse(personalData) : undefined,
      store: storeData ? JSON.parse(storeData) : undefined,
      preferences: preferencesData ? JSON.parse(preferencesData) : undefined,
    });
  }, []);

  const handleFinish = () => {
    // In a real app, this would send data to backend
    // For now, just clear localStorage and redirect
    localStorage.removeItem('accountSetup_personal');
    localStorage.removeItem('accountSetup_store');
    localStorage.removeItem('accountSetup_preferences');
    
    navigate('/');
  };

  const handleEditProfile = () => {
    navigate('/account-setup/personal');
  };

  return (
    <SetupLayout
      title="Welcome!"
      subtitle="Your account is now set up and ready to go"
      currentStep={4}
      totalSteps={4}
      showBackButton={false}
    >
      <div className="space-y-6">
        {/* Success Animation */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <Check className="h-10 w-10 text-primary-foreground" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-primary rounded-full animate-ping opacity-75" />
          </div>
        </div>

        {/* Setup Summary */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-mobile-text-primary text-center">
            Account Setup Complete!
          </h2>
          
          <div className="space-y-3">
            {/* Personal Info Summary */}
            <Card className="bg-mobile-surface border-mobile-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-mobile-text-primary">Personal Information</h3>
                    <p className="text-sm text-mobile-text-secondary">
                      {setupData.personal?.fullName || 'Profile setup complete'}
                    </p>
                  </div>
                  <Check className="h-5 w-5 text-primary" />
                </div>
              </CardContent>
            </Card>

            {/* Store Info Summary */}
            <Card className="bg-mobile-surface border-mobile-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Store className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-mobile-text-primary">Store Setup</h3>
                    <p className="text-sm text-mobile-text-secondary">
                      {setupData.store?.storeName || 'Store configuration complete'}
                    </p>
                  </div>
                  <Check className="h-5 w-5 text-primary" />
                </div>
              </CardContent>
            </Card>

            {/* Preferences Summary */}
            <Card className="bg-mobile-surface border-mobile-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Settings className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-mobile-text-primary">Preferences</h3>
                    <p className="text-sm text-mobile-text-secondary">
                      Notifications and privacy settings configured
                    </p>
                  </div>
                  <Check className="h-5 w-5 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Next Steps */}
        <Card className="bg-mobile-surface border-mobile-border">
          <CardContent className="p-4">
            <h3 className="font-medium text-mobile-text-primary mb-3">What's Next?</h3>
            <ul className="space-y-2 text-sm text-mobile-text-secondary">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Start creating your first listing
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Upload photos of your items
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Connect with buyers in your area
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Build your seller reputation
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleFinish}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Start Selling
          </Button>
          
          <Button
            variant="outline"
            onClick={handleEditProfile}
            className="w-full bg-mobile-surface border-mobile-border text-mobile-text-primary hover:bg-mobile-header"
          >
            Review Profile Settings
          </Button>
        </div>
      </div>
    </SetupLayout>
  );
};

export default AccountSetupComplete;