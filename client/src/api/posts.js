import { API } from "../config";
import axios from "axios";
import { isAuthenticated } from "../auth/index";

const token = isAuthenticated().token;

// console.log(userId);

export const authAxios = axios.create({
  baseURL: API,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const createTicket = async (p) => {
  const post = {
    userId: isAuthenticated()._id,
    title: p.title,
    description: p.description,
  };
  const result = await authAxios.post(`/posts/create`, post);
  console.log(result);
  return result;
};

export const createComment = async ({ text, id }) => {
  const comment = {
    userId: isAuthenticated()._id,
    comment: text,
  };
  const result = await authAxios.post(`/comments/create/${id}`, comment);
  return result;
};

export const getCommentsForPost = async (id) => {
  const result = await authAxios.get(`/comments/getComments/${id}`);
  return result;
};

export const getPosts = async () => {
  const result = await authAxios.get(`/posts/getposts`);
  return result;
};

export const getAllPostsForUserId = async (id) => {
  const result = await authAxios.get(`/posts/${id}`);
  return result;
};

// export const deleteUser = async (users) => {
//   const result = await authAxios.delete(`/users/${users.id}`);
//   console.log(result);
//   return result;
// };

export const getPostById = async (post) => {
  const result = await authAxios.get(`/posts/${post.id}`);
  return result;
};

export const updateStatus = async (post) => {
  const result = await authAxios.put(`/posts/status`, post);
  return result;
};
