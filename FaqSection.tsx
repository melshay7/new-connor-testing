import React, { useState } from 'react';
import { FAQS } from './products';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, Mail } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'cookies', label: 'Lactation Cookies' },
    { id: 'bath', label: 'Herbal Bath & Sitz' },
    { id: 'ordering', label: 'Ordering & Delivery' },
    { id: 'ingredients', label: 'Organic Ingredients' },
  ];

  const filteredFaqs = activeCategory === 'all'
    ? FAQS
    : FAQS.filter((f) => f.category === activeCategory);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#FAF7F2] border-t border-[#E6DEC8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF2EC] text-[#445749] text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#D99B4B]" />
            <span>Got Questions? We’re Here</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#27362C] font-normal tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-[#55675A] font-light">
            Everything you need to know about our organic ingredients, batch baking, and delivery.
          </p>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCategory(c.id);
                  setOpenIndex(null);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === c.id
                    ? 'bg-[#556B5B] text-white shadow-xs'
                    : 'bg-[#F2ECE1] text-[#48594C] hover:bg-[#E7DFD1]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E8DEC9] overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-lg text-[#26372B] font-medium hover:text-[#556B5B] transition-colors"
                >
                  <span>{faq.question}</span>
                  <div className="w-6 h-6 rounded-full bg-[#FAF7F2] border border-[#DDD3C2] flex items-center justify-center shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#556B5B]" /> : <ChevronDown className="w-4 h-4 text-[#78887B]" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#4E6053] font-light leading-relaxed border-t border-[#F2EBE0] pt-3 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact direct link */}
        <div className="mt-12 text-center p-6 bg-[#EBF2EC] rounded-2xl border border-[#C6D8CA] space-y-2">
          <p className="text-xs sm:text-sm text-[#384A3C]">
            Have a custom dietary allergy, special request, or bulk order question?
          </p>
          <a
            href="mailto:milkandmarigoldorganic@gmail.com"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#556B5B] hover:text-[#28382E] transition-colors"
          >
            <Mail className="w-4 h-4 text-[#D99B4B]" />
            <span>milkandmarigoldorganic@gmail.com</span>
          </a>
        </div>

      </div>
    </section>
  );
};
