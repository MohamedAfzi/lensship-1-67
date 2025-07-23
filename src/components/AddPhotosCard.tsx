import React from 'react';
import { Camera, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Photo } from '@/hooks/usePhotoManager';

interface AddPhotosCardProps {
  photos: Photo[];
  onAddPhotos: () => void;
  onRemovePhoto: (photoId: string) => void;
  onSetMainPhoto: (photoId: string) => void;
  onMultiSelect: () => void;
  isLoading: boolean;
}

export const AddPhotosCard: React.FC<AddPhotosCardProps> = ({
  photos,
  onAddPhotos,
  onRemovePhoto,
  onSetMainPhoto,
  onMultiSelect,
  isLoading
}) => {
  return (
    <Card className="border-dashed border-2 border-mobile-border bg-mobile-surface">
      {photos.length === 0 ? (
        <div 
          className="p-8 text-center cursor-pointer hover:bg-accent/50 transition-colors"
          onClick={onAddPhotos}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <Camera className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">Add photos</p>
              <p className="text-sm text-muted-foreground mt-1">
                Photos 0/10 • Choose your listing's main photo first.
              </p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onMultiSelect();
                }}
                className="text-sm text-primary mt-1 hover:underline focus:outline-none"
              >
                How to take a great listing photo
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="mb-4">
            <p className="font-medium">Photos {photos.length}/10</p>
            <p className="text-sm text-muted-foreground">
              {photos.find(p => p.isMain) ? 'Main photo selected' : 'Choose your main photo'}
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <div 
                  className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    photo.isMain 
                      ? 'border-primary ring-2 ring-primary/20' 
                      : 'border-transparent hover:border-accent'
                  }`}
                  onClick={() => onSetMainPhoto(photo.id)}
                >
                  <img 
                    src={photo.webPath} 
                    alt="Product photo" 
                    className="w-full h-full object-cover"
                  />
                  {photo.isMain && (
                    <div className="absolute top-1 left-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded">
                      Main
                    </div>
                  )}
                </div>
                
                <Button
                  onClick={() => onRemovePhoto(photo.id)}
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};