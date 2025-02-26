export interface Category {
  id: string;
  key: string;
  name: string; // Now a string type for the localized name
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
  quantity?: number;
  masterVariant: {
    prices: {
      value: {
        currencyCode: string;
        centAmount: number;
      };
    }[];
    images: Image[];
  };
}

export interface Image {
  url: string;
}

export interface ProductsByCategoryResponse {
  productProjectionSearch: {
    offset: number;
    total: number;
    count: number;
    results: Product[];
  };
}
export interface LocalizedString {
  "de-DE": string;
  "en-GB": string;
  "en-US": string;
}

export interface CategoryHierarchy {
  lvl0: string[];
  lvl1: string[];
  lvl2: string[];
}

export interface CategoryKeys {
  "de-DE": string[];
  "en-GB": string[];
  "en-US": string[];
}

export interface Variant {
  id: string;
  key: string;
  sku: string;
  attributes: {
    color: LocalizedString;
    finish?: LocalizedString;
  };
  searchableAttributes: {
    color: LocalizedString;
  };
  images: string[];
  prices: {
    [currency: string]: {
      min: number;
      max: number;
      priceValues: {
        id: string;
        value: number;
      }[];
    };
  };
  isInStock: boolean;
  inventory: {
    [channel: string]: number;
  };
}

export interface SearchProduct {
  productType: string;
  name: LocalizedString;
  description: LocalizedString;
  key: string;
  slug: LocalizedString;
  categories: {
    "de-DE": CategoryHierarchy;
    "en-GB": CategoryHierarchy;
    "en-US": CategoryHierarchy;
  };
  categoryKeys: CategoryKeys;
  attributes?: {
    productspec: LocalizedString;
  };
  createdAt: string;
  masterVariantID: string;
  categoryPageId: string[];
  variantIDs: string[];
  _tags: string[];
  variants: Variant[];
  objectID: string;
}

export type UpdatePaymentType = {
  id: string;
  version: number;
  transactionId: string;
  fields: Field[];
};

export type Field = {
  name: string;
  value: string;
};

export type Cart = {
  id: string;
  typeId: string;
};

export type Address = {
  key: string;
  id: string;
  firstName: string;
  lastName: string;
  streetName: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
};

export type AddItemShippingAddressAction = {
  addItemShippingAddress: {
    address: Address;
  };
};

export type Action = AddItemShippingAddressAction;

export type AddressInputData = {
  version: number;
  id: string;
  actions: Action[];
};
