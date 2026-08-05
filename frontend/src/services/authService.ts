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

export const forgotPassword = async (email: string) => {
  const response = await API.post("/forgot-password/", { email });

  return response.data;
};

export const resetPassword = async (
  uid: string,
  token: string,
  password: string,
) => {
  const response = await API.post("/reset-password/", {
    uid,
    token,
    password,
  });

  return response.data;
};

export const verifyEmail = async (uid: string, token: string) => {
  const response = await API.post("/verify-email/", {
    uid,
    token,
  });

  return response.data;
};

export const resendVerification = async () => {
  const token = localStorage.getItem("access");

  const response = await API.post(
    "/resend-verification/",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
