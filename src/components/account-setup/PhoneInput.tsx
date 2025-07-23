import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface CountryCode {
  code: string;
  name: string;
  flag: string;
}

const countryCodes: CountryCode[] = [
  { code: '+1', name: 'United States', flag: '🇺🇸' },
  { code: '+1', name: 'Canada', flag: '🇨🇦' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+86', name: 'China', flag: '🇨🇳' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: '+52', name: 'Mexico', flag: '🇲🇽' },
];

interface PhoneInputProps {
  countryCode: string;
  phoneNumber: string;
  onCountryCodeChange: (code: string) => void;
  onPhoneNumberChange: (number: string) => void;
  error?: string;
}

export const PhoneInput = ({
  countryCode,
  phoneNumber,
  onCountryCodeChange,
  onPhoneNumberChange,
  error
}: PhoneInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedCountry = countryCodes.find(c => c.code === countryCode) || countryCodes[0];

  const handleCountrySelect = (code: string) => {
    onCountryCodeChange(code);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 px-3 bg-mobile-surface border-mobile-border text-mobile-text-primary"
            >
              <span className="text-lg">{selectedCountry.flag}</span>
              <span className="text-sm">{selectedCountry.code}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="bg-mobile-surface border-mobile-border">
            <SheetHeader>
              <SheetTitle className="text-mobile-text-primary">Choose Country</SheetTitle>
            </SheetHeader>
            <div className="mt-4 max-h-80 overflow-y-auto space-y-2">
              {countryCodes.map((country, index) => (
                <Button
                  key={`${country.code}-${index}`}
                  variant="ghost"
                  onClick={() => handleCountrySelect(country.code)}
                  className="w-full justify-start text-mobile-text-primary hover:bg-mobile-header"
                >
                  <span className="text-lg mr-3">{country.flag}</span>
                  <span className="flex-1 text-left">{country.name}</span>
                  <span className="text-mobile-text-secondary">{country.code}</span>
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <Input
          type="tel"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(e) => onPhoneNumberChange(e.target.value)}
          className="flex-1 bg-mobile-surface border-mobile-border text-mobile-text-primary"
        />
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};