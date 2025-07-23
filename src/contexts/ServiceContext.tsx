
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ServiceType = 'lensship' | 'flowship' | 'dropgo';

export interface ServiceBrand {
  name: string;
  displayName: string;
  primaryColor: string;
  cssVar: string;
  route: string;
}

export const serviceBrands: Record<ServiceType, ServiceBrand> = {
  lensship: {
    name: 'lensship',
    displayName: 'LensShip',
    primaryColor: 'hsl(var(--neon-blue))',
    cssVar: 'neon-blue',
    route: '/landing'
  },
  flowship: {
    name: 'flowship',
    displayName: 'FlowShip',
    primaryColor: 'hsl(var(--neon-green))',
    cssVar: 'neon-green',
    route: '/flowship-landing'
  },
  dropgo: {
    name: 'dropgo',
    displayName: 'DropGo',
    primaryColor: 'hsl(var(--neon-yellow))',
    cssVar: 'neon-yellow',
    route: '/dropgo'
  }
};

interface ServiceContextType {
  currentService: ServiceType;
  setCurrentService: (service: ServiceType) => void;
  serviceBrand: ServiceBrand;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

interface ServiceProviderProps {
  children: ReactNode;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ children }) => {
  const [currentService, setCurrentServiceState] = useState<ServiceType>('lensship');

  const setCurrentService = (service: ServiceType) => {
    setCurrentServiceState(service);
    // Store in localStorage for persistence
    localStorage.setItem('currentService', service);
  };

  useEffect(() => {
    // Initialize from localStorage or URL
    const stored = localStorage.getItem('currentService') as ServiceType;
    const path = window.location.pathname;
    
    let detectedService: ServiceType = 'lensship';
    
    if (path.includes('flowship')) {
      detectedService = 'flowship';
    } else if (path.includes('dropgo')) {
      detectedService = 'dropgo';
    } else if (path === '/landing' || path === '/') {
      detectedService = 'lensship';
    }
    
    // Use stored service if no service detected from URL
    if (stored && !path.includes('flowship') && !path.includes('dropgo') && path !== '/landing') {
      detectedService = stored;
    }
    
    setCurrentServiceState(detectedService);
  }, []);

  const serviceBrand = serviceBrands[currentService];

  return (
    <ServiceContext.Provider value={{ currentService, setCurrentService, serviceBrand }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
};
