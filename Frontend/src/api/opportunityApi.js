import api from "./axiosInstance";
import { enqueue } from "../utils/offlineQueue";

// GET requests → leave as is
export const listOpportunitiesAdmin = () => api.get("/admin/opportunities");
export const listOpportunitiesHR = () => api.get("/hr/opportunities");

// Mutating requests → wrap for offline
export const createOpportunityAdmin = async (data) => {
  try {
    return await api.post("/admin/opportunity", data);
  } catch (err) {
    if (!err.response) {
      await enqueue("create", "opportunityAdmin", [data]);
    }
    throw err;
  }
};

export const createOpportunityHR = async (data) => {
  try {
    return await api.post("/hr/opportunity", data);
  } catch (err) {
    if (!err.response) {
      await enqueue("create", "opportunityHR", [data]);
    }
    throw err;
  }
};

export const deleteOpportunityAdmin = async (id) => {
  try {
    return await api.delete(`/admin/opportunity/${id}`);
  } catch (err) {
    if (!err.response) {
      await enqueue("delete", "deleteOpportunityAdmin", [id]);
    }
    throw err;
  }
};
