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
