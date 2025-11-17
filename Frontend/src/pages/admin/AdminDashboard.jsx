import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Link to="/admin/create-opportunity" className="bg-blue-600 text-white px-4 py-2 rounded">Create Opportunity</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/admin/create-opportunity" className="p-4 bg-white rounded shadow hover:shadow-lg">
          Create Opportunities
        </Link>
        <Link to="/admin/opportunities" className="p-4 bg-white rounded shadow hover:shadow-lg">
          View Opportunities
        </Link>
        <Link to="/admin/add-hr" className="p-4 bg-white rounded shadow hover:shadow-lg">
          Add HR
        </Link>
        <Link to="/admin/manage-hr" className="p-4 bg-white rounded shadow hover:shadow-lg">
          Manage HR Managers
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
