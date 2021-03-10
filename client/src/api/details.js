import { API } from "../config";
import axios from "axios";
import { isAuthenticated } from "../auth/index";

const token = isAuthenticated().token;

export const authAxios = axios.create({
  baseURL: API,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const createTicket = async (d) => {
  const details = {
    title: d.title,
    text: d.text,
    phoneNumber: d.phoneNumber,
    fax: d.fax,
    email: d.email,
    address: d.address,
    ourServices: d.ourServices,
    alert: d.alert,
  };
  const result = await authAxios.post(`/details/create`, details);
  console.log(result);
  return result;
};

export const getDetails = async () => {
  const result = await authAxios.get(`/details/get`);
  return result;
};

export const updateStatus = async (post) => {
  const result = await authAxios.put(`/posts/status`, post);
  return result;
};
