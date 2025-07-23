export interface Region {
  id: string;
  nameEn: string;
  nameAr: string;
}

export interface Supplier {
  id: string;
  name: string;
  logo?: string;
  region: string;
  rating: number;
  totalProducts: number;
  shippingZones: string[];
  verified: boolean;
  type: 'hub' | 'independent';
  description: string;
  joinedDate: string;
  entityType: 'retailSeller' | 'shoppingCenter' | 'commercialMall' | 'supermarket';
}

export interface SupplierHub extends Supplier {
  type: 'hub';
  stores: Store[];
}

export interface IndependentSeller extends Supplier {
  type: 'independent';
  externalShopUrl?: string;
}

export interface Store {
  id: string;
  name: string;
  logo?: string;
  productCount: number;
  category: string;
  rating: number;
  supplierId: string;
}

export interface FlowShipProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  supplierId: string;
  storeId?: string;
  inStock: boolean;
  stockQuantity: number;
  specifications: Record<string, string>;
  images: string[];
}

export interface ImportItem {
  productId: string;
  quantity: number;
  importPrice: number;
}

export interface FilterOptions {
  region?: string;
  supplierType?: 'hub' | 'independent';
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  inStockOnly?: boolean;
}