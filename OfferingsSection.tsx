import React, { useState } from 'react';
import { Product, ProductCategory } from '../types';
import { PRODUCTS } from './products';
import { Sparkles, Plus, Check, Heart, Gift, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { EditableImage } from './EditableImage';

interface OfferingsSectionProps {
  onAddToCart: (
    product: Product,
    flavor?: string,
    dietary?: string,
    amount?: string,
    overridePrice?: number
  ) => void;
  onQuickOrderProduct: (product: Product) => void;
}

export const OfferingsSection: React.FC<OfferingsSectionProps> = ({
  onAddToCart,
  onQuickOrderProduct
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedIngredients, setExpandedIngredients] = useState<Record<string, boolean>>({});
  const [selectedFlavors, setSelectedFlavors] = useState<Record<string, string>>({});
  const [selectedDietaries, setSelectedDietaries] = useState<Record<string, string>>({});
  const [selectedAmounts, setSelectedAmounts] = useState<Record<string, string>>({});
  const [addedItemFeedback, setAddedItemFeedback] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Offerings' },
    { id: 'packages', label: 'Care Packages' },
    { id: 'cookies', label: 'Lactation Cookies' },
    { id: 'bath-pouches', label: 'Herbal Bath Pouches' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  const toggleIngredients = (id: string) => {
    setExpandedIngredients((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFlavorChange = (productId: string, flavor: string) => {
    setSelectedFlavors((prev) => ({ ...prev, [productId]: flavor }));
  };

  const handleDietaryChange = (productId: string, dietary: string) => {
    setSelectedDietaries((prev) => ({ ...prev, [productId]: dietary }));
  };

  const handleAmountChange = (productId: string, amount: string) => {
    setSelectedAmounts((prev) => ({ ...prev, [productId]: amount }));
  };

  const handleAdd = (product: Product) => {
    const flavor = selectedFlavors[product.id] || (product.flavors ? product.flavors[0] : undefined);
    const dietary = selectedDietaries[product.id] || (product.dietaryOptions ? product.dietaryOptions[0] : undefined);
    const amount = selectedAmounts[product.id] || (product.amountOptions ? product.amountOptions[0].label : undefined);
    
    let effectivePrice = product.price;
    if (product.amountOptions && amount) {
      const match = product.amountOptions.find((a) => a.label === amount);
      if (match) effectivePrice = match.price;
    }

    onAddToCart(product, flavor, dietary, amount, effectivePrice);
    
    setAddedItemFeedback(product.id);
    setTimeout(() => {
      setAddedItemFeedback(null);
    }, 1800);
  };

  return (
    <section id="offerings" className="py-20 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF2EC] text-[#445749] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D99B4B]" />
            <span>Organic Menu & Handcrafted Recovery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#27362C] font-normal tracking-tight">
            Menu & Pricing
          </h2>
          <p className="text-base sm:text-lg text-[#55675A] font-light max-w-2xl mx-auto">
            Order individually or choose our thoughtfully curated postpartum care packages. 
            All items are baked fresh and prepared with 100% organic botanicals.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#556B5B] text-[#FAF7F2] shadow-sm scale-105'
                    : 'bg-[#F2ECE1] text-[#435447] hover:bg-[#E8DFD0] hover:text-[#28362D]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isAdded = addedItemFeedback === product.id;
            const isExpanded = expandedIngredients[product.id];
            const currentFlavor = selectedFlavors[product.id] || (product.flavors ? product.flavors[0] : '');
            const currentDietary = selectedDietaries[product.id] || (product.dietaryOptions ? product.dietaryOptions[0] : '');
            const currentAmount = selectedAmounts[product.id] || (product.amountOptions ? product.amountOptions[0].label : '');
            
            let displayPrice = product.price;
            let displayUnit = product.unit;
            if (product.amountOptions && currentAmount) {
              const matchedAmount = product.amountOptions.find((a) => a.label === currentAmount);
              if (matchedAmount) {
                displayPrice = matchedAmount.price;
                displayUnit = `pack of ${matchedAmount.label}`;
              }
            }

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="bg-white rounded-3xl overflow-hidden border border-[#E8DEC9] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                {/* Product Image & Badges */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F4EFE6]">
                  <EditableImage
                    storageKey={`product_${product.id}`}
                    defaultSrc={product.image}
                    alt={product.name}
                    containerClassName="relative w-full h-full"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  >
                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-3 right-3 bg-[#FAF7F2]/95 backdrop-blur-sm border border-[#DACFBE] px-3 py-1 rounded-2xl shadow-sm text-right pointer-events-none">
                      <span className="text-lg font-serif font-bold text-[#2A3B30]">${displayPrice}</span>
                      {displayUnit ? (
                        <span className="text-[10px] text-[#6F7F73] block">{displayUnit}</span>
                      ) : null}
                    </div>
                  </EditableImage>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-[#26352B] font-medium leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5B6D60] font-light leading-relaxed">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Key Benefits */}
                  <div className="space-y-1.5 pt-1">
                    {product.benefits.slice(0, 4).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#3E4F43]">
                        <span className="text-[#D99B4B] font-bold mt-0.5">•</span>
                        <span className="leading-tight">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Amount selector if product has amountOptions (e.g. cookies) */}
                  {product.amountOptions && product.amountOptions.length > 0 && (
                    <div className="pt-2">
                      <label className="block text-[11px] font-semibold text-[#445648] uppercase tracking-wider mb-1">
                        Choose Amount:
                      </label>
                      <select
                        value={currentAmount}
                        onChange={(e) => handleAmountChange(product.id, e.target.value)}
                        className="w-full text-xs bg-[#FAF7F2] border border-[#DDD3C3] rounded-xl px-3 py-2 text-[#2D3C31] font-medium focus:outline-none focus:ring-1 focus:ring-[#556B5B]"
                      >
                        {product.amountOptions.map((opt, idx) => (
                          <option key={idx} value={opt.label}>
                            {opt.label} — ${opt.price}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Flavor selector if product has flavors */}
                  {product.flavors && product.flavors.length > 0 && (
                    <div>
                      <label className="block text-[11px] font-semibold text-[#445648] uppercase tracking-wider mb-1">
                        Choose Flavor:
                      </label>
                      <select
                        value={currentFlavor}
                        onChange={(e) => handleFlavorChange(product.id, e.target.value)}
                        className="w-full text-xs bg-[#FAF7F2] border border-[#DDD3C3] rounded-xl px-3 py-2 text-[#2D3C31] focus:outline-none focus:ring-1 focus:ring-[#556B5B]"
                      >
                        {product.flavors.map((flv, idx) => (
                          <option key={idx} value={flv}>{flv}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Dietary selector if product has dietary options */}
                  {product.dietaryOptions && product.dietaryOptions.length > 0 && (
                    <div>
                      <label className="block text-[11px] font-semibold text-[#445648] uppercase tracking-wider mb-1">
                        Dietary Preference:
                      </label>
                      <select
                        value={currentDietary}
                        onChange={(e) => handleDietaryChange(product.id, e.target.value)}
                        className="w-full text-xs bg-[#FAF7F2] border border-[#DDD3C3] rounded-xl px-3 py-2 text-[#2D3C31] focus:outline-none focus:ring-1 focus:ring-[#556B5B]"
                      >
                        {product.dietaryOptions.map((opt, idx) => (
                          <option key={idx} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Ingredients Expandable Accordion */}
                  <div className="border-t border-[#EFE8DC] pt-2">
                    <button
                      onClick={() => toggleIngredients(product.id)}
                      className="flex items-center justify-between w-full text-left text-[11px] font-medium text-[#657769] hover:text-[#2A3B30] transition-colors py-1"
                    >
                      <span>View Organic Ingredients & Details</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                    {isExpanded && (
                      <div className="mt-2 text-xs text-[#526356] bg-[#FAF7F2] p-3 rounded-xl border border-[#E9E1D2] space-y-1 animate-in fade-in duration-200">
                        <p className="font-semibold text-[#293A2F] text-[11px]">Organic Composition:</p>
                        <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                          {product.ingredients.map((ing, i) => (
                            <li key={i}>{ing}</li>
                          ))}
                        </ul>
                        {product.servingNote && (
                          <p className="text-[10px] italic text-[#728376] pt-1">
                            Note: {product.servingNote}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      id={`add-to-cart-${product.id}`}
                      onClick={() => handleAdd(product)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm ${
                        isAdded
                          ? 'bg-[#405646] text-white'
                          : 'bg-[#556B5B] hover:bg-[#435748] text-white active:scale-95'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 text-[#F3C58B]" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>

                    <button
                      id={`quick-order-${product.id}`}
                      onClick={() => onQuickOrderProduct(product)}
                      title="Direct Custom Order Builder"
                      className="px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#344639] text-xs font-semibold transition-colors"
                    >
                      Order Now
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
