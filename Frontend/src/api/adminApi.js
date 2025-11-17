import api from "./axiosInstance";
import { enqueue } from "../utils/offlineQueue";

// --------------------
// GET requests (unchanged)
// --------------------
export const getAllHR = () => api.get("/admin/get-hr");

// --------------------
// POST/DELETE requests → offline support
// --------------------
export const addHR = async (payload) => {
  try {
    return await api.post("/admin/add-hr", payload);
  } catch (err) {
    // Network error → queue for later
    if (!err.response) {
      await enqueue("create", "addHR", [payload]);
    }
    throw err;
  }
};

export const deleteHR = async (id) => {
  try {
    return await api.delete(`/admin/remove-hr/${id}`);
  } catch (err) {
    if (!err.response) {
      await enqueue("delete", "deleteHR", [id]);
    }
    throw err;
  }
};
