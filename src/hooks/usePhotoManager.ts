import { useState, useCallback } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useToast } from '@/hooks/use-toast';

export interface Photo {
  id: string;
  uri: string;
  webPath?: string;
  isMain: boolean;
}

export const usePhotoManager = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addPhoto = useCallback((photo: Photo) => {
    setPhotos(prev => {
      if (prev.length >= 10) {
        toast({
          title: "Maximum photos reached",
          description: "You can only add up to 10 photos per listing.",
          variant: "destructive"
        });
        return prev;
      }
      
      const newPhotos = [...prev, photo];
      // If this is the first photo, make it the main photo
      if (newPhotos.length === 1) {
        newPhotos[0].isMain = true;
      }
      return newPhotos;
    });
  }, [toast]);

  const removePhoto = useCallback((photoId: string) => {
    setPhotos(prev => {
      const filtered = prev.filter(p => p.id !== photoId);
      // If we removed the main photo, make the first remaining photo the main one
      if (filtered.length > 0 && !filtered.some(p => p.isMain)) {
        filtered[0].isMain = true;
      }
      return filtered;
    });
  }, []);

  const setMainPhoto = useCallback((photoId: string) => {
    setPhotos(prev => prev.map(p => ({
      ...p,
      isMain: p.id === photoId
    })));
  }, []);

  const takePhoto = useCallback(async (blob?: Blob) => {
    try {
      setIsLoading(true);
      
      if (blob) {
        // Handle blob from WebRTC camera
        const url = URL.createObjectURL(blob);
        const newPhoto: Photo = {
          id: Date.now().toString(),
          uri: url,
          webPath: url,
          isMain: photos.length === 0
        };
        addPhoto(newPhoto);
        return newPhoto;
      } else {
        // Fallback to Capacitor Camera for gallery selection
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera
        });

        if (image.webPath) {
          const newPhoto: Photo = {
            id: Date.now().toString(),
            uri: image.webPath,
            webPath: image.webPath,
            isMain: photos.length === 0
          };
          addPhoto(newPhoto);
          return newPhoto;
        }
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      toast({
        title: "Camera error",
        description: "Failed to take photo. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [photos.length, addPhoto, toast]);

  const selectFromGallery = useCallback(async () => {
    try {
      setIsLoading(true);
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos
      });

      if (image.webPath) {
        const newPhoto: Photo = {
          id: Date.now().toString(),
          uri: image.webPath,
          webPath: image.webPath,
          isMain: photos.length === 0
        };
        addPhoto(newPhoto);
        return newPhoto;
      }
    } catch (error) {
      console.error('Error selecting photo:', error);
      toast({
        title: "Gallery error",
        description: "Failed to select photo. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [photos.length, addPhoto, toast]);

  const selectMultipleFromGallery = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Check how many more photos we can add
      const remainingSlots = 10 - photos.length;
      if (remainingSlots <= 0) {
        toast({
          title: "Maximum photos reached",
          description: "You can only add up to 10 photos per listing.",
          variant: "destructive"
        });
        return;
      }

      // For web, we'll use a file input to simulate multi-selection
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      input.accept = 'image/*';
      
      return new Promise((resolve, reject) => {
        input.onchange = (e) => {
          const files = Array.from((e.target as HTMLInputElement).files || []);
          const imageFiles = files.filter(file => file.type.startsWith('image/'));
          
          if (imageFiles.length === 0) {
            toast({
              title: "No images selected",
              description: "Please select at least one image.",
              variant: "destructive"
            });
            resolve([]);
            return;
          }

          // Limit to remaining slots
          const filesToProcess = imageFiles.slice(0, remainingSlots);
          
          if (imageFiles.length > remainingSlots) {
            toast({
              title: "Too many images",
              description: `Only ${remainingSlots} more photos can be added. Selected first ${filesToProcess.length}.`,
              variant: "destructive"
            });
          }

          // Process each file
          const newPhotos: Photo[] = [];
          let processedCount = 0;

          filesToProcess.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const result = event.target?.result as string;
              if (result) {
                const newPhoto: Photo = {
                  id: `${Date.now()}-${index}`,
                  uri: result,
                  webPath: result,
                  isMain: photos.length === 0 && index === 0
                };
                newPhotos.push(newPhoto);
                addPhoto(newPhoto);
              }
              
              processedCount++;
              if (processedCount === filesToProcess.length) {
                toast({
                  title: "Images added",
                  description: `Successfully added ${newPhotos.length} photo(s).`,
                });
                resolve(newPhotos);
              }
            };
            reader.onerror = () => {
              processedCount++;
              if (processedCount === filesToProcess.length) {
                resolve(newPhotos);
              }
            };
            reader.readAsDataURL(file);
          });
        };
        
        input.oncancel = () => resolve([]);
        input.click();
      });
    } catch (error) {
      console.error('Error selecting multiple photos:', error);
      toast({
        title: "Gallery error",
        description: "Failed to select photos. Please try again.",
        variant: "destructive"
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [photos.length, addPhoto, toast]);

  return {
    photos,
    isLoading,
    addPhoto,
    removePhoto,
    setMainPhoto,
    takePhoto,
    selectFromGallery,
    selectMultipleFromGallery
  };
};