import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Truck, Zap, User, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SelectableCard } from '@/components/ui/selectable-card';
import { ToggleButtonGroup } from '@/components/ui/toggle-button-group';
import { InteractiveAlert } from '@/components/ui/interactive-alert';
import { useDeliveryAgent } from '@/hooks/useDeliveryAgent';

interface DeliveryExecutionOptionsProps {
  value: 'personal' | 'dropgo' | '';
  onChange: (value: 'personal' | 'dropgo') => void;
  onMethodChange: (method: 'manual' | 'qr') => void;
  selectedMethod?: 'manual' | 'qr';
}

export function DeliveryExecutionOptions({ 
  value, 
  onChange, 
  onMethodChange, 
  selectedMethod 
}: DeliveryExecutionOptionsProps) {
  const navigate = useNavigate();
  const { isComplete } = useDeliveryAgent();
  const [showProfileWarning, setShowProfileWarning] = useState(false);

  const handlePersonalAgentSelect = () => {
    if (!isComplete) {
      setShowProfileWarning(true);
      return;
    }
    onChange('personal');
    setShowProfileWarning(false);
  };

  const handleDropGoSelect = () => {
    onChange('dropgo');
    setShowProfileWarning(false);
    // Clear method when selecting DropGo as it handles this automatically
    onMethodChange('qr');
  };

  const handleGoToSettings = () => {
    navigate('/settings/delivery-agent');
  };

  const methodOptions = [
    {
      value: 'manual',
      label: 'Manual Pickup and Drop-off',
      description: 'Manual confirmation requires no extra steps but may delay delivery',
      icon: <Settings className="h-4 w-4" />
    },
    {
      value: 'qr',
      label: 'QR Scan at Pickup and Drop-off',
      description: 'QR scanning ensures secure, verifiable delivery process',
      icon: <Zap className="h-4 w-4" />
    }
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Truck className="h-5 w-5 text-neon-blue" />
          🛠️ Delivery Execution Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {/* Personal Delivery Agent Option */}
          <SelectableCard
            id="personal-agent"
            value="personal"
            selectedValue={value}
            onSelect={handlePersonalAgentSelect}
            title="1. Use My Own Delivery Agent"
            description="Use your own delivery agent for pickup and drop-off"
            icon={<User className="h-5 w-5" />}
            className="animate-fade-in"
          >
            {showProfileWarning && (
              <InteractiveAlert
                title="Delivery Agent Profile Incomplete"
                description="Your delivery agent profile is incomplete. Please complete your settings first."
                icon={<AlertTriangle className="h-4 w-4" />}
                variant="warning"
                actionButton={{
                  label: "Complete Setup",
                  onClick: handleGoToSettings,
                  variant: "outline"
                }}
                className="mt-3"
              />
            )}

            {/* Method Selection - Only show if personal agent selected and profile complete */}
            {value === 'personal' && isComplete && (
              <div className="space-y-3">
                <h4 className="text-foreground font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Unified Pickup & Drop-off Method
                </h4>
                <ToggleButtonGroup
                  value={selectedMethod}
                  onValueChange={(method) => onMethodChange(method as 'manual' | 'qr')}
                  options={methodOptions}
                  size="sm"
                />

                {/* Method Info Messages */}
                {selectedMethod === 'manual' && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-xs text-green-200">
                      🟢 Manual confirmation requires no extra steps or charges, but may delay the delivery process.
                    </p>
                  </div>
                )}

                {selectedMethod === 'qr' && (
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                    <p className="text-xs text-orange-200">
                      🔶 QR scanning ensures a secure, verifiable delivery process. Both pickup and drop-off scans are required.
                    </p>
                  </div>
                )}
              </div>
            )}
          </SelectableCard>

          {/* DropGo Service Option */}
          <SelectableCard
            id="dropgo-service"
            value="dropgo"
            selectedValue={value}
            onSelect={handleDropGoSelect}
            title="2. Use DropGo Delivery Service"
            description="Professional delivery service with automatic QR-based tracking"
            icon={<Truck className="h-5 w-5" />}
            actionButton={{
              label: "Use DropGo Service",
              onClick: (e) => {
                e.stopPropagation();
                handleDropGoSelect();
              },
              variant: "default",
              className: "bg-neon-yellow text-black hover:bg-neon-yellow/80"
            }}
            className="animate-fade-in"
          >
            {value === 'dropgo' && (
              <div className="bg-neon-yellow/10 border border-neon-yellow/30 rounded-lg p-3">
                <p className="text-xs text-neon-yellow">
                  🟡 DropGo service uses an advanced QR-based system for both pickup and drop-off processes. No additional delivery method settings are needed.
                </p>
              </div>
            )}
          </SelectableCard>
        </div>

        <div className="bg-muted/20 border border-border/30 rounded-lg p-3">
          <p className="text-xs text-muted-foreground">
            <strong>❗Important Rule:</strong> Only one method can be selected — mixed methods are not allowed.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}