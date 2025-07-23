import { useUser } from '@/contexts/UserContext';
import { DeliveryAgentProfile } from '@/lib/delivery-agent-schemas';

export function useDeliveryAgent() {
  const { user, updateDeliveryAgentProfile, isDeliveryAgentProfileComplete } = useUser();

  const saveProfile = (profile: DeliveryAgentProfile) => {
    updateDeliveryAgentProfile(profile);
  };

  const getProfile = (): DeliveryAgentProfile | null => {
    return user?.deliveryAgentProfile || null;
  };

  return {
    profile: getProfile(),
    isComplete: isDeliveryAgentProfileComplete,
    saveProfile,
  };
}