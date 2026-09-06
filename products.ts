import giftBoxImg from '../assets/images/madison_swann_package_25.jpg';
import cookiesImg from '../assets/images/madison_swann_cookies_33.jpg';
import bathImg from '../assets/images/madison_swann_bath_83.jpg';
import bathRitualImg from '../assets/images/madison_swann_bath_77.jpg';
import heroImg from '../assets/images/hero_postpartum_package_1788284130353.jpg';
import founderImg from '../assets/images/user_uploaded_about_mother.png';
import { Product, Testimonial, FaqItem } from '../types';

export { heroImg, cookiesImg, bathImg, bathRitualImg, giftBoxImg, founderImg };

export const PRODUCTS: Product[] = [
  {
    id: 'postpartum-nurture-box',
    name: 'The Signature Postpartum Care Package',
    category: 'packages',
    subtitle: 'Our most-loved thoughtful package to comfort, restore, and nourish mama',
    price: 60,
    unit: '',
    image: giftBoxImg,
    description:
      'The quintessential Fourth Trimester care package. Handcrafted with deep reverence for the sacred postpartum healing period. Each package includes freshly baked organic lactation cookies, soothing organic herbal bath & sitz pouches, a mama affirmation card, and a botanical lavender-marigold bouquet touch.',
    benefits: [
      'Nourishes mama with milk-boosting whole foods & galactagogues',
      'Provides soothing postpartum relief with organic botanicals',
      'Comes beautifully packaged in a gift box or bag with a custom handwritten note'
    ],
    ingredients: [
      '1 Dozen Organic Lactation Cookies (Your choice of flavor & dietary type)',
      '2 Large Organic Cotton Herbal Bath & Sitz Pouches (Calendula, Lavender, Chamomile, Comfrey)',
      'Handwritten Botanical Affirmation Gift Note',
      'Keepsake gift packaging & steeping instructions card'
    ],
    flavors: [
      'Classic Chocolate Chip & Sea Salt',
      'Lavender Sea Salt Chocolate Chip',
      'Chocolate Cherry & Sea Salt',
      'Seasonal'
    ],
    dietaryOptions: [
      '100% Organic (Traditional)',
      'Gluten-Free (+ $3.00)'
    ],
    servingNote: 'Cookies are baked fresh to order. Herbal pouches yield 5–7 restorative steeps.'
  },
  {
    id: 'organic-lactation-cookies-dozen',
    name: 'Organic Lactation Cookies',
    category: 'cookies',
    subtitle: 'Delicious, soft-baked cookies packed with proven organic galactagogues',
    price: 36,
    unit: 'box of 12 cookies',
    image: cookiesImg,
    description:
      'Soft, nutrient-dense, and deeply comforting. Our cookies are specifically formulated with wholesome organic galactagogues (rolled oats, debittered brewer’s yeast, golden flaxseed meal, and organic virgin coconut oil) to help naturally support and nourish a rich breast milk supply.',
    benefits: [
      'Natural support for breast milk supply, letdown, and nutritional richness',
      'High in iron, zinc, fiber, healthy fatty acids, and B-complex vitamins',
      'Made with organic wholesome ingredients and zero artificial preservatives',
      'Freezer-friendly — pop in the toaster oven for 2 minutes for a warm gooey treat'
    ],
    ingredients: [
      'Organic Sprouted Rolled Oats',
      'Debittered Brewer’s Yeast',
      'Golden Flaxseed Meal',
      'Organic Coconut Oil & Grass-Fed Butter',
      'Organic Pasture-Raised Eggs',
      'Pure Vanilla Extract',
      'Fair-Trade Dark Chocolate Chips or Selected Inclusions',
      'Pink Himalayan Sea Salt'
    ],
    amountOptions: [
      { label: '6 cookies', count: 6, price: 20 },
      { label: '12 cookies', count: 12, price: 36 },
      { label: '18 cookies', count: 18, price: 52 }
    ],
    flavors: [
      'Classic Chocolate Chip & Sea Salt',
      'Lavender Sea Salt Chocolate Chip',
      'Chocolate Cherry & Sea Salt',
      'Seasonal'
    ],
    dietaryOptions: [
      '100% Organic (Traditional)',
      'Gluten-Free (+ $2.50)'
    ],
    servingNote: 'Enjoy 1–2 cookies daily alongside a tall glass of water 30–45 minutes before nursing or pumping.'
  },
  {
    id: 'organic-herbal-bath-pouches',
    name: 'Organic Herbal Postpartum Bath & Sitz Pouches',
    category: 'bath-pouches',
    subtitle: 'Soothing botanical blend of calendula, lavender, chamomile, and comfrey',
    price: 18,
    unit: 'pack of 2 brew bags',
    image: bathImg,
    description:
      'Handcrafted organic herbal tea bags for your bath or sitz bowl. We blend skin-soothing organic marigold (calendula) blossoms with lavender, whole chamomile flowers, and comfrey leaf to gently relieve soreness, reduce swelling, and promote peaceful healing.',
    benefits: [
      'Soothes tender postpartum tissue',
      'Anti-inflammatory herbs reduce bruising, inflammation, and discomfort',
      'Zero mess: natural cotton drawstring pouch contains all botanical petals',
      'Hang directly on your bathtub faucet or brew as a warm sitz bath, chilled padsicles, and peri rinse'
    ],
    ingredients: [
      'Organic Calendula (Marigold) Flowers (Calendula officinalis)',
      'Organic Lavender Buds (Lavandula angustifolia)',
      'Organic Whole Chamomile Blossoms (Matricaria recutita)',
      'Organic Comfrey Leaf (Symphytum officinale)',
      'Unbleached 100% Organic Cotton Drawstring Steep Bag'
    ],
    amountOptions: [
      { label: '2 bath pouches', count: 2, price: 18 },
      { label: '4 bath pouches', count: 4, price: 32 }
    ],
    servingNote: 'Each herbal pouch yields 5–7 restorative steeps. Hang directly on your tub faucet or steep in boiling water.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'google-review-1',
    author: 'Hannah G.',
    role: 'Google Verified Reviewer',
    location: '5.0 ★★★★★',
    rating: 5,
    comment:
      'Milk & Marigold was an absolute lifesaver during my postpartum recovery! The lactation cookies are truly the most delicious I have ever had—soft, fresh, and genuinely helped boost my milk supply within days. The Lavender Sea Salt Chocolate Chip is heavenly. You can taste the quality of the 100% organic ingredients in every single bite.',
    product: 'Organic Lactation Cookies'
  },
  {
    id: 'google-review-2',
    author: 'Brittany L.',
    role: 'Google Verified Reviewer',
    location: '5.0 ★★★★★',
    rating: 5,
    comment:
      'The organic herbal bath & sitz pouches provided so much soothing relief in those first tender weeks. Steeping the calendula and lavender blend created the most restorative, healing ritual for both body and mind. It felt like receiving a warm hug when I needed it most. I cannot recommend Milk & Marigold enough!',
    product: 'Herbal Postpartum Bath & Sitz Pouches'
  },
  {
    id: 'google-review-3',
    author: 'Jessica M.',
    role: 'Google Verified Reviewer',
    location: '5.0 ★★★★★',
    rating: 5,
    comment:
      'I ordered the Signature Postpartum Care Package for my best friend after her baby arrived. Everything was packaged with such elegance and intentional care. She raved about the handwritten card, the soothing herbal aroma, and the cookies. The absolute best gift you can give a newborn mother!',
    product: 'Signature Postpartum Care Package'
  }
];

