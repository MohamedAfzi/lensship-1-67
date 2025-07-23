import React from 'react';
import { X, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AIAssistPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onToneSelect: (tone: 'formal' | 'friendly' | 'professional') => void;
}

export function AIAssistPopover({ isOpen, onClose, onToneSelect }: AIAssistPopoverProps) {
  if (!isOpen) return null;

  const toneOptions = [
    {
      id: 'formal' as const,
      title: 'Formal',
      description: 'Refine to a formal tone',
      icon: '📝'
    },
    {
      id: 'friendly' as const, 
      title: 'Friendly',
      description: 'Make description more casual and friendly',
      icon: '😊'
    },
    {
      id: 'professional' as const,
      title: 'Professional', 
      description: 'Apply professional marketing tone',
      icon: '💼'
    }
  ];

  const handleToneSelect = (tone: 'formal' | 'friendly' | 'professional') => {
    onToneSelect(tone);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popover */}
      <Card className="relative w-full max-w-sm mx-4 p-6 animate-scale-in bg-card border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">AI-Assist</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          Rephrase your product details
        </p>
        
        <div className="space-y-2">
          {toneOptions.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              className="w-full justify-start h-auto p-3 text-left"
              onClick={() => handleToneSelect(option.id)}
            >
              <div className="flex items-center gap-3 w-full">
                <span className="text-lg">{option.icon}</span>
                <div className="flex-1">
                  <div className="font-medium">{option.title}</div>
                  <div className="text-sm text-muted-foreground">{option.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}