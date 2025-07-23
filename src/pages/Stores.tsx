import BackButton from '@/components/navigation/BackButton';
import { Store } from 'lucide-react';

const Stores = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto">
        <div className="mb-6">
          <BackButton />
        </div>
        
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Store className="h-8 w-8 text-neon-blue" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Store Management</h1>
          <p className="text-muted-foreground text-lg">
            This feature is coming soon. Connect and manage your online stores from here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stores;