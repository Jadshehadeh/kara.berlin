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

export const getUsers = async () => {
  const result = await authAxios.get(`/users/getusers`);
  return result;
};

export const deleteUser = async (users) => {
  const result = await authAxios.delete(`/users/${users.id}`);
  return result;
};

export const getUserById = async (id) => {
  const result = await authAxios.get(`/users/user/${id}`);
  return result;
};

export const updateUser = async (users) => {
  const result = await authAxios.put(`/users/${users.id}`, users);
  return result;
};
