import { Region, SupplierHub, IndependentSeller, FlowShipProduct, Store } from '@/types/flowship';

export const yemeniRegions: Region[] = [
  { id: 'all', nameEn: 'All Regions', nameAr: 'جميع المحافظات' },
  { id: 'sanaa', nameEn: 'Sana\'a', nameAr: 'صنعاء' },
  { id: 'aden', nameEn: 'Aden', nameAr: 'عدن' },
  { id: 'taiz', nameEn: 'Taiz', nameAr: 'تعز' },
  { id: 'ibb', nameEn: 'Ibb', nameAr: 'إب' },
  { id: 'hudaydah', nameEn: 'Al Hudaydah', nameAr: 'الحديدة' },
  { id: 'mukalla', nameEn: 'Mukalla', nameAr: 'المكلا' },
  { id: 'sadah', nameEn: 'Sa\'dah', nameAr: 'صعدة' },
  { id: 'bayda', nameEn: 'Al Bayda', nameAr: 'البيضاء' },
  { id: 'dhamar', nameEn: 'Dhamar', nameAr: 'ذمار' },
  { id: 'marib', nameEn: 'Marib', nameAr: 'مأرب' },
  { id: 'amran', nameEn: 'Amran', nameAr: 'عمران' },
  { id: 'mahwit', nameEn: 'Al Mahwit', nameAr: 'المحويت' },
  { id: 'dhale', nameEn: 'Al Dhale', nameAr: 'الضالع' },
  { id: 'hajjah', nameEn: 'Hajjah', nameAr: 'حجة' },
  { id: 'raymah', nameEn: 'Raymah', nameAr: 'ريمة' },
  { id: 'shabwah', nameEn: 'Shabwah', nameAr: 'شبوة' },
  { id: 'lahij', nameEn: 'Lahij', nameAr: 'لحج' },
  { id: 'jawf', nameEn: 'Al Jawf', nameAr: 'الجوف' },
  { id: 'mahrah', nameEn: 'Al Mahrah', nameAr: 'المهرة' },
  { id: 'socotra', nameEn: 'Socotra', nameAr: 'سقطرى' },
];

export const mockStores: Store[] = [
  {
    id: 'store-1',
    name: 'Tech Paradise',
    productCount: 450,
    category: 'Electronics',
    rating: 4.8,
    supplierId: 'hub-1'
  },
  {
    id: 'store-2',
    name: 'Fashion Forward',
    productCount: 320,
    category: 'Clothing',
    rating: 4.6,
    supplierId: 'hub-1'
  },
  {
    id: 'store-3',
    name: 'Home Essentials',
    productCount: 280,
    category: 'Home & Garden',
    rating: 4.7,
    supplierId: 'hub-2'
  },
];

