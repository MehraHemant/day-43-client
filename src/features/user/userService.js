import axios from "axios";
import { base_url } from "../utils";

const create_user = async (userData) => {
  const response = await axios.post(`${base_url}/user/create_user`, userData);
  return response.data;
};

const reset_link = async (userData) => {
  const response = await axios.post(`${base_url}/user/forget_password`, userData);
  return response.data;
}

const reset_password = async (userData) => {
  const response = await axios.post(`${base_url}/user/reset_password/${userData.id}`, {password: userData.password});
  return response.data;
}

const login = async (userData) => {
  const response = await axios.post(`${base_url}/user/login`, userData);
  return response.data;
}

const userService = { create_user, reset_link, reset_password, login };
export default userService;
