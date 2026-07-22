export const getProfile = async () => {
  const token = localStorage.getItem("access");

  const response = await fetch("http://127.0.0.1:8000/api/profile/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Unable to fetch profile.");
  }

  return response.json();
};

export const updateProfile = async (profileData: any) => {
  const token = localStorage.getItem("access");

  const response = await fetch("http://127.0.0.1:8000/api/profile/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile.");
  }

  return response.json();
};
