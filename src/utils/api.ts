import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Use the backend URL from environment variables
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchCourses = async () => {
  try {
    const response = await apiClient.get("/courses");
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const fetchUniversities = async () => {
  const response = await apiClient.get("/universities");
  return response.data;
};
