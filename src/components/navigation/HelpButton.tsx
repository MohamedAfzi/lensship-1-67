
import { HelpCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useService } from '@/contexts/ServiceContext';
import { helpConfigs } from '@/config/helpConfig';
import { navigationConfigs } from '@/config/navigationConfig';
import { useNavigate } from 'react-router-dom';

interface HelpButtonProps {
  variant?: 'default' | 'floating' | 'minimal';
  onHelpClick?: () => void;
  className?: string;
}

const HelpButton = ({ 
  variant = 'default', 
  onHelpClick,
  className = ""
}: HelpButtonProps) => {
  const { currentService } = useService();
  const navigate = useNavigate();
  
  const config = navigationConfigs[currentService];
  const helpConfig = helpConfigs[config?.helpContext];

  const handleHelpClick = () => {
    if (onHelpClick) {
      onHelpClick();
    } else {
      // Navigate to help page with service context
      navigate(`/help?service=${currentService}`);
    }
  };

  if (variant === 'floating') {
    return (
      <Button
        onClick={handleHelpClick}
        className={`fixed bottom-20 right-4 z-50 rounded-full w-12 h-12 shadow-lg hover:scale-110 transition-all duration-300 ${className}`}
        size="sm"
      >
        <HelpCircle className="w-5 h-5" />
      </Button>
    );
  }

  if (variant === 'minimal') {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={handleHelpClick}
        className={`text-foreground/80 hover:text-foreground transition-colors ${className}`}
      >
        <HelpCircle className="w-4 h-4 mr-2" />
        Help
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleHelpClick}
      className={`backdrop-blur-sm hover:scale-105 transition-transform focus-ring border border-border/20 ${className}`}
    >
      <MessageCircle className="w-4 h-4 mr-2" />
      {helpConfig?.title.split(' ')[0] || 'Help'}
    </Button>
  );
};

export default HelpButton;
