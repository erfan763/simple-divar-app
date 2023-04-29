import { get, post } from "./index";

export type IUserType = {
  id: number;
  email: string;
  username: string;
};
export const login = (data: { email: string; password: string }) => {
  return post(`/login`, data);
};
export const register = (data: { email: string; password: string; username: string }) => {
  return post(`/register`, data);
};
export const getMe = (data: { id: number }) => {
  return get(`/600/users/${data.id}`);
};
