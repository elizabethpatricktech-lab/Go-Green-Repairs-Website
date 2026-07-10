import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const register = (userData: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) => {
  return API.post("/register/", userData);
};

export const login = (credentials: { username: string; password: string }) => {
  return API.post("/token/", credentials);
};
