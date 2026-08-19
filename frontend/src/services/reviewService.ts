import { API } from "./authService";

export const createReview = async (reviewData: {
  service: number;
  rating: number;
  comment: string;
}) => {
  const response = await API.post("/reviews/", reviewData);

  return response.data;
};
