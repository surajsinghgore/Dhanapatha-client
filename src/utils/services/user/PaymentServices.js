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
export const getWithdrawalMoney = async () => {
  try {
    const res = await axiosInstance.get(`/v1/stripe/withdraw-money`);
    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
};
export const createPaymentIntent = async (payload) => {
  try {
    const res = await axiosInstance.post(`/v1/stripe/create-payment-intent`,payload);
    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
};
export const addMoneyApi = async (payload) => {
  try {
    const res = await axiosInstance.post(`/v1/stripe/add-money`,payload);
    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
};




export const BankAccountApi = async (payload) => {
  try {
    const res = await axiosInstance.post(`/v1/account/add-account-number`,payload);
    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
};
export const UpdateBankAccountApi = async (payload) => {
  try {
    const res = await axiosInstance.patch(`/v1/account/update-account-number`,payload);
    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
};
export const getBankAccountApi = async () => {
  try {
    const res = await axiosInstance.get(`/v1/account/get-bank`);
    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
};
