import axiosInstance from "../AxiosInstance";
import { toast } from "react-toastify";

export const transferMoney = async (payload) => {
  try {
    const res = await axiosInstance.post("/v1/account/transfer-money", payload);
    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
};

export const findReceiverTransaction = async (email) => {
  try {
    const res = await axiosInstance.get(`/v1/account/fetch-transaction-receiver?email=${email}`);
    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
};


export const withdrawalMoney = async (payload) => {
  try {
    const res = await axiosInstance.post(`/v1/stripe/withdraw-money`,payload);
    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
};
