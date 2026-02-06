// types/mockProducts.ts
import { Product } from '@/types/product';

export const categories = [
  { id: 'featured', name: 'Featured', slug: 'featured', description: 'Featured products' },
  { id: 'christmas', name: 'Christmas', slug: 'christmas', description: 'Holiday collection' },
  { id: 'one-hot-mama', name: 'One Hot Mama Collection', slug: 'one-hot-mama', description: 'One Hot Mama merchandise' },
  { id: 'the-way-i-wanna-go', name: 'The Way I Wanna Go', slug: 'the-way-i-wanna-go', description: 'The Way I Wanna Go collection' },
  { id: 'apparel', name: 'Apparel', slug: 'apparel', description: 'Clothing and apparel' },
  { id: 'accessories', name: 'Accessories', slug: 'accessories', description: 'Accessories and gear' },
  { id: 'music', name: 'Music', slug: 'music', description: 'Music and albums' },
  { id: 'sale', name: 'Sale', slug: 'sale', description: 'Discounted items' },
  { id: 'gift-card', name: 'Gift Card', slug: 'gift-card', description: 'Gift cards' },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    title: '2026 Wall Calendar (Pre-Order)',
    description: 'Official 2026 Trace Adkins wall calendar featuring exclusive photos and tour dates.',
    fullDescription: 'Plan your year with the official Trace Adkins 2026 wall calendar. This exclusive calendar features never-before-seen professional photos from studio sessions and live performances. Includes all tour dates, release dates, and special anniversaries. Printed on high-quality premium paper with a durable spiral binding. Perfect for home, office, or as a gift for any Trace Adkins fan.',
    price: 99.99,
    originalPrice: 299.99,
    category: ['featured', 'accessories'],
    images: [
      '/2026_TraceAdkins_front_cover_comp_grande.webp',
      '/2026_TraceAdkins_front_cover_comp_grande.webp',
      '/2026_TraceAdkins_front_cover_comp_grande.webp',
      '/2026_TraceAdkins_front_cover_comp_grande.webp',
    ],
    featuredImage: '/2026_TraceAdkins_front_cover_comp_grande.webp',
    quantity: 150,
    inStock: true,
    sku: 'TA-2026-CAL',
    tags: ['calendar', '2026', 'pre-order', 'official', 'limited'],
    weight: 0.5,
    dimensions: { length: 12, width: 12, height: 0.2 },
    materials: ['Premium paper', 'Spiral binding'],
    features: ['12-month calendar', 'Exclusive photos', 'Tour dates', 'High-quality printing'],
    specifications: {
      'Size': '12" x 12"',
      'Pages': '14',
      'Binding': 'Spiral',
      'Paper Quality': 'Premium Gloss'
    }
  },
  {
    id: '2',
    title: 'Hoodie Zip Black Eagle',
    description: 'Premium black zip-up hoodie featuring the iconic eagle logo embroidery.',
    fullDescription: 'Stay warm and represent with this premium black zip-up hoodie. Features a large embroidered eagle logo on the back and a smaller chest logo. Made from heavyweight 80% cotton / 20% polyester blend for ultimate comfort and durability. Includes a front kangaroo pocket, ribbed cuffs and hem, and a matching drawstring. Perfect for concerts, casual wear, or showing your Trace Adkins pride anywhere.',
    price: 199.99,
    originalPrice: 600.99,
    category: ['apparel', 'featured', 'one-hot-mama'],
    images: [
      '//Hoodie_Zip_Blk_Eagle_F_B_Ecom_grande.webp',
      '/Hoodie_Zip_Blk_Eagle_F_Ecom_medium.avif',
      '/Hoodie_Zip_Blk_Eagle_B_Ecom_grande.webp',
    ],
    featuredImage: '/Hoodie_Zip_Blk_Eagle_F_B_Ecom_grande.webp',
    quantity: 85,
    inStock: true,
    sku: 'TA-HD-BLK-EAGLE',
    tags: ['hoodie', 'black', 'eagle', 'zip-up', 'premium'],
    weight: 1.2,
    dimensions: { length: 30, width: 24, height: 2 },
    materials: ['80% Cotton', '20% Polyester'],
    features: ['Front zip', 'Kangaroo pocket', 'Ribbed cuffs', 'Embroidered logo'],
    specifications: {
      'Material': 'Cotton/Polyester Blend',
      'Fit': 'Regular',
      'Care': 'Machine wash cold',
      'Sizes': 'S, M, L, XL, XXL'
    }
  },
  {
    id: '3',
    title: 'Charcoal Horse Tee',
    description: 'Soft charcoal grey t-shirt featuring a classic horse design.',
    fullDescription: 'Our classic Charcoal Horse Tee combines comfort with style. Made from 100% ringspun cotton for a soft, premium feel that gets better with every wash. Features a vintage-inspired horse design screen printed for lasting durability. The relaxed fit makes it perfect for everyday wear, concerts, or casual outings. This tee is a fan favorite and a staple in any country music fan\'s wardrobe.',
    price: 299.99,
    category: ['apparel', 'the-way-i-wanna-go'],
    images: [
      '/TAHorseBandonkF_BWeb_grande.webp',
      '/TAHorseBandonkF_BWeb_grande.webp',
      '/TAHorseBandonkF_BWeb_grande.webp',
    ],
    featuredImage: '/TAHorseBandonkF_BWeb_grande.webp',
    quantity: 200,
    inStock: true,
    sku: 'TA-TEE-CHAR-HORSE',
    tags: ['t-shirt', 'charcoal', 'horse', 'cotton', 'classic'],
    weight: 0.3,
    dimensions: { length: 28, width: 20, height: 1 },
    materials: ['100% Ringspun Cotton'],
    features: ['Premium cotton', 'Screen printed design', 'Relaxed fit', 'Tagless label'],
    specifications: {
      'Material': '100% Cotton',
      'Fit': 'Relaxed',
      'Care': 'Machine wash cold',
      'Print Method': 'Screen Print'
    }
  },
  {
    id: '4',
    title: 'Two-Tone Trucker Hat',
    description: 'Classic two-tone trucker hat with embroidered Trace Adkins logo.',
    fullDescription: 'Complete your look with this stylish two-tone trucker hat. Features a mesh back for breathability and a structured foam front for lasting shape. The embroidered Trace Adkins logo adds a touch of authenticity to this must-have accessory. Adjustable snapback closure ensures a perfect fit for everyone. Perfect for outdoor concerts, festivals, or casual everyday wear.',
    price: 299.99,
    category: ['accessories', 'sale'],
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533050487297-09b450131914?auto=format&fit=crop&w=800&q=80',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    quantity: 120,
    inStock: true,
    sku: 'TA-HAT-TRUCKER',
    tags: ['hat', 'trucker', 'two-tone', 'accessory'],
    weight: 0.2,
    dimensions: { length: 22, width: 18, height: 10 },
    materials: ['Foam front', 'Mesh back', 'Polyester'],
    features: ['Adjustable snapback', 'Mesh back', 'Embroidered logo', 'Structured front'],
    specifications: {
      'Style': 'Trucker Hat',
      'Closure': 'Snapback',
      'Material': 'Foam/Mesh',
      'One Size': 'Fits Most'
    }
  },
  {
    id: '5',
    title: 'Two-Tone Tote Eagle',
    description: 'Reinforced contrast shoulder straps, one large main compartment One size 16.54in x 16.54in, Gusset width 3.74in, Strap length 28.35in.',
    fullDescription: 'Get into the holiday spirit with this special Christmas album bundle. Includes the "One More Christmas" album on CD, plus two exclusive bonus tracks not available anywhere else. The bundle also comes with a digital download code and a limited edition holiday photo card signed by Trace Adkins. Perfect for holiday gatherings or as a special Christmas gift for the country music fan in your life.',
    price: 49.99,
    originalPrice: 350.99,
    category: ['music', 'christmas', 'featured'],
    images: [
      '/ToteGreenEagleEcom_2048x2048.webp',
      '/ToteGreenEagleEcom_2048x2048.webp',
      '/ToteGreenEagleEcom_2048x2048.webp',
    ],
    featuredImage: '/ToteGreenEagleEcom_2048x2048.webp',
    quantity: 75,
    inStock: true,
    sku: 'TA-BND-CHRISTMAS',
    tags: ['album', 'christmas', 'bundle', 'limited', 'signed'],
    weight: 0.4,
    dimensions: { length: 14, width: 12, height: 2 },
    features: ['CD album', 'Exclusive bonus tracks', 'Digital download', 'Signed photo card'],
    specifications: {
      'Format': 'CD + Digital',
      'Tracks': '14 + 2 bonus',
      'Edition': 'Limited Holiday',
      'Includes': 'Signed photo card'
    }
  },
  {
    id: '6',
    title: 'Honky Tonk Badonkadonk - Throwback Tee',
    description: 'Official Trace Adkins Merchandise',
    fullDescription: 'Own a piece of music history with this limited edition signed vinyl of Trace Adkins\' acclaimed album "The Way I Wanna Go". Each copy is hand-signed by Trace Adkins himself and includes a certificate of authenticity. Pressed on 180-gram premium vinyl for superior sound quality. The gatefold sleeve features exclusive artwork and liner notes. A must-have for serious collectors and dedicated fans.',
    price: 199.99,
    category: ['music', 'the-way-i-wanna-go', 'featured'],
    images: [
      '/TA_HONKYTONK_RINGS_MOCK_2048x2048.webp',
      '/TA_HONKYTONK_RINGS_MOCK_2048x2048.webp',
      '/TA_HONKYTONK_RINGS_MOCK_2048x2048.webp',
    ],
    featuredImage: '/TA_HONKYTONK_RINGS_MOCK_2048x2048.webp',
    quantity: 50,
    inStock: true,
    sku: 'TA-VINYL-SIGNED',
    tags: ['vinyl', 'signed', 'limited', 'collector', 'album'],
    weight: 0.6,
    dimensions: { length: 12, width: 12, height: 1 },
    materials: ['180g Vinyl', 'Gatefold sleeve'],
    features: ['Hand-signed', '180g vinyl', 'Certificate of authenticity', 'Limited edition'],
    specifications: {
      'Format': 'Vinyl LP',
      'Weight': '180g',
      'Edition': 'Signed Limited',
      'Quantity': '500 worldwide'
    }
  },
  {
    id: '7',
    title: 'Autographed - Limited Edition - Trace Adkins Guitar',
    description: 'One acoustic guitar, autographed by Trace Adkins.\nWrapped Decal',
    fullDescription: 'Relive the magic of the "One Hot Mama" tour with this official tour jacket. Features embroidered tour dates on the back, a large front logo, and multiple pockets for convenience. Made from durable water-resistant material with a soft fleece lining for comfort. This collector\'s item includes all the tour stops and exclusive "One Hot Mama" branding. Limited quantities available.',
    price: 555.99,
    originalPrice: 530.99,
    category: ['apparel', 'one-hot-mama', 'sale'],
    images: [
      '/TA-guitar-reviesd_2048x2048.webp',
      '/TA-guitar-reviesd_2048x2048.webp',
      '/TA-guitar-reviesd_2048x2048.webp',
    ],
    featuredImage: '/TA-guitar-reviesd_2048x2048.webp',
    quantity: 35,
    inStock: true,
    sku: 'TA-JKT-ONEHOT',
    tags: ['jacket', 'tour', 'limited', 'collector', 'one-hot-mama'],
    weight: 1.5,
    dimensions: { length: 32, width: 26, height: 3 },
    materials: ['Polyester shell', 'Fleece lining'],
    features: ['Water-resistant', 'Tour dates embroidered', 'Multiple pockets', 'Fleece lined'],
    specifications: {
      'Material': 'Polyester/Fleece',
      'Style': 'Tour Jacket',
      'Features': 'Water-resistant',
      'Sizes': 'M, L, XL only'
    }
  },
  {
    id: '8',
    title: 'Trace Adkins Gift Card',
    description: 'Gift Cards make the perfect gift for the Trace Adkins fan in your life.  Order in denominations of $10, $25, $50, or $100.  Redemption instructions will be sent via email immediately after purchase. ',
    fullDescription: 'The perfect gift for any Trace Adkins fan! This $50 digital gift card can be used toward any purchase in the official Trace Adkins store. Delivered instantly via email with a custom design. No expiration date and can be combined with other payment methods. Great for birthdays, holidays, or just because. Recipients will receive instructions for redemption immediately after purchase.',
    price: 500.00,
    category: ['gift-card'],
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    quantity: 999,
    inStock: true,
    sku: 'TA-GC-50',
    tags: ['gift-card', 'digital', 'instant'],
    features: ['Instant delivery', 'No expiration', 'Email delivery', 'Redeemable online'],
    specifications: {
      'Type': 'Digital Gift Card',
      'Value': '$50',
      'Delivery': 'Instant Email',
      'Expiration': 'None'
    }
  },
  {
    id: '9',
    title: '2026 Wall Calendar',
    description: '2026 Wall Calendar featuring new images of Trace Adkins',
    fullDescription: 'Strum in style with this set of 6 custom guitar picks featuring Trace Adkins branding. Made from durable celluloid with a perfect 0.71mm thickness for great tone and playability. Each pick features different designs including logos, album art, and signatures. Comes in a reusable metal tin perfect for keeping in your guitar case or as a display piece. A great accessory for musicians and collectors alike.',
    price: 255.99,
    category: ['accessories', 'music'],
    images: [
      '/ScreenShot2023-11-21at1.06.21PM_medium.avif',
      '/IMG_7464_medium.avif',
      '/IMG_7464_medium.avif',
    ],
    featuredImage: '/ScreenShot2023-11-21at1.06.21PM_medium.avif',
    quantity: 300,
    inStock: true,
    sku: 'TA-PICKS-SET',
    tags: ['guitar', 'picks', 'musician', 'accessory'],
    weight: 0.1,
    dimensions: { length: 10, width: 8, height: 1 },
    materials: ['Celluloid'],
    features: ['6 different designs', '0.71mm thickness', 'Metal tin case', 'Durable'],
    specifications: {
      'Quantity': '6 picks',
      'Thickness': '0.71mm',
      'Material': 'Celluloid',
      'Case': 'Metal tin'
    }
  },
  {
    id: '10',
    title: 'Limited Edition Poster Set',
    description: 'Set of 3 limited edition concert posters from iconic tours.',
    fullDescription: 'Decorate your space with this exclusive set of 3 limited edition concert posters from Trace Adkins\' most iconic tours. Each poster measures 18" x 24" and is printed on high-quality archival paper. Features artwork from the "Songs About Me", "Dangerous Man", and "The Way I Wanna Go" tours. Limited to 500 sets worldwide, each numbered and comes with a certificate of authenticity. Ready to frame and display.',
    price: 200,
    originalPrice: 512.99,
    category: ['accessories', 'sale', 'featured'],
    images: [
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=800&q=80',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80',
    quantity: 150,
    inStock: true,
    sku: 'TA-POSTER-SET',
    tags: ['poster', 'limited', 'art', 'collector', 'tour'],
    weight: 0.8,
    dimensions: { length: 24, width: 18, height: 1 },
    materials: ['Archival paper'],
    features: ['Set of 3 posters', 'Limited edition', 'Numbered', 'Certificate of authenticity'],
    specifications: {
      'Size': '18" x 24" each',
      'Quantity': '3 posters',
      'Edition': 'Limited to 500',
      'Paper': 'Archival Quality'
    }
  }
];