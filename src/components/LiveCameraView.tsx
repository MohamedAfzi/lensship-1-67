import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowLeft, Zap, ZapOff, RotateCcw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraPermissionState } from '@capacitor/camera';

interface LiveCameraViewProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (blob: Blob) => void;
  isLoading: boolean;
}


export const LiveCameraView: React.FC<LiveCameraViewProps> = ({
  isOpen,
  onClose,
  onCapture,
  isLoading,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [hasFlash, setHasFlash] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [isCapturing, setIsCapturing] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<CameraPermissionState>('prompt');
  const [isInitializing, setIsInitializing] = useState(false);
  
  const { toast } = useToast();
  

  const checkCameraPermissions = useCallback(async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        const status = await Camera.checkPermissions();
        setPermissionStatus(status.camera);
        return status.camera === 'granted';
      } catch (error) {
        console.error('Error checking camera permissions:', error);
        return false;
      }
    } else {
      // For web, check if permissions were previously denied
      try {
        const permissionStatus = await navigator.permissions.query({ name: 'camera' as PermissionName });
        if (permissionStatus.state === 'denied') {
          setPermissionStatus('denied');
          return false;
        }
        return true;
      } catch (error) {
        // Fallback for browsers that don't support permissions API
        return true;
      }
    }
  }, []);

  const requestCameraPermissions = useCallback(async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        const status = await Camera.requestPermissions();
        setPermissionStatus(status.camera);
        return status.camera === 'granted';
      } catch (error) {
        console.error('Error requesting camera permissions:', error);
        toast({
          title: "Permission Error",
          description: "Unable to request camera permissions. Please enable camera access in your device settings.",
          variant: "destructive"
        });
        return false;
      }
    }
    return true;
  }, [toast]);

  const startCamera = useCallback(async () => {
    try {
      setIsInitializing(true);
      
      // Check and request permissions first
      const hasPermission = await checkCameraPermissions();
      if (!hasPermission) {
        const granted = await requestCameraPermissions();
        if (!granted) {
          throw new Error('Camera permission denied');
        }
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Check for flash capability
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      setHasFlash('torch' in capabilities);
      
    } catch (error: any) {
      console.error('Error accessing camera:', error);
      
      let errorMessage = "Unable to access camera.";
      let errorTitle = "Camera Error";
      
      if (error.name === 'NotAllowedError') {
        errorTitle = "Permission Denied";
        errorMessage = "Camera access was denied. Please enable camera permissions in your browser or device settings.";
      } else if (error.name === 'NotFoundError') {
        errorTitle = "Camera Not Found";
        errorMessage = "No camera found on this device.";
      } else if (error.name === 'NotReadableError') {
        errorTitle = "Camera Busy";
        errorMessage = "Camera is already in use by another application.";
      } else if (error.message === 'Camera permission denied') {
        errorTitle = "Permission Required";
        errorMessage = "Camera permission is required to scan products. Please enable it in your device settings.";
      }
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsInitializing(false);
    }
  }, [facingMode, toast, checkCameraPermissions, requestCameraPermissions]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  const toggleFlash = useCallback(async () => {
    if (!streamRef.current) return;
    
    try {
      const track = streamRef.current.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      
      if ('torch' in capabilities) {
        await track.applyConstraints({
          advanced: [{ torch: !flashEnabled } as any]
        });
        setFlashEnabled(!flashEnabled);
      }
    } catch (error) {
      console.error('Error toggling flash:', error);
    }
  }, [flashEnabled]);

  const switchCamera = useCallback(() => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  }, []);

  const capturePhoto = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || isCapturing) return;
    
    setIsCapturing(true);
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) {
      setIsCapturing(false);
      return;
    }
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw current video frame to canvas
    context.drawImage(video, 0, 0);
    
    // Create blob from canvas
    canvas.toBlob(async (blob) => {
      if (blob) {
        onCapture(blob);
      }
      setIsCapturing(false);
    }, 'image/jpeg', 0.8);
  }, [isCapturing, onCapture]);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    
    return () => stopCamera();
  }, [isOpen, startCamera, stopCamera]);

  useEffect(() => {
    if (isOpen) {
      stopCamera();
      startCamera();
    }
  }, [facingMode, isOpen, startCamera, stopCamera]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Loading State */}
      {isInitializing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <p className="text-white">Initializing camera...</p>
          </div>
        </div>
      )}

      {/* Permission Denied State */}
      {(permissionStatus === 'denied' || permissionStatus === 'prompt-with-rationale') && !isInitializing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
          <div className="flex flex-col items-center gap-4 max-w-md mx-4 text-center">
            <AlertCircle className="w-12 h-12 text-red-400" />
            <h3 className="text-white text-lg font-semibold">Camera Access Blocked</h3>
            <p className="text-white/80 text-sm">
              Camera permissions were previously denied. To use the camera, you need to manually reset permissions in your browser.
            </p>
            <div className="bg-black/50 rounded-lg p-4 text-left text-sm text-white/70 space-y-2">
              <p className="font-medium text-white">How to reset permissions:</p>
              <p>1. Click the lock icon 🔒 in your browser's address bar</p>
              <p>2. Set Camera to "Allow"</p>
              <p>3. Refresh this page</p>
              <p className="text-xs text-white/50 mt-2">
                Or clear your browser data for this site in Settings → Privacy → Site Settings
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => window.location.reload()}
                className="bg-white text-black hover:bg-white/90"
              >
                Refresh Page
              </Button>
              <Button 
                onClick={requestCameraPermissions}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Video Stream */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />
      
      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Flash Overlay */}
      {isCapturing && (
        <div className="absolute inset-0 bg-white animate-pulse" 
             style={{ animationDuration: '0.1s', animationIterationCount: '1' }} />
      )}
      
      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="bg-black/50 text-white hover:bg-neon-blue/90 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex gap-2">
          {hasFlash && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFlash}
              className={`rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${
                flashEnabled 
                  ? 'bg-neon-blue/80 text-white hover:bg-neon-blue shadow-[0_0_20px_hsl(var(--neon-blue)/0.4)]' 
                  : 'bg-black/50 text-white hover:bg-neon-blue/90'
              }`}
            >
              {flashEnabled ? <Zap className="h-5 w-5" /> : <ZapOff className="h-5 w-5" />}
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={switchCamera}
            className="bg-black/50 text-white hover:bg-neon-blue/90 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Capture Button */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <Button
          onClick={capturePhoto}
          disabled={isCapturing || isLoading}
          className="w-20 h-20 rounded-full bg-white hover:bg-white/90 border-4 border-white/50 shadow-lg transform transition-all duration-150 hover:scale-105 active:scale-95"
          style={{
            background: isCapturing ? 'radial-gradient(circle, #10b981, #059669)' : undefined,
            boxShadow: isCapturing ? '0 0 30px rgba(16, 185, 129, 0.6)' : undefined
          }}
        >
          <div className="w-full h-full rounded-full bg-white border-2 border-gray-300" />
        </Button>
      </div>
    </div>
  );
};