export const mockSupplierHubs: SupplierHub[] = [
  {
    id: 'hub-1',
    name: 'Al-Hidaa Supermarket',
    region: 'sanaa',
    rating: 4.8,
    totalProducts: 3000000,
    shippingZones: ['sanaa', 'dhamar', 'amran', 'ibb'],
    verified: true,
    type: 'hub',
    description: 'Premier supermarket chain with over 3M+ SKUs across 120+ categories',
    joinedDate: '2023-01-15',
    entityType: 'supermarket',
    stores: [
      {
        id: 'store-1',
        name: 'Electronics Department',
        productCount: 85000,
        category: 'Electronics',
        rating: 4.9,
        supplierId: 'hub-1'
      },
      {
        id: 'store-2',
        name: 'Fashion & Apparel',
        productCount: 120000,
        category: 'Clothing',
        rating: 4.7,
        supplierId: 'hub-1'
      }
    ]
  },
  {
    id: 'hub-2',
    name: 'Al-Libya Mall',
    region: 'sanaa',
    rating: 4.9,
    totalProducts: 5000000,
    shippingZones: ['sanaa', 'taiz', 'hudaydah', 'ibb', 'dhamar'],
    verified: true,
    type: 'hub',
    description: 'Largest shopping mall in Yemen with 5M+ products and premium brands',
    joinedDate: '2022-11-20',
    entityType: 'commercialMall',
    stores: [
      {
        id: 'store-3',
        name: 'Premium Electronics',
        productCount: 95000,
        category: 'Electronics',
        rating: 4.8,
        supplierId: 'hub-2'
      },
      {
        id: 'store-4',
        name: 'Home & Living',
        productCount: 200000,
        category: 'Home & Garden',
        rating: 4.6,
        supplierId: 'hub-2'
      }
    ]
  },
  {
    id: 'hub-3',
    name: 'Al-Azzani Mall',
    region: 'sanaa',
    rating: 4.7,
    totalProducts: 4500000,
    shippingZones: ['sanaa', 'amran', 'mahwit'],
    verified: true,
    type: 'hub',
    description: 'Modern commercial center with 4.5M+ SKUs and fast delivery services',
    joinedDate: '2023-03-10',
    entityType: 'shoppingCenter',
    stores: [
      {
        id: 'store-5',
        name: 'Sports & Outdoor',
        productCount: 45000,
        category: 'Sports & Outdoor',
        rating: 4.5,
        supplierId: 'hub-3'
      }
    ]
  },
  {
    id: 'hub-4',
    name: 'Aden Port Commercial Hub',
    region: 'aden',
    rating: 4.6,
    totalProducts: 2800000,
    shippingZones: ['aden', 'lahij', 'dhale'],
    verified: true,
    type: 'hub',
    description: 'Strategic port location with international imports and 2.8M+ products',
    joinedDate: '2022-08-12',
    entityType: 'commercialMall',
    stores: [
      {
        id: 'store-6',
        name: 'Import Electronics',
        productCount: 150000,
        category: 'Electronics',
        rating: 4.7,
        supplierId: 'hub-4'
      }
    ]
  }
];

export const mockIndependentSellers: IndependentSeller[] = [
  {
    id: 'seller-1',
    name: 'Ahmed Electronics',
    region: 'sanaa',
    rating: 4.5,
    totalProducts: 5200,
    shippingZones: ['sanaa', 'dhamar'],
    verified: true,
    type: 'independent',
    description: 'Specialized electronics retailer with 5k+ SKUs and competitive prices',
    joinedDate: '2023-06-01',
    entityType: 'retailSeller',
    externalShopUrl: 'https://ahmed-electronics.ye'
  },
  {
    id: 'seller-2',
    name: 'Fatima Home Essentials',
    region: 'taiz',
    rating: 4.7,
    totalProducts: 8500,
    shippingZones: ['taiz', 'ibb', 'dhamar'],
    verified: true,
    type: 'independent',
    description: 'Quality home goods and kitchenware with 8k+ products',
    joinedDate: '2023-04-15',
    entityType: 'retailSeller',
    externalShopUrl: 'https://fatima-home.ye'
  },
  {
    id: 'seller-3',
    name: 'Mohammed Fashion Store',
    region: 'hudaydah',
    rating: 4.4,
    totalProducts: 6800,
    shippingZones: ['hudaydah', 'sanaa'],
    verified: true,
    type: 'independent',
    description: 'Trendy clothing and accessories for all ages - 6k+ fashion items',
    joinedDate: '2023-07-22',
    entityType: 'retailSeller',
    externalShopUrl: 'https://mohammed-fashion.ye'
  },
  {
    id: 'seller-4',
    name: 'Khalid Auto Parts',
    region: 'aden',
    rating: 4.6,
    totalProducts: 12000,
    shippingZones: ['aden', 'lahij', 'dhale'],
    verified: true,
    type: 'independent',
    description: 'Automotive parts and accessories specialist with 12k+ items',
    joinedDate: '2022-12-08',
    entityType: 'retailSeller',
    externalShopUrl: 'https://khalid-auto.ye'
  },
  {
    id: 'seller-5',
    name: 'Nadia Beauty Corner',
    region: 'sanaa',
    rating: 4.8,
    totalProducts: 4200,
    shippingZones: ['sanaa', 'amran'],
    verified: true,
    type: 'independent',
    description: 'Premium beauty products and cosmetics - 4k+ beauty essentials',
    joinedDate: '2023-05-30',
    entityType: 'retailSeller',
    externalShopUrl: 'https://nadia-beauty.ye'
  }
];

