import axiosInstance from "../AxiosInstance";
import { toast } from "react-toastify";


export const findUserByUsernameAndEmail = async (searchtext) => {
  try {
    const res = await axiosInstance.get(`/v1/user/search-user?searchterm=${searchtext}`);
    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
};
export const recentUsers = async () => {
  try {
    const res = await axiosInstance.get(`/v1/account/recent`);
    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
};
export const getTransaction = async () => {
  try {
    const res = await axiosInstance.get(`/v1/account/get-transaction`);
    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
};
export const getBalance = async () => {
  try {
    const res = await axiosInstance.get(`/v1/account/fetch-account-balance`);
    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
};
export const changePasswordApi = async (payload) => {
  try {
    const res = await axiosInstance.patch(`/v1/user/change-password`,payload);
    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
};