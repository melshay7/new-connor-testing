import React from 'react';
import { Heart, Mail, Instagram, Facebook, MapPin } from 'lucide-react';
import { MarigoldLogo } from './MarigoldLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#243328] text-[#E8EFE9] pt-16 pb-12 border-t border-[#384A3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#3B4E41]">
          
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FAF4EA] border border-[#E0D3BE] flex items-center justify-center p-0.5 shadow-sm">
                <MarigoldLogo className="w-full h-full" />
              </div>
              <div>
                <span className="font-serif text-2xl tracking-tight text-[#FAF7F2] font-semibold block">
                  Milk & Marigold
                </span>
                <span className="text-[11px] uppercase tracking-widest text-[#97ACA0] block">
                  Organic Postpartum Care
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#B4C6BA] font-light leading-relaxed max-w-sm">
              Organic lactation cookies, healing herbal bath & sitz pouches, 
              and postpartum care packages curated with devotion for the sacred Fourth Trimester.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com/milk.and.marigold/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#334638] hover:bg-[#435949] text-[#E8EFE9] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61590136712750"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#334638] hover:bg-[#435949] text-[#E8EFE9] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="mailto:milkandmarigoldorganic@gmail.com"
                className="w-9 h-9 rounded-full bg-[#334638] hover:bg-[#435949] text-[#E8EFE9] flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-lg text-[#FAF7F2] font-semibold tracking-wide">
              Explore Offerings
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#ADC2B3]">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  About Our Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('offerings')}
                  className="hover:text-white transition-colors"
                >
                  Menu & Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('order')}
                  className="hover:text-white transition-colors"
                >
                  Custom Care Package Order Form
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rituals')}
                  className="hover:text-white transition-colors"
                >
                  Fourth Trimester Bath & Cookie Rituals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors"
                >
                  FAQ & Dietary Allergies
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Delivery Info (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-lg text-[#FAF7F2] font-semibold tracking-wide">
              Direct Contact & Orders
            </h4>
            <div className="space-y-2.5 text-xs text-[#ADC2B3]">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#D99B4B] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block">Email:</strong>
                  milkandmarigoldorganic@gmail.com
                </span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D99B4B] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block">Fulfillment:</strong>
                  Local porch delivery, studio pickup, and nationwide USPS Priority shipping.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#2D3E32] border border-[#3E5244] text-[11px] text-[#BACABA]">
                ✨ <strong>Custom Orders & Doula Partnerships:</strong> Contact us directly for bulk orders, postpartum meal-trains, and personalized baby shower registries.
              </div>
            </div>
          </div>

        </div>

        {/* Social Links & Copyright (Replaces old disclaimer) */}
        <div className="pt-8 space-y-4 text-xs text-[#8EA394] font-light leading-relaxed">
          <div className="flex flex-wrap items-center justify-between gap-4 py-2">
            <div className="flex items-center gap-4 text-xs text-[#ADC2B3]">
              <span className="font-medium text-[#FAF7F2]">Follow & Connect:</span>
              <a
                href="https://www.instagram.com/milk.and.marigold/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#E8EFE9] hover:text-[#D99B4B] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#E6AF65]" />
                <span>Instagram (@milk.and.marigold)</span>
              </a>
              <span className="text-[#435949]">•</span>
              <a
                href="https://www.facebook.com/profile.php?id=61590136712750"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#E8EFE9] hover:text-[#D99B4B] transition-colors"
              >
                <Facebook className="w-4 h-4 text-[#E6AF65]" />
                <span>Facebook Page</span>
              </a>
            </div>

            <div className="text-[11px] text-[#8EA394]">
              <span>Questions? Reach out to </span>
              <a href="mailto:milkandmarigoldorganic@gmail.com" className="text-[#E8EFE9] underline hover:text-[#D99B4B]">
                milkandmarigoldorganic@gmail.com
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-[#314336] text-[11px]">
            <span>© {new Date().getFullYear()} Milk & Marigold LLC. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                Handmade with <Heart className="w-3 h-3 text-[#D99B4B] fill-current" /> for mamas everywhere.
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
