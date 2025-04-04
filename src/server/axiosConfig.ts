import axios from "axios";

import { getAccessToken } from "@/utils/getAccessToken";

const token = getAccessToken();

const AxiosApi = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default AxiosApi;
