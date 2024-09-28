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