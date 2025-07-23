export interface Product {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
  storeName: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DiscoveredProduct extends Product {
  status: 'draft';
  source: 'camera' | 'gallery';
}

export interface InventoryProduct extends Product {
  status: 'published' | 'out_of_stock';
  stockQuantity: number;
}

export type ProductStatus = 'draft' | 'published' | 'out_of_stock';

export type ProductType = DiscoveredProduct | InventoryProduct;

export interface ProductFilters {
  search: string;
  sortBy: 'date_desc' | 'date_asc' | 'stock_desc' | 'stock_asc';
  category?: string;
  status?: ProductStatus;
}

export type ViewMode = 'grid' | 'list';