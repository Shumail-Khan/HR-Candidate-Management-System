import api from "./axiosInstance";

export const addHR = (payload) => api.post("/admin/add-hr", payload);
export const deleteHR = (id) => api.delete(`/admin/remove-hr/${id}`);
export const getAllHR = () => api.get("/admin/get-hr");