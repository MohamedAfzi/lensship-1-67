import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PageNotFoundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PageNotFoundModal = ({ isOpen, onClose }: PageNotFoundModalProps) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    onClose();
    navigate('/');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Oops! Page not found
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            This feature is coming soon. We're working hard to bring it to you!
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-4">
          <Button
            onClick={handleGoHome}
            className="bg-neon-blue hover:bg-neon-blue/90 text-white"
          >
            Return to Home
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PageNotFoundModal;