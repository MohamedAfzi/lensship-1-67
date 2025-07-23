import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import BackButton from '@/components/navigation/BackButton';

const GalleryUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== files.length) {
      toast({
        title: "Invalid files",
        description: "Please select only image files.",
        variant: "destructive",
      });
    }
    
    setSelectedImages(prev => [...prev, ...imageFiles]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedImages.length === 0) {
      toast({
        title: "No images selected",
        description: "Please select at least one image to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload and processing
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Images Processed",
        description: `${selectedImages.length} product(s) have been added to discovered products.`,
      });
      navigate('/listings');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-mobile-header border-b border-mobile-border">
        <BackButton />
        
        <h1 className="text-lg font-semibold text-foreground">Upload from Gallery</h1>
        
        <div className="w-16" /> {/* Spacer */}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Upload Area */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="h-8 w-8 text-primary" />
              </div>
              
              <h3 className="font-medium text-foreground mb-2">Select product images</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Choose images from your gallery to identify products
              </p>
              
              <label htmlFor="file-upload" className="cursor-pointer">
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Images
                  </span>
                </Button>
              </label>
              
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>

        {/* Selected Images */}
        {selectedImages.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Selected Images ({selectedImages.length})</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {selectedImages.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full aspect-square object-cover rounded-lg border border-border"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}
        {selectedImages.length > 0 && (
          <Button 
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full h-12 bg-primary hover:bg-primary/90"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                Processing Images...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Process Images ({selectedImages.length})
              </>
            )}
          </Button>
        )}

        {/* Processing Status */}
        {isUploading && (
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Analyzing images and identifying products...
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GalleryUpload;