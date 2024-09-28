import axiosInstance from "../AxiosInstance";
import { toast } from "react-toastify";

export const refundApi = async (payload) => {
  try {
    const res = await axiosInstance.post("/v1/refund/refund-money", payload);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
export const historyApi = async () => {
  try {
    const res = await axiosInstance.get("/v1/refund/history");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
