export interface Category {
  id: string;
  key: string;
  name: string;  // Now a string type for the localized name
}

export interface CategoriesResponse {
  categories: {
    total: number;
    results: Category[];
  };
}

export interface Product {
  id: string;
  key: string;
  name: string;
  description?: string;
  masterVariant: {
    prices: {
      value: {
        currencyCode: string;
        centAmount: number;
      };
    }[];
    images: {
      url: string;
    }[];
  };
}

export interface ProductsByCategoryResponse {
  productProjectionSearch: {
    offset: number;
    total: number;
    count: number;
    results: Product[];
  };
}
