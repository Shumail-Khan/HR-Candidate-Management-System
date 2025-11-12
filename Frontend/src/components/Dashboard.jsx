import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const fetchCandidates = async () => {
    try {
      const res = await axios.get(`/candidates?userId=${user.id}`);
      setCandidates(res.data);
    } catch (err) {
      console.error("Error fetching candidates:", err);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">My Candidates</h1>
        <Link
          to="/add-candidate"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          + Add Candidate
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
      >
        Logout
      </button>

      <div className="grid md:grid-cols-3 gap-4">
        {candidates.map((c) => (
          <div
            key={c.id}
            className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{c.name}</h2>
            <p className="text-gray-600">{c.position}</p>
            <p className="text-sm text-gray-500 mt-2">{c.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
