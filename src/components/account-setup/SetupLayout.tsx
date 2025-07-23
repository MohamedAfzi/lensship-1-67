import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ProgressIndicator } from './ProgressIndicator';
import BackButton from '@/components/navigation/BackButton';

interface SetupLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  showBackButton?: boolean;
  onBack?: () => void;
}

export const SetupLayout = ({ 
  title, 
  subtitle, 
  children, 
  currentStep, 
  totalSteps, 
  showBackButton = true,
  onBack 
}: SetupLayoutProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-mobile-border bg-mobile-header">
        {showBackButton ? (
          <BackButton onBack={onBack} showOnHome={true} />
        ) : (
          <div className="w-10" />
        )}
        <h1 className="text-lg font-semibold text-mobile-text-primary">{title}</h1>
        <div className="w-10" />
      </div>

      {/* Progress Indicator */}
      <div className="px-4 py-3 bg-mobile-surface border-b border-mobile-border">
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-6 py-6">
        <div className="w-full max-w-md mx-auto">
          {subtitle && (
            <p className="text-center text-mobile-text-secondary mb-6 text-sm">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};