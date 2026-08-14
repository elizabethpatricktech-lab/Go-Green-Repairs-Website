import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refresh");

  if (!refresh) {
    throw new Error("No refresh token available.");
  }

  const response = await API.post("/token/refresh/", {
    refresh,
  });

  const newAccessToken = response.data.access;

  localStorage.setItem("access", newAccessToken);

  return newAccessToken;
};

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

API.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return API(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

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
