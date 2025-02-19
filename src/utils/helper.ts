import { Product, SearchProduct } from "@/graphQL/queries/types";

export const displayData = (data: { [key: string]: string } | string) => {
  if (typeof data === "string") {
    return data;
  }
  return data["en-US"];
};

export const imageUrlArray = (data: Product | SearchProduct) => {
  if ("variants" in data) {
    return data.variants[0].images;
  }
  return data.masterVariant.images.map((image) => image.url);
};

export const currencyFormatter = (data: number, currencyCode: string) => {
  return data.toLocaleString("en-US", {
    style: "currency",
    currency: currencyCode,
  });
};

export const priceFormatter = (data: Product | SearchProduct) => {
  if ("variants" in data) {
    return {
      centAmount: data.variants[0]?.prices.EUR.max,
      currencyCode: "EUR",
    };
  }
  return {
    centAmount: data.masterVariant?.prices[0].value.centAmount,
    currencyCode: data.masterVariant?.prices[0].value.currencyCode,
  };
};
