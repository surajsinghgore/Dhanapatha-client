import axios from "axios";
import { getLocalStorage } from "../LocalStorage";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: `https://dhanapathabackend.surajsingh.online/api`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getLocalStorage("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401 && error.response.data.error === "Token has expired") {
      toast.error("Token Expired Please Login again");
      setTimeout(() => {
        localStorage.clear();
        window.location.href = "/auth/login";
      }, 2000);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
