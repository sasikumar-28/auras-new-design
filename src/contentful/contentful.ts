import axios from "axios";

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
const ENVIRONMENT = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT;

if (!SPACE_ID || !ACCESS_TOKEN || !ENVIRONMENT) {
  console.error("Missing contentful credentials");
  throw new Error("Missing contentful credentials");
}

export const contentfulAPI = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries`,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});
