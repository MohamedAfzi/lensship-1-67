import { useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePhotoManager } from '@/hooks/usePhotoManager';
import { useToast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  type: 'profile' | 'logo' | 'banner';
  className?: string;
}

export const ImageUploader = ({ value, onChange, onRemove, type, className = '' }: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { takePhoto, selectFromGallery } = usePhotoManager();
  const { toast } = useToast();

  const handleTakePhoto = async () => {
    try {
      setIsUploading(true);
      const photo = await takePhoto();
      if (photo?.webPath) {
        onChange(photo.webPath);
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to capture photo. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSelectFromGallery = async () => {
    try {
      setIsUploading(true);
      const photo = await selectFromGallery();
      if (photo?.webPath) {
        onChange(photo.webPath);
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to select photo. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    }
  };

  const getPlaceholderText = () => {
    switch (type) {
      case 'profile':
        return 'Add Profile Photo';
      case 'logo':
        return 'Add Store Logo';
      case 'banner':
        return 'Add Store Banner';
      default:
        return 'Add Photo';
    }
  };

  const getAspectRatio = () => {
    switch (type) {
      case 'profile':
      case 'logo':
        return 'aspect-square';
      case 'banner':
        return 'aspect-[3/1]';
      default:
        return 'aspect-square';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {value ? (
        <div className="relative">
          <div className={`w-full ${getAspectRatio()} bg-mobile-surface rounded-lg overflow-hidden border border-mobile-border`}>
            <img 
              src={value} 
              alt={`${type} preview`}
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className={`w-full ${getAspectRatio()} border-2 border-dashed border-mobile-border rounded-lg flex flex-col items-center justify-center bg-mobile-surface/50`}>
          <div className="text-center space-y-4">
            <div className="text-mobile-text-secondary">
              <Upload className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">{getPlaceholderText()}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleTakePhoto}
                disabled={isUploading}
                className="text-mobile-text-primary border-mobile-border"
              >
                <Camera className="h-4 w-4 mr-2" />
                Camera
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectFromGallery}
                disabled={isUploading}
                className="text-mobile-text-primary border-mobile-border"
              >
                <Upload className="h-4 w-4 mr-2" />
                Gallery
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};