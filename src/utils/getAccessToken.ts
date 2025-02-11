// for REST API (server backend)

import axios from "axios";

export const getAccessToken = async (): Promise<string | null> => {
  // const URL = "http://localhost:5000";
  const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
  if (!SERVER_BASE_URL) {
    console.error("Missing server base URL");
    throw new Error("Missing server base URL");
  }

  try {
    const response = await axios.get(`${SERVER_BASE_URL}/api/auth/token`);
    if (response.status === 200 && response.data.access_token) {
      return response.data.access_token;
    } else {
      console.error("Failed to fetch token:", response.data);
      return null;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching token:", error.response || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};

 