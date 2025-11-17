import React from "react";
import { Link } from "react-router-dom";

const HRDashboard = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">HR Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/hr/create-opportunity" className="bg-blue-600 text-white p-4 rounded shadow hover:shadow-lg">Create Opportunity</Link>
        <Link to="/hr/opportunities" className="bg-blue-600 text-white p-4 rounded shadow hover:shadow-lg">My Opportunities</Link>
        <Link to="/hr/applications" className="bg-blue-600 text-white p-4 rounded shadow hover:shadow-lg">Applications</Link>
      </div>
    </div>
  );
};

export default HRDashboard;
