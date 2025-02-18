import axios from "axios";

export const getAccessToken = async () => {
  const URL = "http://localhost:5000";
  try {
    const response = await axios.get(`${URL}/api/auth/token`);
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

 