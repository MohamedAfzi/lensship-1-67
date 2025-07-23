import React from 'react';
import { Camera, Image, Images } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface PhotoSelectionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onSelectFromGallery: () => void;
  onSelectMultiple: () => void;
  isLoading: boolean;
}

export const PhotoSelectionSheet: React.FC<PhotoSelectionSheetProps> = ({
  isOpen,
  onClose,
  onTakePhoto,
  onSelectFromGallery,
  onSelectMultiple,
  isLoading
}) => {
  const handleTakePhoto = () => {
    onTakePhoto();
    onClose();
  };

  const handleSelectFromGallery = () => {
    onSelectFromGallery();
    onClose();
  };

  const handleSelectMultiple = () => {
    onSelectMultiple();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="bg-mobile-surface border-mobile-border">
        <SheetHeader>
          <SheetTitle className="text-center">Add Photo</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-4 py-4">
          <Button
            onClick={handleTakePhoto}
            disabled={isLoading}
            className="w-full h-14 bg-mobile-surface border border-mobile-border hover:bg-accent justify-start gap-4 text-left"
            variant="ghost"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Camera className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Scan Product</p>
              <p className="text-sm text-muted-foreground">With Live Camera</p>
            </div>
          </Button>

          <Button
            onClick={handleSelectFromGallery}
            disabled={isLoading}
            className="w-full h-14 bg-mobile-surface border border-mobile-border hover:bg-accent justify-start gap-4 text-left"
            variant="ghost"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Image className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Choose from Gallery</p>
              <p className="text-sm text-muted-foreground">Select existing photos</p>
            </div>
          </Button>

          <Button
            onClick={handleSelectMultiple}
            disabled={isLoading}
            className="w-full h-14 bg-mobile-surface border border-mobile-border hover:bg-accent justify-start gap-4 text-left"
            variant="ghost"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Images className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Select Multiple Photos</p>
              <p className="text-sm text-muted-foreground">Choose up to 10 images at once</p>
            </div>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};