import React, { useState } from "react";
import axios from "../services/api";
import localforage from "localforage";
import { useNavigate } from "react-router-dom";

const CandidateForm = () => {
  const [formData, setFormData] = useState({ name: "", position: "", status: "" });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const candidate = { ...formData, userId: user.id };

    try {
      await axios.post("/candidates", candidate);
      navigate("/dashboard");
    } catch {
      // Offline fallback
      await localforage.setItem(`offline-${Date.now()}`, candidate);
      alert("No network. Candidate saved locally.");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Add Candidate</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 rounded-md"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Position"
            className="w-full border p-2 rounded-md"
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            required
          />
          <select
            className="w-full border p-2 rounded-md"
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            required
          >
            <option value="">Select Status</option>
            <option value="Interviewed">Interviewed</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
          >
            Save Candidate
          </button>
        </form>
      </div>
    </div>
  );
};

export default CandidateForm;
