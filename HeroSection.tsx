import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Flower2, Leaf } from 'lucide-react';
import { heroImg } from '../data/products';
import { EditableImage } from './EditableImage';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onStartOrder: () => void;
  onReadStory: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onStartOrder,
  onReadStory,
}) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-[#FAF7F2] pt-6 pb-16 lg:py-20">
      {/* Delicate floral background watermarks */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-[#EBF2EC] rounded-full filter blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#F4EEF7] rounded-full filter blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2EC] border border-[#C5D6C8] text-[#445849] text-xs font-semibold tracking-wide uppercase">
              <Flower2 className="w-3.5 h-3.5 text-[#D99B4B]" />
              <span>Organic Postpartum Nurture & Recovery</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#27362C] leading-[1.15] tracking-tight">
              Nourishing mama in the <br className="hidden sm:inline" />
              <span className="italic font-light text-[#556B5B]">fourth trimester and beyond.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#516356] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Organic lactation cookies, healing herbal bath & sitz pouches, 
              and lovingly curated care packages—formulated by a mama, for mamas.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-order-cta"
                onClick={onStartOrder}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#556B5B] hover:bg-[#435649] text-[#FAF7F2] px-7 py-3.5 rounded-full font-medium text-base shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Order Your Postpartum Care</span>
                <ArrowRight className="w-4 h-4 text-[#F5C78E]" />
              </button>

              <button
                id="hero-menu-cta"
                onClick={onExploreMenu}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F3ECE0] hover:bg-[#E8DFCFA] text-[#344438] border border-[#D5CABB] px-6 py-3.5 rounded-full font-medium text-base transition-colors cursor-pointer"
              >
                <span>Menu & Pricing</span>
              </button>
            </div>

            {/* Value Pillars */}
            <div className="pt-6 border-t border-[#E8DEC8]/80 grid grid-cols-2 gap-4 text-left max-w-lg">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-md bg-[#EAF1EC] text-[#556B5B] shrink-0 mt-0.5">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#27362C]">100% Organic</h4>
                  <p className="text-[11px] sm:text-xs text-[#637668]">Whole foods & botanicals</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-md bg-[#FBF0E0] text-[#D99B4B] shrink-0 mt-0.5">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#27362C]">Baked Fresh</h4>
                  <p className="text-[11px] sm:text-xs text-[#637668]">To order in small batches</p>
                </div>
              </div>
            </div>

          </div>

          {/* Hero Visual Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Featured Photo */}
              <div className="shadow-xl border-4 border-[#FFFFFF] rounded-3xl overflow-hidden">
                <EditableImage
                  storageKey="hero_main"
                  defaultSrc={heroImg}
                  alt="Milk and Marigold Organic Postpartum Care Package"
                  containerClassName="relative aspect-[4/3] sm:aspect-[16/11]"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

