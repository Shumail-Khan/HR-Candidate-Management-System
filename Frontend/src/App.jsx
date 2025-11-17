import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SyncHandler from "./components/SyncHandler";
import Header from "./components/Header";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateOpportunity from "./pages/admin/CreateOpportunity";
import AdminOpportunities from "./pages/admin/AdminOpportunities";

import HRDashboard from "./pages/hr/HRDashboard";
import MyOpportunities from "./pages/hr/MyOpportunities";

import ApplicantDashboard from "./pages/applicant/ApplicantDashboard";
import ApplyToOpportunity from "./pages/applicant/ApplyToOpportunity";

import RoleRoute from "./components/RoleRoute";
import AddHR from "./pages/admin/AddHR";
import ManageHR from "./pages/admin/ManageHR";
import CreateOpportunityHR from "./pages/hr/CreateOpportunityHR";
import ApplicantApplications from "./pages/applicant/ApplicantApplications";
import HRApplications from "./pages/hr/HRApplications";
import ViewApplicantProfile from "./pages/applicant/ViewApplicantProfile";
import ApplicantProfileForm from "./pages/applicant/ApplicantProfileForm";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <SyncHandler />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/admin" element={<RoleRoute roles={["admin"]}><AdminDashboard /></RoleRoute>} />
          <Route path="/admin/add-hr" element={<AddHR />} />
          <Route path="/admin/create-opportunity" element={<RoleRoute roles={["admin"]}><CreateOpportunity /></RoleRoute>} />
          <Route path="/admin/opportunities" element={<RoleRoute roles={["admin"]}><AdminOpportunities /></RoleRoute>} />
          <Route path="/admin/manage-hr" element={<RoleRoute roles={["admin"]}><ManageHR /></RoleRoute>} />

          <Route path="/hr" element={<RoleRoute roles={["hr"]}><HRDashboard /></RoleRoute>} />
          <Route path="/hr/create-opportunity" element={<RoleRoute roles={["hr"]}><CreateOpportunityHR /></RoleRoute>} />
          <Route path="/hr/opportunities" element={<RoleRoute roles={["hr"]}><MyOpportunities /></RoleRoute>} />
          <Route path="/hr/applications" element={<RoleRoute roles={["hr"]}><HRApplications /></RoleRoute>} />

          <Route path="/applicant" element={<RoleRoute roles={["applicant"]}><ApplicantDashboard /></RoleRoute>} />
          <Route path="/applicant/opportunities" element={<RoleRoute roles={["applicant"]}><ApplyToOpportunity /></RoleRoute>} />
          <Route path="/applicant/applications" element={<RoleRoute roles={["applicant"]}><ApplicantApplications /></RoleRoute>} />
          <Route path="/applicant/profile" element={<RoleRoute roles={["applicant"]}><ApplicantProfileForm /></RoleRoute>} />
          <Route path="/applicant/profile/view" element={<RoleRoute roles={["applicant"]}><ViewApplicantProfile /></RoleRoute>} />

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
