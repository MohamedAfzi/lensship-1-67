import React, { useState } from 'react';
import { faqs } from '@/data/landingData';
import GlassAccordion from './GlassAccordion';
import SearchableList from './SearchableList';

const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 animate-glass-entrance">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-neon-blue">Questions</span>
          </h2>
          <p className="text-xl text-foreground/70 mb-8">
            Find answers to common questions about LensShip
          </p>
        </div>

        <SearchableList
          onSearchChange={setSearchTerm}
          placeholder="Search questions..."
          resultsCount={filteredFaqs.length}
          totalCount={faqs.length}
        />

        <GlassAccordion
          items={faqs}
          searchTerm={searchTerm}
          className="glass-stack"
        />
      </div>
    </section>
  );
};

export default FAQSection;