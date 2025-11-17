import React, { useState } from "react";
import { toast } from "react-toastify";
import { createOpportunityHR } from "../../api/opportunityApi";

const CreateOpportunityHR = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      return toast.error("Title and description are required");
    }

    try {
      setLoading(true);
      const res = await createOpportunityHR(formData);
      toast.success("Opportunity created successfully!");
      setFormData({ title: "", description: "", location: "" });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create opportunity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded mt-6">
      <h2 className="text-xl font-semibold mb-4">Create New Opportunity</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Location (optional)</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Opportunity"}
        </button>
      </form>
    </div>
  );
};

export default CreateOpportunityHR;
