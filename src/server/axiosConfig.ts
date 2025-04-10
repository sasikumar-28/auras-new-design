import axios from "axios";
import { getAccessToken } from "@/utils/getAccessToken";

export const getAxiosInstance = async () => {
  const token = await getAccessToken();


  return axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
