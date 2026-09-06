import React from 'react';
import { TESTIMONIALS } from './products';
import { Star, Heart, Quote, CheckCircle } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-[#F4EFE6]/60 border-t border-[#E6DEC8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF2EC] text-[#445749] text-xs font-semibold uppercase tracking-wider">
            {/* Google G logo */}
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Verified 5.0 Google Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#27362C] font-normal tracking-tight">
            Loved in the Fourth Trimester
          </h2>
          <p className="text-base sm:text-lg text-[#55675A] font-light">
            Read how Milk & Marigold has supported new mothers and grateful families 
            during their sacred postpartum recovery.
          </p>
        </div>

        {/* Testimonials Grid (3-column) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-7 border border-[#E8DEC9] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4 relative"
            >
              <Quote className="w-8 h-8 text-[#E2DAC8] absolute top-6 right-6" />

              {/* Star Rating & Verified Badge */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1 text-[#F4B400]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#556B5B] font-medium">
                  <CheckCircle className="w-3 h-3 text-[#34A853]" />
                  <span>Google Verified Review</span>
                </div>
              </div>

              {/* Comment */}
              <p className="text-sm sm:text-[15px] text-[#384A3D] font-light leading-relaxed italic">
                "{t.comment}"
              </p>

              {/* Author & Product */}
              <div className="pt-4 border-t border-[#F2ECE1] flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#27362C]">{t.author}</h4>
                  <p className="text-xs text-[#6B7C6E]">{t.location}</p>
                </div>
                <span className="text-[10px] bg-[#EBF2EC] text-[#4A5D4F] font-medium px-2.5 py-1 rounded-full text-right max-w-[130px] truncate">
                  {t.product}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
