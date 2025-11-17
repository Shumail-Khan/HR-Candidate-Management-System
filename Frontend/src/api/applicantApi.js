import api from "./axiosInstance";

// Get all open opportunities
export const getOpenOpportunities = () => api.get("/applicant/opportunities");

// Apply to an opportunity
export const applyToOpportunity = (payload) => api.post("/applicant/apply", payload);

// Get all applications of the logged-in applicant
export const getMyApplications = () => api.get("/applicant/applications");

// Get logged-in applicant profile
export const getMyProfile = () => {
    return api.get("/profile/me");
};

// Create/Update applicant profile
export const upsertMyProfile = (formData) => {
    return api.post("/profile/me", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};