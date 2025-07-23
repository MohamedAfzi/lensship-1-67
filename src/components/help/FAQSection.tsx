import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/glass';
import GlassAccordion from '@/components/landing/GlassAccordion';
import { Search, Filter, X } from 'lucide-react';
import { helpFAQs } from '@/data/helpData';
import { FAQItem } from '@/types/help';

const categories = [
  { value: 'all', label: 'All Questions', count: helpFAQs.length },
  { value: 'getting-started', label: 'Getting Started', count: helpFAQs.filter(f => f.category === 'getting-started').length },
  { value: 'account', label: 'Account', count: helpFAQs.filter(f => f.category === 'account').length },
  { value: 'payments', label: 'Payments', count: helpFAQs.filter(f => f.category === 'payments').length },
  { value: 'technical', label: 'Technical', count: helpFAQs.filter(f => f.category === 'technical').length },
  { value: 'features', label: 'Features', count: helpFAQs.filter(f => f.category === 'features').length },
];

const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFaqs = helpFAQs.filter(faq => {
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const priorityFaqs = filteredFaqs.filter(faq => faq.priority === 'high');
  const otherFaqs = filteredFaqs.filter(faq => faq.priority !== 'high');

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground">
          Find quick answers to common questions about LensShip
        </p>
      </div>

      {/* Search and Filters */}
      <GlassCard className="p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card/50 border-border/50 focus:border-neon-blue"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedCategory === category.value 
                    ? 'bg-neon-blue text-background border-neon-blue' 
                    : 'border-border/50 hover:border-neon-blue/50 hover:bg-neon-blue/10'
                }`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label} ({category.count})
              </Badge>
            ))}
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedCategory !== 'all') && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span>
                  Showing {filteredFaqs.length} of {helpFAQs.length} questions
                  {searchTerm && ` matching "${searchTerm}"`}
                  {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-neon-blue hover:bg-neon-blue/10"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Priority FAQs */}
      {priorityFaqs.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-neon-blue text-background">
              Popular Questions
            </Badge>
            <span className="text-sm text-muted-foreground">
              Most frequently asked questions
            </span>
          </div>
          <GlassAccordion
            items={priorityFaqs}
            searchTerm={searchTerm}
            className="space-y-3"
          />
        </div>
      )}

      {/* Other FAQs */}
      {otherFaqs.length > 0 && (
        <div>
          {priorityFaqs.length > 0 && (
            <div className="flex items-center gap-2 mb-4 mt-8">
              <Badge variant="outline" className="border-border/50">
                All Questions
              </Badge>
            </div>
          )}
          <GlassAccordion
            items={otherFaqs}
            searchTerm={searchTerm}
            className="space-y-3"
          />
        </div>
      )}

      {/* No Results */}
      {filteredFaqs.length === 0 && (
        <GlassCard className="p-8 text-center">
          <div className="max-w-md mx-auto">
            <Search className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No questions found
            </h3>
            <p className="text-muted-foreground mb-4">
              We couldn't find any questions matching your search. Try adjusting your filters or search terms.
            </p>
            <Button
              onClick={clearFilters}
              className="bg-neon-blue hover:bg-neon-blue/90 text-background"
            >
              Clear filters
            </Button>
          </div>
        </GlassCard>
      )}

      {/* Still Need Help */}
      <GlassCard className="p-6">
        <div className="text-center">
          <h3 className="font-semibold text-foreground mb-2">
            Still need help?
          </h3>
          <p className="text-muted-foreground mb-4">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10"
              onClick={() => document.getElementById('contact-tab')?.click()}
            >
              Contact Support
            </Button>
            <Button
              className="bg-neon-blue hover:bg-neon-blue/90 text-background"
              onClick={() => document.getElementById('ticket-tab')?.click()}
            >
              Submit Ticket
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default FAQSection;
