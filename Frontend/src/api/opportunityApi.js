import api from "./axiosInstance";

export const createOpportunityAdmin = (data) => api.post("/admin/opportunity", data);
export const listOpportunitiesAdmin = () => api.get("/admin/opportunities");

export const createOpportunityHR = (data) => api.post("/hr/opportunity", data);
export const listOpportunitiesHR = () => api.get("/hr/opportunities");

export const deleteOpportunityAdmin = (id) => api.delete(`/admin/opportunity/${id}`);
