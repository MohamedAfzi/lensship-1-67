import BackButton from '@/components/navigation/BackButton';
import { CreditCard } from 'lucide-react';

const Subscription = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto">
        <div className="mb-6">
          <BackButton />
        </div>
        
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="h-8 w-8 text-neon-blue" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Subscription Status</h1>
          <p className="text-muted-foreground text-lg">
            This feature is coming soon. Manage your subscription and billing from here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subscription;