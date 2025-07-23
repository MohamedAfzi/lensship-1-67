import React from 'react';
import { QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { POSQRPopup } from './POSQRPopup';
import { useUser } from '@/contexts/UserContext';
import { useFABMenus } from '@/hooks/useFABMenus';

export function POSQRButton() {
  const { isVendor } = useUser();
  const { isMenuOpen, toggleMenu, closeMenu, resetTimeout } = useFABMenus();

  if (!isVendor) {
    return null;
  }

  const isOpen = isMenuOpen('pos-qr');

  const handleToggle = () => {
    toggleMenu('pos-qr');
  };

  return (
    <div className="fixed bottom-20 left-6 z-[55]">
      <POSQRPopup 
        isOpen={isOpen} 
        onClose={closeMenu} 
        onInteraction={resetTimeout}
      />
      
      {/* Main POS QR Button */}
      <Button
        onClick={handleToggle}
        className={`h-14 w-14 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 shadow-lg transition-all duration-300 ease-out z-[50] ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
        size="icon"
        title="POS QR Menu"
      >
        <QrCode className="h-6 w-6" />
      </Button>
    </div>
  );
}