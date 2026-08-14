import { API } from "./authService";

export const getServices = async () => {
  const response = await API.get("/services/");

  return response.data;
};

export const createService = async (serviceData: {
  service_type: string;
  description: string;
  requested_date: string;
  requested_time_window: string;
}) => {
  const response = await API.post("/services/create/", serviceData);

  return response.data;
};

export const getService = async (id: number) => {
  const response = await API.get(`/services/${id}/`);

  return response.data;
};
