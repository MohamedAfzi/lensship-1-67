
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/navigation/BackButton';
import { useService } from '@/contexts/ServiceContext';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  showBackButton?: boolean;
}

export const AuthLayout = ({ title, subtitle, children, showBackButton = true }: AuthLayoutProps) => {
  const navigate = useNavigate();
  const { serviceBrand } = useService();

  // Create CSS custom properties for the current service theme
  const serviceThemeStyle = {
    '--service-primary': serviceBrand.primaryColor,
    '--service-primary-rgb': serviceBrand.primaryColor.replace('hsl(', '').replace(')', ''),
  } as React.CSSProperties;

  return (
    <div className="min-h-screen bg-background flex flex-col" style={serviceThemeStyle}>
      {/* Header with service-aware styling */}
      <div 
        className="flex items-center justify-between p-4 border-b transition-colors duration-300"
        style={{ borderColor: `${serviceBrand.primaryColor}30` }}
      >
        {showBackButton ? (
          <BackButton showOnHome={true} />
        ) : (
          <div className="w-10" />
        )}
        <h1 
          className="text-lg font-semibold transition-colors duration-300"
          style={{ color: serviceBrand.primaryColor }}
        >
          {title}
        </h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div className="w-full max-w-sm mx-auto">
          {subtitle && (
            <p className="text-center text-mobile-text-secondary mb-8">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