export const mockProducts: FlowShipProduct[] = [
  // Al-Hidaa Supermarket Products (hub-1)
  {
    id: 'product-1',
    name: 'Samsung Galaxy A54',
    image: '/placeholder.svg',
    price: 285000,
    originalPrice: 320000,
    description: 'Latest Samsung smartphone with excellent camera and long battery life',
    category: 'Electronics',
    supplierId: 'hub-1',
    inStock: true,
    stockQuantity: 25,
    specifications: { 'Screen Size': '6.4"', 'RAM': '8GB', 'Storage': '256GB', 'Camera': '50MP' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-2',
    name: 'LED TV 55"',
    image: '/placeholder.svg',
    price: 450000,
    originalPrice: 520000,
    description: 'Smart LED TV with 4K resolution and HDR support',
    category: 'Electronics',
    supplierId: 'hub-1',
    inStock: true,
    stockQuantity: 8,
    specifications: { 'Screen Size': '55"', 'Resolution': '4K UHD', 'Smart TV': 'Yes', 'Brand': 'LG' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-3',
    name: 'Wireless Bluetooth Headphones',
    image: '/placeholder.svg',
    price: 125000,
    description: 'Premium wireless headphones with noise cancellation',
    category: 'Electronics',
    supplierId: 'hub-1',
    inStock: true,
    stockQuantity: 35,
    specifications: { 'Type': 'Over-ear', 'Battery': '30 hours', 'Noise Cancellation': 'Yes' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-4',
    name: 'Coffee Maker Machine',
    image: '/placeholder.svg',
    price: 180000,
    description: 'Automatic coffee maker with multiple brewing options',
    category: 'Home & Garden',
    supplierId: 'hub-1',
    inStock: true,
    stockQuantity: 12,
    specifications: { 'Capacity': '1.5L', 'Type': 'Drip Coffee', 'Programmable': 'Yes' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-5',
    name: 'Men\'s Casual Shirt',
    image: '/placeholder.svg',
    price: 35000,
    description: 'Cotton casual shirt perfect for everyday wear',
    category: 'Clothing',
    supplierId: 'hub-1',
    inStock: true,
    stockQuantity: 28,
    specifications: { 'Material': '100% Cotton', 'Sizes': 'S, M, L, XL', 'Colors': 'Blue, White, Gray' },
    images: ['/placeholder.svg']
  },

  // Al-Libya Mall Products (hub-2)
  {
    id: 'product-6',
    name: 'iPhone 15 Pro',
    image: '/placeholder.svg',
    price: 850000,
    originalPrice: 920000,
    description: 'Latest iPhone with titanium design and advanced camera system',
    category: 'Electronics',
    supplierId: 'hub-2',
    inStock: true,
    stockQuantity: 15,
    specifications: { 'Screen': '6.1"', 'Storage': '256GB', 'Camera': 'Pro Triple Camera', 'Material': 'Titanium' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-7',
    name: 'Designer Leather Sofa',
    image: '/placeholder.svg',
    price: 650000,
    description: 'Premium leather sofa with modern design and comfort',
    category: 'Home & Garden',
    supplierId: 'hub-2',
    inStock: true,
    stockQuantity: 5,
    specifications: { 'Material': 'Genuine Leather', 'Seats': '3-Seater', 'Color': 'Brown, Black' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-8',
    name: 'Smart Home Hub',
    image: '/placeholder.svg',
    price: 220000,
    description: 'Central hub for controlling all your smart home devices',
    category: 'Electronics',
    supplierId: 'hub-2',
    inStock: true,
    stockQuantity: 18,
    specifications: { 'Compatibility': 'WiFi, Zigbee, Z-Wave', 'Voice Control': 'Alexa, Google' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-9',
    name: 'Premium Dinner Set',
    image: '/placeholder.svg',
    price: 95000,
    description: '24-piece porcelain dinner set for elegant dining',
    category: 'Home & Garden',
    supplierId: 'hub-2',
    inStock: true,
    stockQuantity: 22,
    specifications: { 'Material': 'Porcelain', 'Pieces': '24', 'Dishwasher Safe': 'Yes' },
    images: ['/placeholder.svg']
  },

  // Al-Azzani Mall Products (hub-3)
  {
    id: 'product-10',
    name: 'Running Shoes',
    image: '/placeholder.svg',
    price: 125000,
    description: 'Professional running shoes with advanced cushioning',
    category: 'Sports & Outdoor',
    supplierId: 'hub-3',
    inStock: true,
    stockQuantity: 30,
    specifications: { 'Brand': 'Nike', 'Type': 'Running', 'Sizes': '7-12', 'Technology': 'Air Zoom' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-11',
    name: 'Fitness Tracker Watch',
    image: '/placeholder.svg',
    price: 95000,
    originalPrice: 115000,
    description: 'Advanced fitness tracker with heart rate monitoring',
    category: 'Sports & Outdoor',
    supplierId: 'hub-3',
    inStock: true,
    stockQuantity: 25,
    specifications: { 'Battery': '7 days', 'Water Resistant': '5ATM', 'GPS': 'Yes' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-12',
    name: 'Yoga Mat Premium',
    image: '/placeholder.svg',
    price: 45000,
    description: 'Non-slip yoga mat with excellent grip and cushioning',
    category: 'Sports & Outdoor',
    supplierId: 'hub-3',
    inStock: true,
    stockQuantity: 40,
    specifications: { 'Thickness': '6mm', 'Material': 'TPE', 'Size': '183x61cm' },
    images: ['/placeholder.svg']
  },

  // Aden Port Commercial Hub Products (hub-4)
  {
    id: 'product-13',
    name: 'Gaming Laptop',
    image: '/placeholder.svg',
    price: 950000,
    description: 'High-performance gaming laptop with RTX graphics',
    category: 'Electronics',
    supplierId: 'hub-4',
    inStock: true,
    stockQuantity: 8,
    specifications: { 'GPU': 'RTX 4060', 'RAM': '16GB', 'Storage': '1TB SSD', 'Display': '15.6" 144Hz' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-14',
    name: 'Mechanical Keyboard',
    image: '/placeholder.svg',
    price: 85000,
    description: 'RGB mechanical keyboard for gaming and productivity',
    category: 'Electronics',
    supplierId: 'hub-4',
    inStock: true,
    stockQuantity: 20,
    specifications: { 'Switches': 'Cherry MX Blue', 'RGB': 'Yes', 'Layout': 'Full Size' },
    images: ['/placeholder.svg']
  },

  // Ahmed Electronics Products (seller-1)
  {
    id: 'product-15',
    name: 'Tablet 10 inch',
    image: '/placeholder.svg',
    price: 195000,
    description: 'Android tablet perfect for work and entertainment',
    category: 'Electronics',
    supplierId: 'seller-1',
    inStock: true,
    stockQuantity: 15,
    specifications: { 'Screen': '10.1"', 'RAM': '4GB', 'Storage': '64GB', 'OS': 'Android 13' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-16',
    name: 'Wireless Mouse',
    image: '/placeholder.svg',
    price: 25000,
    description: 'Ergonomic wireless mouse with long battery life',
    category: 'Electronics',
    supplierId: 'seller-1',
    inStock: true,
    stockQuantity: 45,
    specifications: { 'Type': 'Optical', 'Battery': '12 months', 'DPI': '1600' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-17',
    name: 'Power Bank 20000mAh',
    image: '/placeholder.svg',
    price: 35000,
    description: 'High-capacity power bank with fast charging',
    category: 'Electronics',
    supplierId: 'seller-1',
    inStock: true,
    stockQuantity: 35,
    specifications: { 'Capacity': '20000mAh', 'Fast Charging': 'Yes', 'Ports': '2 USB' },
    images: ['/placeholder.svg']
  },

  // Fatima Home Essentials Products (seller-2)
  {
    id: 'product-18',
    name: 'Kitchen Knife Set',
    image: '/placeholder.svg',
    price: 75000,
    description: 'Professional kitchen knife set with wooden block',
    category: 'Home & Garden',
    supplierId: 'seller-2',
    inStock: true,
    stockQuantity: 18,
    specifications: { 'Pieces': '8', 'Material': 'Stainless Steel', 'Block': 'Bamboo Wood' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-19',
    name: 'Bed Sheet Set',
    image: '/placeholder.svg',
    price: 55000,
    description: 'Soft cotton bed sheet set with pillowcases',
    category: 'Home & Garden',
    supplierId: 'seller-2',
    inStock: true,
    stockQuantity: 25,
    specifications: { 'Material': '100% Cotton', 'Thread Count': '300', 'Size': 'Queen' },
    images: ['/placeholder.svg']
  },

  // Mohammed Fashion Store Products (seller-3)
  {
    id: 'product-20',
    name: 'Traditional Yemeni Dress',
    image: '/placeholder.svg',
    price: 45000,
    description: 'Beautiful traditional dress with modern touch',
    category: 'Clothing',
    supplierId: 'seller-3',
    inStock: true,
    stockQuantity: 12,
    specifications: { 'Material': 'Cotton', 'Size': 'M, L, XL', 'Color': 'Blue, Red, Green' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-21',
    name: 'Men\'s Formal Suit',
    image: '/placeholder.svg',
    price: 125000,
    description: 'Elegant formal suit perfect for business occasions',
    category: 'Clothing',
    supplierId: 'seller-3',
    inStock: true,
    stockQuantity: 8,
    specifications: { 'Material': 'Wool Blend', 'Sizes': 'S-XXL', 'Colors': 'Navy, Charcoal' },
    images: ['/placeholder.svg']
  },

  // Khalid Auto Parts Products (seller-4)
  {
    id: 'product-22',
    name: 'Car Air Filter',
    image: '/placeholder.svg',
    price: 15000,
    description: 'High-quality air filter for better engine performance',
    category: 'Automotive',
    supplierId: 'seller-4',
    inStock: true,
    stockQuantity: 50,
    specifications: { 'Type': 'Engine Air Filter', 'Compatibility': 'Most Cars', 'Material': 'Paper' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-23',
    name: 'LED Headlight Bulbs',
    image: '/placeholder.svg',
    price: 45000,
    description: 'Bright LED headlight bulbs with long lifespan',
    category: 'Automotive',
    supplierId: 'seller-4',
    inStock: true,
    stockQuantity: 30,
    specifications: { 'Type': 'H7 LED', 'Brightness': '6000K', 'Lifespan': '50000 hours' },
    images: ['/placeholder.svg']
  },

  // Nadia Beauty Corner Products (seller-5)
  {
    id: 'product-24',
    name: 'Skincare Set',
    image: '/placeholder.svg',
    price: 85000,
    description: 'Complete skincare routine set for all skin types',
    category: 'Health & Beauty',
    supplierId: 'seller-5',
    inStock: true,
    stockQuantity: 20,
    specifications: { 'Products': '4', 'Skin Type': 'All', 'Natural': 'Yes' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-25',
    name: 'Makeup Brush Set',
    image: '/placeholder.svg',
    price: 55000,
    description: 'Professional makeup brush set with storage case',
    category: 'Health & Beauty',
    supplierId: 'seller-5',
    inStock: true,
    stockQuantity: 25,
    specifications: { 'Brushes': '12', 'Hair Type': 'Synthetic', 'Case': 'Included' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-26',
    name: 'Hair Styling Tools Set',
    image: '/placeholder.svg',
    price: 125000,
    description: 'Professional hair styling tools with ceramic coating',
    category: 'Health & Beauty',
    supplierId: 'seller-5',
    inStock: true,
    stockQuantity: 15,
    specifications: { 'Tools': '3', 'Coating': 'Ceramic', 'Heat Settings': 'Variable' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-27',
    name: 'Facial Cleansing Device',
    image: '/placeholder.svg',
    price: 95000,
    description: 'Electronic facial cleansing device with multiple settings',
    category: 'Health & Beauty',
    supplierId: 'seller-5',
    inStock: true,
    stockQuantity: 12,
    specifications: { 'Modes': '3', 'Waterproof': 'Yes', 'Battery': 'Rechargeable' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-28',
    name: 'Luxury Perfume Collection',
    image: '/placeholder.svg',
    price: 150000,
    description: 'Premium perfume collection with 3 signature scents',
    category: 'Health & Beauty',
    supplierId: 'seller-5',
    inStock: true,
    stockQuantity: 8,
    specifications: { 'Bottles': '3', 'Size': '50ml each', 'Type': 'Eau de Parfum' },
    images: ['/placeholder.svg']
  },

  // Additional products for Al-Azzani Mall (hub-3)
  {
    id: 'product-29',
    name: 'Basketball',
    image: '/placeholder.svg',
    price: 35000,
    description: 'Official size basketball for outdoor and indoor play',
    category: 'Sports & Outdoor',
    supplierId: 'hub-3',
    inStock: true,
    stockQuantity: 45,
    specifications: { 'Size': 'Official', 'Material': 'Synthetic Leather', 'Use': 'Indoor/Outdoor' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-30',
    name: 'Tennis Racket',
    image: '/placeholder.svg',
    price: 85000,
    description: 'Professional tennis racket with carbon fiber frame',
    category: 'Sports & Outdoor',
    supplierId: 'hub-3',
    inStock: true,
    stockQuantity: 20,
    specifications: { 'Weight': '300g', 'Material': 'Carbon Fiber', 'Grip Size': '4-1/4' },
    images: ['/placeholder.svg']
  },

  // Additional products for Aden Port Commercial Hub (hub-4)
  {
    id: 'product-31',
    name: 'Gaming Chair',
    image: '/placeholder.svg',
    price: 275000,
    description: 'Ergonomic gaming chair with RGB lighting and massage function',
    category: 'Electronics',
    supplierId: 'hub-4',
    inStock: true,
    stockQuantity: 12,
    specifications: { 'Material': 'PU Leather', 'RGB': 'Yes', 'Massage': 'Built-in' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-32',
    name: 'Webcam 4K',
    image: '/placeholder.svg',
    price: 125000,
    description: '4K webcam with autofocus and noise-canceling microphone',
    category: 'Electronics',
    supplierId: 'hub-4',
    inStock: true,
    stockQuantity: 25,
    specifications: { 'Resolution': '4K', 'Autofocus': 'Yes', 'Microphone': 'Built-in' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-33',
    name: 'Graphics Tablet',
    image: '/placeholder.svg',
    price: 195000,
    description: 'Professional graphics tablet with pressure-sensitive stylus',
    category: 'Electronics',
    supplierId: 'hub-4',
    inStock: true,
    stockQuantity: 15,
    specifications: { 'Pressure Levels': '8192', 'Size': '10x6 inches', 'Stylus': 'Included' },
    images: ['/placeholder.svg']
  },

  // Additional products for Ahmed Electronics (seller-1)
  {
    id: 'product-34',
    name: 'Smart Watch',
    image: '/placeholder.svg',
    price: 165000,
    description: 'Smartwatch with health monitoring and GPS tracking',
    category: 'Electronics',
    supplierId: 'seller-1',
    inStock: true,
    stockQuantity: 22,
    specifications: { 'Battery': '5 days', 'GPS': 'Yes', 'Health': 'Heart Rate, SpO2' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-35',
    name: 'Bluetooth Earbuds',
    image: '/placeholder.svg',
    price: 75000,
    description: 'True wireless earbuds with active noise cancellation',
    category: 'Electronics',
    supplierId: 'seller-1',
    inStock: true,
    stockQuantity: 38,
    specifications: { 'Battery': '6+24 hours', 'ANC': 'Yes', 'Water Resistance': 'IPX4' },
    images: ['/placeholder.svg']
  },

  // Additional products for Fatima Home Essentials (seller-2)
  {
    id: 'product-36',
    name: 'Electric Kettle',
    image: '/placeholder.svg',
    price: 65000,
    description: 'Stainless steel electric kettle with temperature control',
    category: 'Home & Garden',
    supplierId: 'seller-2',
    inStock: true,
    stockQuantity: 30,
    specifications: { 'Capacity': '1.7L', 'Material': 'Stainless Steel', 'Temperature Control': 'Yes' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-37',
    name: 'Curtain Set',
    image: '/placeholder.svg',
    price: 85000,
    description: 'Blackout curtain set with thermal insulation',
    category: 'Home & Garden',
    supplierId: 'seller-2',
    inStock: true,
    stockQuantity: 20,
    specifications: { 'Material': 'Polyester', 'Type': 'Blackout', 'Size': '150x250cm' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-38',
    name: 'Vacuum Cleaner',
    image: '/placeholder.svg',
    price: 185000,
    description: 'Cordless vacuum cleaner with multiple attachments',
    category: 'Home & Garden',
    supplierId: 'seller-2',
    inStock: true,
    stockQuantity: 15,
    specifications: { 'Type': 'Cordless', 'Battery': '45 minutes', 'Attachments': '5' },
    images: ['/placeholder.svg']
  },

  // Additional products for Mohammed Fashion Store (seller-3)
  {
    id: 'product-39',
    name: 'Women\'s Handbag',
    image: '/placeholder.svg',
    price: 95000,
    description: 'Elegant leather handbag with multiple compartments',
    category: 'Clothing',
    supplierId: 'seller-3',
    inStock: true,
    stockQuantity: 18,
    specifications: { 'Material': 'Genuine Leather', 'Compartments': '3', 'Colors': 'Black, Brown, Navy' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-40',
    name: 'Designer Sunglasses',
    image: '/placeholder.svg',
    price: 65000,
    description: 'Polarized designer sunglasses with UV protection',
    category: 'Clothing',
    supplierId: 'seller-3',
    inStock: true,
    stockQuantity: 35,
    specifications: { 'UV Protection': '100%', 'Polarized': 'Yes', 'Frame': 'Acetate' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-41',
    name: 'Winter Jacket',
    image: '/placeholder.svg',
    price: 185000,
    description: 'Waterproof winter jacket with down insulation',
    category: 'Clothing',
    supplierId: 'seller-3',
    inStock: true,
    stockQuantity: 25,
    specifications: { 'Insulation': 'Down', 'Waterproof': 'Yes', 'Sizes': 'S-XXL' },
    images: ['/placeholder.svg']
  },

  // Additional products for Khalid Auto Parts (seller-4)
  {
    id: 'product-42',
    name: 'Car Battery',
    image: '/placeholder.svg',
    price: 125000,
    description: 'Maintenance-free car battery with 3-year warranty',
    category: 'Automotive',
    supplierId: 'seller-4',
    inStock: true,
    stockQuantity: 25,
    specifications: { 'Voltage': '12V', 'Capacity': '70Ah', 'Warranty': '3 years' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-43',
    name: 'Brake Pads Set',
    image: '/placeholder.svg',
    price: 85000,
    description: 'Ceramic brake pads for superior stopping power',
    category: 'Automotive',
    supplierId: 'seller-4',
    inStock: true,
    stockQuantity: 40,
    specifications: { 'Type': 'Ceramic', 'Compatibility': 'Most Cars', 'Pieces': '4' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-44',
    name: 'Dashboard Camera',
    image: '/placeholder.svg',
    price: 155000,
    description: 'Full HD dashboard camera with night vision',
    category: 'Automotive',
    supplierId: 'seller-4',
    inStock: true,
    stockQuantity: 20,
    specifications: { 'Resolution': '1080p', 'Night Vision': 'Yes', 'Storage': '32GB' },
    images: ['/placeholder.svg']
  },

  // Additional products to reach minimum 5 per entity
  {
    id: 'product-45',
    name: 'Air Fryer 5L',
    image: '/placeholder.svg',
    price: 145000,
    description: 'Large capacity air fryer for healthy cooking',
    category: 'Home & Garden',
    supplierId: 'hub-1',
    inStock: true,
    stockQuantity: 18,
    specifications: { 'Capacity': '5L', 'Power': '1500W', 'Temperature': '80-200°C' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-46',
    name: 'Wooden Dining Table',
    image: '/placeholder.svg',
    price: 385000,
    description: 'Solid wood dining table for 6 people',
    category: 'Home & Garden',
    supplierId: 'hub-2',
    inStock: true,
    stockQuantity: 8,
    specifications: { 'Material': 'Solid Oak', 'Seats': '6', 'Size': '180x90cm' },
    images: ['/placeholder.svg']
  },
  {
    id: 'product-47',
    name: 'Car Care Kit',
    image: '/placeholder.svg',
    price: 95000,
    description: 'Complete car washing and detailing kit',
    category: 'Automotive',
    supplierId: 'seller-4',
    inStock: true,
    stockQuantity: 35,
    specifications: { 'Items': '8', 'Type': 'Wash & Detail', 'Includes': 'Wax, Cleaner, Cloths' },
    images: ['/placeholder.svg']
  }
];

export const categories = [
  'All Categories',
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Health & Beauty',
  'Sports & Outdoor',
  'Books & Media',
  'Toys & Games'
];