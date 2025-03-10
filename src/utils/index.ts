import axios from "axios";
import { getAccessToken } from "./getAccessToken";

export const getSearchResults = async (query: string) => {
  const token = await getAccessToken();
  if (!token) throw new Error("Failed to fetch token");
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }api/search?query=${query}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.hits;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};