import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DeliveryAgentProfile } from '@/lib/delivery-agent-schemas';

export type AccountType = 'vendor' | 'dropshipping' | 'delivery_agent';
export type VendorCategory = 'retail_merchant' | 'commercial_center' | 'shopping_mall' | 'supermarket';

export interface User {
  id: string;
  fullName: string;
  email: string;
  accountType: AccountType;
  vendorCategory?: VendorCategory;
  deliveryAgentProfile?: DeliveryAgentProfile;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isVendor: boolean;
  updateDeliveryAgentProfile: (profile: DeliveryAgentProfile) => void;
  isDeliveryAgentProfileComplete: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // Mock user for development - Category A (vendor) with commercial_center access to FlowShip
  const [user, setUser] = useState<User | null>({
    id: '1',
    fullName: 'Demo User',
    email: 'demo@example.com',
    accountType: 'vendor',
    vendorCategory: 'commercial_center'
  });

  const isVendor = user?.accountType === 'vendor';

  const updateDeliveryAgentProfile = (profile: DeliveryAgentProfile) => {
    if (user) {
      setUser({
        ...user,
        deliveryAgentProfile: profile
      });
    }
  };

  const isDeliveryAgentProfileComplete = Boolean(
    user?.deliveryAgentProfile?.name &&
    user?.deliveryAgentProfile?.phone &&
    user?.deliveryAgentProfile?.email
  );

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      isVendor, 
      updateDeliveryAgentProfile, 
      isDeliveryAgentProfileComplete 
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}