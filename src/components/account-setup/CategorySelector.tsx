import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { CATEGORIES, getSubcategories } from '@/lib/categories';

interface CategorySelectorProps {
  selectedCategory?: string;
  selectedSubcategory?: string;
  onCategoryChange: (category: string) => void;
  onSubcategoryChange: (subcategory: string) => void;
}

export const CategorySelector = ({
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
  onSubcategoryChange
}: CategorySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [step, setStep] = useState<'category' | 'subcategory'>('category');

  const filteredCategories = Object.entries(CATEGORIES).filter(([key, category]) =>
    category.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategorySelect = (categoryKey: string) => {
    onCategoryChange(categoryKey);
    setStep('subcategory');
  };

  const handleSubcategorySelect = (subcategoryKey: string) => {
    onSubcategoryChange(subcategoryKey);
    setIsOpen(false);
    setStep('category');
  };

  const handleBack = () => {
    setStep('category');
  };

  const getDisplayText = () => {
    if (selectedCategory && selectedSubcategory) {
      const category = CATEGORIES[selectedCategory];
      const subcategory = category?.subcategories[selectedSubcategory];
      return `${category?.label} > ${subcategory?.label}`;
    }
    return 'Select Category';
  };

  const subcategories = selectedCategory ? getSubcategories(selectedCategory) : {};

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between text-left bg-mobile-surface border-mobile-border text-mobile-text-primary"
        >
          <span className={selectedCategory ? 'text-mobile-text-primary' : 'text-mobile-text-secondary'}>
            {getDisplayText()}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="bg-mobile-surface border-mobile-border">
        <SheetHeader>
          <div className="flex items-center justify-between">
            {step === 'subcategory' && (
              <Button variant="ghost" onClick={handleBack} className="text-mobile-text-primary">
                Back
              </Button>
            )}
            <SheetTitle className="text-mobile-text-primary">
              {step === 'category' ? 'Choose Category' : 'Choose Subcategory'}
            </SheetTitle>
            <div className="w-16" />
          </div>
        </SheetHeader>
        
        <div className="mt-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-mobile-text-secondary" />
            <Input
              placeholder={step === 'category' ? 'Search categories...' : 'Search subcategories...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-mobile-surface border-mobile-border text-mobile-text-primary"
            />
          </div>

          <div className="max-h-80 overflow-y-auto space-y-2">
            {step === 'category' ? (
              filteredCategories.map(([key, category]) => (
                <Button
                  key={key}
                  variant="ghost"
                  onClick={() => handleCategorySelect(key)}
                  className="w-full justify-start text-mobile-text-primary hover:bg-mobile-header"
                >
                  {category.label}
                </Button>
              ))
            ) : (
              Object.entries(subcategories)
                .filter(([, subcategory]) =>
                  subcategory.label.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(([key, subcategory]) => (
                  <Button
                    key={key}
                    variant="ghost"
                    onClick={() => handleSubcategorySelect(key)}
                    className="w-full justify-start text-mobile-text-primary hover:bg-mobile-header"
                  >
                    {subcategory.label}
                  </Button>
                ))
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};