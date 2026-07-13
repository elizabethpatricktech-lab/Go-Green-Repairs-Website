const API_URL = "http://127.0.0.1:8000/api/services/";

export const getServices = async () => {
  const token = localStorage.getItem("access");

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }

  return response.json();
};

export const createService = async (serviceData: {
  service_type: string;
  description: string;
  requested_date: string;
}) => {
  const token = localStorage.getItem("access");

  const response = await fetch(`${API_URL}create/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serviceData),
  });

  if (!response.ok) {
    console.log(await response.json());
    throw new Error("Failed to create service request");
  }

  return response.json();
};
