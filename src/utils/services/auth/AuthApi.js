import axiosInstance from "../AxiosInstance";
import { toast } from "react-toastify";

export const registrationUserApi = async (payload) => {
  try {
    const res = await axiosInstance.post("/v1/user/register", payload);
    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
};
export const loginUserApi = async (payload) => {
  try {
    const res = await axiosInstance.post("/v1/user/login", payload);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
