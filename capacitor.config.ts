import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b8dde4908b99439191232203ccbbf946',
  appName: 'snap-detail-mobile-app',
  webDir: 'dist',
  server: {
    url: 'https://b8dde490-8b99-4391-9123-2203ccbbf946.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera']
    }
  },
  ios: {
    infoPlist: {
      NSCameraUsageDescription: 'This app uses the camera to scan products and take listing photos.'
    }
  },
  android: {
    permissions: [
      'android.permission.CAMERA',
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE'
    ]
  }
};

export default config;