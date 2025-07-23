import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { Photo } from '@/hooks/usePhotoManager';

interface PhotoSuccessPopupProps {
  photo: Photo | null;
  productTitle: string;
  productPrice: string;
  onClose: () => void;
}

export const PhotoSuccessPopup: React.FC<PhotoSuccessPopupProps> = ({
  photo,
  productTitle,
  productPrice,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (photo) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for fade out animation
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [photo, onClose]);

  if (!photo) return null;

  return (
    <div className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
    }`}>
      <div className="bg-background/95 backdrop-blur-sm border border-green-500/30 rounded-lg p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
            <img 
              src={photo.webPath} 
              alt="Captured photo" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <p className="font-medium text-sm">
              {productTitle || 'New Product'}
            </p>
            <p className="text-sm text-primary">
              {productPrice || 'Price not set'}
            </p>
          </div>
          
          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
            <Check className="h-4 w-4 text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
};