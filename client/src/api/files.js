import { API } from "../config";
import axios from "axios";
import { isAuthenticated } from "../auth/index";

const token = isAuthenticated().token;

export const authAxios = axios.create({
  baseURL: API,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const createFile = async ({ formData, text, id }) => {
  const result = await authAxios.post(`/files/upload`, formData);

  if (result.status === "200") {
    const comment = {
      userId: isAuthenticated()._id,
      comment: text,
    };
    const res = authAxios.post(`/comments/create/${id}`, comment);
    console.log(res);
  }
};
