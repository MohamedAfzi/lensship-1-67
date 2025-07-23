import React from 'react';
import { Plus, Camera, Image, Link } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useFABMenus } from '@/hooks/useFABMenus';

export const RadialFABMenu = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { isMenuOpen, toggleMenu, closeMenu, resetTimeout } = useFABMenus();

  const isOpen = isMenuOpen('radial');

  const handleAction = (action: 'camera' | 'gallery' | 'url') => {
    resetTimeout();
    closeMenu();
    switch (action) {
      case 'camera':
        navigate('/camera-scan');
        break;
      case 'gallery':
        navigate('/gallery-upload');
        break;
      case 'url':
        // Navigate to URL input page (to be created)
        console.log('URL input selected');
        break;
    }
  };

  const handleToggle = () => {
    toggleMenu('radial');
  };

  return (
    <div className="fixed bottom-20 right-6 z-[55]">
      {/* Sub-buttons - Curved Arc Layout */}
      <div
        className={`absolute bottom-0 right-0 transition-all duration-300 ease-out ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
        }`}
      >
        {/* Camera Button - Top-left of arc (135° angle - 42px diagonal) */}
        <Button
          onClick={() => handleAction('camera')}
          className={`absolute h-12 w-12 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 shadow-lg transition-all duration-300 ease-out ${
            isOpen ? 'translate-y-0 translate-x-0' : 'translate-y-2 translate-x-2'
          }`}
          style={{
            bottom: '42px',
            right: '42px',
            transitionDelay: isOpen ? '50ms' : '0ms',
          }}
          size="icon"
          title="Scan with Camera"
        >
          <Camera className="h-5 w-5" />
        </Button>

        {/* Gallery Button - Top-center of arc (90° angle - 60px up) */}
        <Button
          onClick={() => handleAction('gallery')}
          className={`absolute h-12 w-12 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 shadow-lg transition-all duration-300 ease-out ${
            isOpen ? 'translate-y-0 translate-x-0' : 'translate-y-3 translate-x-0'
          }`}
          style={{
            bottom: '60px',
            right: '0px',
            transitionDelay: isOpen ? '100ms' : '0ms',
          }}
          size="icon"
          title="Choose from Gallery"
        >
          <Image className="h-5 w-5" />
        </Button>

        {/* URL Button - Top-right of arc (45° angle - 42px diagonal) */}
        <Button
          onClick={() => handleAction('url')}
          className={`absolute h-12 w-12 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 shadow-lg transition-all duration-300 ease-out ${
            isOpen ? 'translate-y-0 translate-x-0' : 'translate-y-2 -translate-x-2'
          }`}
          style={{
            bottom: '42px',
            right: '-42px',
            transitionDelay: isOpen ? '150ms' : '0ms',
          }}
          size="icon"
          title="Add from URL"
        >
          <Link className="h-5 w-5" />
        </Button>
      </div>

      {/* Main FAB Button */}
      <Button
        onClick={handleToggle}
        className={`h-14 w-14 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 shadow-lg transition-all duration-300 ease-out z-[50] ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
        size="icon"
        title="Add Product"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};