export const FAQS: FaqItem[] = [
  {
    category: 'cookies',
    question: 'How do the lactation cookies work to support milk supply?',
    answer:
      'Our cookies are intentionally packed with proven, traditional galactagogues—natural whole foods known to support prolactin levels and healthy lactation. We use 100% organic sprouted oats, debittered brewer’s yeast (rich in B vitamins, chromium, and iron), cold-milled golden flaxseed meal (rich in omega-3 healthy fats), and organic virgin coconut oil. Together, they provide sustained caloric and micronutrient support for breastfeeding and pumping mamas.'
  },
  {
    category: 'cookies',
    question: 'Are your cookies safe for partners, kids, and non-lactating family members?',
    answer:
      'Yes, absolutely! While our cookies are formulated with galactagogues that support lactation in nursing mothers, they do not contain hormones or pharmaceuticals. They are simply wholesome, organic whole-grain superfood cookies that taste delicious and provide clean energy for anyone in the household.'
  },
  {
    category: 'bath',
    question: 'How do I use the Herbal Postpartum Bath & Sitz Pouches?',
    answer:
      'Using our pouches is so simple and versatile! You can hang the herbal pouch directly over your bathtub faucet and run warm bath water over it as the tub fills, or place 1 pouch into a pot with boiling water and steep covered for 15–20 minutes before pouring into your bath or sitz bowl. Each pouch yields 5–7 restorative steeps. You can also pour the cooled herbal liquid into a peri bottle for soothing post-void cleansing or soak organic pads and freeze them for restorative "padsicles".'
  },
  {
    category: 'ordering',
    question: 'When should I place an order for an expectant mama’s due date?',
    answer:
      'We recommend placing your order 2 to 3 weeks before the estimated due date. In our order form, you can specify the mama’s estimated due date or desired delivery week. We bake all cookies fresh in small batches to ensure they arrive at peak freshness.'
  },
  {
    category: 'ordering',
    question: 'What are your delivery and shipping options?',
    answer:
      'We offer local pick-up and delivery within our regional service area and nationwide USPS Priority shipping across the US. Care packages are wrapped with delicate floral linen ties, protective insulation, and custom handwritten cards.'
  },
  {
    category: 'ingredients',
    question: 'Can you accommodate gluten-free dietary needs?',
    answer:
      'Yes! We believe every mama deserves nourishing care. We offer dedicated Gluten-Free recipes made with certified gluten-free oat flour and wholesome organic ingredients.'
  }
];
