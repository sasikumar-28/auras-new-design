import { Product, SearchProduct } from "@/graphQL/queries/types";
import CryptoJS from "crypto-js";
const SECRET_KEY = "admin_one";
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

export const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const initialCapital = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
