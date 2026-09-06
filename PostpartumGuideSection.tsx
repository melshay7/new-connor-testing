import React, { useState } from 'react';
import { Flower2, Cookie, Heart, Sparkles, Droplets, ThermometerSnowflake, Flame, Clock } from 'lucide-react';
import { bathImg, bathRitualImg, cookiesImg } from './products';
import { EditableImage } from './EditableImage';

export const PostpartumGuideSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bath' | 'cookies'>('bath');

  return (
    <section id="rituals" className="py-20 bg-[#FAF7F2] border-t border-[#E6DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F4EEF7] text-[#7A6487] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D99B4B]" />
            <span>Mama Care & Healing Rituals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#27362C] font-normal tracking-tight">
            How to Create Postpartum Rituals
          </h2>
          <p className="text-base sm:text-lg text-[#56685B] font-light">
            Simple, restorative guidelines for integrating organic botanical bath soaks 
            and galactagogue-rich cookies into your daily postpartum healing flow.
          </p>

          {/* Toggle Tabs */}
          <div className="flex justify-center gap-3 pt-4">
            <button
              id="tab-bath-pouches"
              onClick={() => setActiveTab('bath')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'bath'
                  ? 'bg-[#556B5B] text-white shadow-sm'
                  : 'bg-[#F1ECE2] text-[#445648] hover:bg-[#E8E0D2]'
              }`}
            >
              <Flower2 className="w-4 h-4 text-[#E6AF65]" />
              <span>Herbal Bath & Sitz Pouches</span>
            </button>

            <button
              id="tab-lactation-cookies"
              onClick={() => setActiveTab('cookies')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'cookies'
                  ? 'bg-[#556B5B] text-white shadow-sm'
                  : 'bg-[#F1ECE2] text-[#445648] hover:bg-[#E8E0D2]'
              }`}
            >
              <Cookie className="w-4 h-4 text-[#E6AF65]" />
              <span>Organic Lactation Cookies</span>
            </button>
          </div>
        </div>

        {/* Tab Content: Bath & Sitz Pouches */}
        {activeTab === 'bath' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                <EditableImage
                  storageKey="guide_bath_ritual"
                  defaultSrc={bathRitualImg}
                  alt="Organic Herbal Postpartum Sitz and Bath Pouches"
                  containerClassName="relative aspect-[4/3] w-full"
                />
              </div>
              <div className="mt-4 p-4 rounded-2xl bg-[#EBF2EC] border border-[#C9D9CC] text-xs text-[#3E5244]">
                <strong className="block font-serif text-sm font-semibold text-[#27372C] mb-1">
                  Organic Botanical Blend (5–7 Steeps per Pouch):
                </strong>
                Organic Calendula (Marigold), Lavender, Chamomile, and Comfrey Leaf.
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-5 rounded-2xl bg-white border border-[#E8DEC9] shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#EBF2EC] text-[#556B5B] flex items-center justify-center font-bold">
                  <Flame className="w-5 h-5 text-[#D99B4B]" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-[#28382D]">1. Deep Tub Soak</h4>
                <p className="text-xs text-[#55675A] leading-relaxed">
                  Hang the herbal pouch directly on your bathtub faucet and run warm bath water over it as the tub fills, or steep 1 pouch in boiling water for 15–20 mins and pour into your warm bath. Soak for 15–20 minutes. Each pouch yields 5–7 restorative steeps.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8DEC9] shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#F4EEF7] text-[#866D94] flex items-center justify-center font-bold">
                  <Droplets className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-[#28382D]">2. Warm Sitz Bowl</h4>
                <p className="text-xs text-[#55675A] leading-relaxed">
                  Place 1 pouch directly into your sitz bath basin with warm water. Let the soothing herbal calendula-lavender actives extract. Gently soak for 10–15 minutes up to 3 times daily.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8DEC9] shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#EAF2ED] text-[#556B5B] flex items-center justify-center font-bold">
                  <Droplets className="w-5 h-5 text-[#556B5B]" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-[#28382D]">3. Peri Bottle Rinse</h4>
                <p className="text-xs text-[#55675A] leading-relaxed">
                  Brew a strong concentrated infusion, allow it to cool to room temperature, and pour into your peri wash bottle. Use to rinse during and after urination for immediate cooling and anti-inflammatory relief.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8DEC9] shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#E8F1F5] text-[#48788D] flex items-center justify-center font-bold">
                  <ThermometerSnowflake className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-[#28382D]">4. Herbal Ice Padsicles</h4>
                <p className="text-xs text-[#55675A] leading-relaxed">
                  Pour cooled brewed herbal tea onto maternity pads, wrap in aluminum foil, and place in freezer. Wear inside mesh postpartum underwear for heavenly numbing and swelling reduction.
                </p>
              </div>

            </div>

          </div>
        )}

        {/* Tab Content: Lactation Cookies */}
        {activeTab === 'cookies' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                <EditableImage
                  storageKey="guide_cookies"
                  defaultSrc={cookiesImg}
                  alt="Organic Lactation Cookies"
                  containerClassName="relative aspect-[4/3] w-full"
                />
              </div>
              <div className="mt-4 p-4 rounded-2xl bg-[#FBF2E3] border border-[#EAD2B2] text-xs text-[#523F27]">
                <strong className="block font-serif text-sm font-semibold text-[#3D2C19] mb-1">
                  Galactagogue Whole Foods:
                </strong>
                Organic sprouted oats, brewer's yeast, golden flaxseed meal, organic coconut oil.
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-5 rounded-2xl bg-white border border-[#E8DEC9] shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#FBF0E0] text-[#D99B4B] flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-[#28382D]">Timing for Feedings</h4>
                <p className="text-xs text-[#55675A] leading-relaxed">
                  Enjoy 1 to 2 cookies approximately 30 to 45 minutes prior to a nursing session or pumping session to fuel your body with complex carbohydrates and B vitamins.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8DEC9] shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#EBF2EC] text-[#556B5B] flex items-center justify-center font-bold">
                  <Droplets className="w-5 h-5 text-[#556B5B]" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-[#28382D]">Pair with Hydration</h4>
                <p className="text-xs text-[#55675A] leading-relaxed">
                  Galactagogues work best when paired with ample fluids. Pair each cookie with a large 16 oz glass of water, coconut water, or warm soothing tea.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8DEC9] shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#F4EEF7] text-[#866D94] flex items-center justify-center font-bold">
                  <Flame className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-[#28382D]">Warm Oven Gooey Treat</h4>
                <p className="text-xs text-[#55675A] leading-relaxed">
                  Warm your cookie in a toaster oven for 2 minutes or microwave for 10 seconds. The dark chocolate chips melt into a comforting, bakery-fresh experience.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8DEC9] shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#E8F1F5] text-[#48788D] flex items-center justify-center font-bold">
                  <ThermometerSnowflake className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-[#28382D]">Storage & Freezing</h4>
                <p className="text-xs text-[#55675A] leading-relaxed">
                  Our cookies have zero preservatives. Keep on the counter for 5–7 days, refrigerate for up to 2 weeks, or freeze for up to 3 months. Perfect for freezing ahead of your due date!
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};

