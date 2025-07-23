import React from 'react';
import { Wifi, Bluetooth, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface POSQRPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onInteraction?: () => void;
}

export function POSQRPopup({ isOpen, onClose, onInteraction }: POSQRPopupProps) {
  const navigate = useNavigate();

  const handleAction = (action: 'wifi' | 'bluetooth' | 'scan') => {
    onInteraction?.();
    onClose();
    switch (action) {
      case 'wifi':
        navigate('/wifi-scanner');
        break;
      case 'bluetooth':
        navigate('/bluetooth-scanner');
        break;
      case 'scan':
        navigate('/camera-scan');
        break;
    }
  };

  return (
    <div
      className={`absolute bottom-0 left-0 transition-all duration-300 ease-out ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
      }`}
    >
      {/* Wi-Fi QR Button */}
      <Button
        onClick={() => handleAction('wifi')}
        className={`absolute bottom-16 left-0 h-12 w-12 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 shadow-lg transition-all duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-4'
        }`}
        style={{
          transitionDelay: isOpen ? '50ms' : '0ms',
        }}
        size="icon"
        title="Wi-Fi QR Scanner"
      >
        <Wifi className="h-5 w-5" />
      </Button>

      {/* Bluetooth QR Button */}
      <Button
        onClick={() => handleAction('bluetooth')}
        className={`absolute bottom-32 left-0 h-12 w-12 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 shadow-lg transition-all duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-6'
        }`}
        style={{
          transitionDelay: isOpen ? '100ms' : '0ms',
        }}
        size="icon"
        title="Bluetooth QR Scanner"
      >
        <Bluetooth className="h-5 w-5" />
      </Button>

      {/* Scan QR Button */}
      <Button
        onClick={() => handleAction('scan')}
        className={`absolute bottom-48 left-0 h-12 w-12 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 shadow-lg transition-all duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-8'
        }`}
        style={{
          transitionDelay: isOpen ? '150ms' : '0ms',
        }}
        size="icon"
        title="Smart QR Scanner"
      >
        <QrCode className="h-5 w-5" />
      </Button>
    </div>
  );
}