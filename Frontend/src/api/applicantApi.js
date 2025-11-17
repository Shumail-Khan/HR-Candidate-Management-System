import api from "./axiosInstance";
import { enqueue } from "../utils/offlineQueue";

// GET requests (leave as is)
export const getOpenOpportunities = () => api.get("/applicant/opportunities");
export const getMyApplications = () => api.get("/applicant/applications");
export const getMyProfile = () => api.get("/profile/me");

// Mutating requests → wrap for offline
export const applyToOpportunity = async (payload) => {
  try {
    return await api.post("/applicant/apply", payload);
  } catch (err) {
    if (!err.response) { // network error
      await enqueue("create", "applyToOpportunity", [payload]);
    }
    throw err;
  }
};

export const upsertMyProfile = async (formData) => {
  try {
    return await api.post("/profile/me", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (err) {
    if (!err.response) await enqueue("update", "upsertMyProfile", [formData]);
    throw err;
  }
};
