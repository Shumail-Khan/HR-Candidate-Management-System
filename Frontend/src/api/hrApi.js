import api from "./axiosInstance";

// Get all applications for HR dashboard (only HR’s opportunities)
export const getMyApplications = () => api.get("/hr/applications/all");

// Select applicant (accept)
export const selectApplicant = (id, hrRemarks = "") =>
  api.put(`/hr/applications/${id}/select`, { hrRemarks });

// Reject applicant
export const rejectApplicant = (id, hrRemarks = "") =>
  api.put(`/hr/applications/${id}/reject`, { hrRemarks });
