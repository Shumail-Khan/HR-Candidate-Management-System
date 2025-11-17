import api from "./axiosInstance";
import { enqueue } from "../utils/offlineQueue";

// GET requests → leave as is
export const getMyApplications = () => api.get("/hr/applications/all");

// Mutating requests → wrap for offline
export const selectApplicant = async (id, hrRemarks = "") => {
  try {
    return await api.put(`/hr/applications/${id}/select`, { hrRemarks });
  } catch (err) {
    if (!err.response) { // network error
      await enqueue("update", "selectApplicant", [id, hrRemarks]);
    }
    throw err;
  }
};

export const rejectApplicant = async (id, hrRemarks = "") => {
  try {
    return await api.put(`/hr/applications/${id}/reject`, { hrRemarks });
  } catch (err) {
    if (!err.response) {
      await enqueue("update", "rejectApplicant", [id, hrRemarks]);
    }
    throw err;
  }
};
