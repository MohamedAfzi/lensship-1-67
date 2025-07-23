import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  onBack?: () => void;
  fallbackRoute?: string;
  showOnHome?: boolean;
  className?: string;
}

const BackButton = ({ 
  onBack, 
  fallbackRoute = '/', 
  showOnHome = false,
  className = ""
}: BackButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show back button on home page unless explicitly requested
  if (location.pathname === '/' && !showOnHome) {
    return null;
  }

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackRoute);
    }
  };

  return (
    <Button
      onClick={handleBack}
      variant="ghost"
      size="sm" 
      className={`rounded-full px-4 py-2 bg-card text-foreground hover:bg-neon-blue hover:text-primary-foreground transition-all duration-300 hover:scale-105 active:scale-95 focus-ring ${className}`}
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back
    </Button>
  );
};

export default BackButton;