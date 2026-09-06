import React from 'react';
import { Heart, Sparkles, Flower2, CheckCircle2, Leaf, Shield, Sun } from 'lucide-react';
import { founderImg } from '../products';
import { EditableImage } from './EditableImage';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#F4EFE6]/60 border-t border-b border-[#E6DEC8]/60 relative">
      {/* Background floral tint */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF2EC] text-[#485C4D] text-xs font-semibold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-[#D99B4B]" />
            <span>Our Heart & Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#27362C] font-normal tracking-tight">
            Holding space for the <span className="italic text-[#556B5B]">mother</span>.
          </h2>
          <p className="text-base sm:text-lg text-[#55675B] font-light leading-relaxed">
            While everyone gathers to celebrate and hold the baby, Milk & Marigold was lovingly born to hold, comfort, and nourish the mama.
          </p>
        </div>

        {/* Grid of Story & Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Founder Photo & Botanical Collage */}
          <div className="lg:col-span-5 relative">
            <div className="shadow-xl border-4 border-white rounded-3xl overflow-hidden max-w-md mx-auto">
              <EditableImage
                storageKey="about_mother"
                defaultSrc={founderImg}
                alt="Mother holding baby - Milk and Marigold"
                containerClassName="relative aspect-[4/5] w-full"
              />
            </div>
          </div>


          {/* Detailed Story Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-[#3E4F43] text-base sm:text-lg leading-relaxed">
              <p>
                The transition into postpartum—the sacred <strong className="font-semibold text-[#27362C]">Fourth Trimester</strong>—is one of the most intense, beautiful, and physically demanding periods in a woman’s life. Between around the clock feedings, fluctuating hormones, physical tissue healing, and sleepless nights, mothers give everything of themselves.
              </p>
              <p>
                At <strong className="font-semibold text-[#27362C]">Milk & Marigold</strong> we believe that the postpartum journey can be completely changed by having your village show up for you. Our goal is to make it easy for you to show up for your people (or yourself!) during the postpartum time. All of our items are organic and promote rest, recovery and nourishment.
              </p>
            </div>

            {/* Why Milk & Marigold */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/80 border border-[#E2DAD0] shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-[#556B5B]">
                  <Sun className="w-5 h-5 text-[#D99B4B]" />
                  <h3 className="font-serif text-lg font-semibold text-[#27362C]">The Marigold (Calendula)</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#5B6D60] leading-relaxed">
                  Known for centuries as the golden healer, organic calendula petals soothe tender postpartum tissue, reduce inflammation, and promote deep cellular restoration.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 border border-[#E2DAD0] shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-[#556B5B]">
                  <Sparkles className="w-5 h-5 text-[#8F7B9D]" />
                  <h3 className="font-serif text-lg font-semibold text-[#27362C]">The Milk (Galactagogues)</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#5B6D60] leading-relaxed">
                  Pure whole-food galactagogues like organic rolled oats, brewer's yeast, and golden flaxseed replenish depleted minerals and gently support healthy milk supply.
                </p>
              </div>
            </div>

            {/* Checkmark List */}
            <div className="pt-2 space-y-2.5">
              <div className="flex items-center gap-3 text-sm text-[#38493D]">
                <CheckCircle2 className="w-4 h-4 text-[#556B5B] shrink-0" />
                <span><strong className="font-semibold">Zero Preservatives or Fillers:</strong> Only pure organic whole foods and raw botanicals.</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#38493D]">
                <CheckCircle2 className="w-4 h-4 text-[#556B5B] shrink-0" />
                <span><strong className="font-semibold">Baked Fresh:</strong> Never sitting on a warehouse shelf; baked to order for peak flavor.</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#38493D]">
                <CheckCircle2 className="w-4 h-4 text-[#556B5B] shrink-0" />
                <span><strong className="font-semibold">Dietary Conscious:</strong> Dedicated Gluten-Free and Traditional organic recipes available.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
