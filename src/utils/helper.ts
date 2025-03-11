/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product, SearchProduct } from "@/graphQL/queries/types";
import CryptoJS from "crypto-js";
const SECRET_KEY = "admin_one";

export const displayData = (data: { [key: string]: string } | string) => {
  if (typeof data === "string") {
    return String(data);
  }
  return String(data["en-US"] || data);
};

export const imageUrlArray = (data: Product | SearchProduct | any) => {
  if (data?.image) {
    return [data.image];
  } else if ("variants" in data) {
    return data.variants[0].images;
  }
  return data.masterVariant.images.map((image: any) => image.url);
};

export const currencyFormatter = (data: number, currencyCode?: string) => {
  return data.toLocaleString("en-US", {
    style: "currency",
    currency: currencyCode || "USD",
  });
};

export const priceFormatter = (data: Product | SearchProduct) => {
  if ("variants" in data) {
    return {
      centAmount: data.variants[0]?.prices.EUR.max,
      currencyCode: "DOL",
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

export const laterDate = (day: number) => {
  const fiveDaysLater = new Date();
  fiveDaysLater.setDate(fiveDaysLater.getDate() + day);

  const formattedDate = fiveDaysLater.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });
  return formattedDate;
};

export const stringReducer = (text: string, length: number) => {
  return text.length < length ? text : text.slice(0, length) + "...";
};

export const formatStringToHtml = (str: string) => {
  return str
    .split("\\n")
    .map((line, index) => {
      const numberedPoint = line.match(/^(\d+)\.\s(.+)/);
      if (numberedPoint) {
        return `<p key=${index} class="mb-2"><strong>${numberedPoint[1]}.</strong> ${numberedPoint[2]}</p>`;
      }
      return line.trim() ? `<p key=${index} class="mb-2">${line}</p>` : "<br/>";
    })
    .join("");
};
