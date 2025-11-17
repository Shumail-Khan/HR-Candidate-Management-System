import React, { useState, useContext } from "react";
import { createOpportunityAdmin } from "../../api/opportunityApi";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateOpportunity = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hrId, setHrId] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      await createOpportunityAdmin({ title, description, hrId });
      toast.success("Opportunity created");
      navigate("/admin/opportunities");
    } catch (err) {
      toast.error(err.response?.data?.message || "Create failed");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create Opportunity (Admin)</h2>
      <form onSubmit={handle} className="bg-white p-6 rounded shadow space-y-3">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full border p-2 rounded" required />
        <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="w-full border p-2 rounded" rows={6} />
        <input value={hrId} onChange={e=>setHrId(e.target.value)} placeholder="Assign to HR (hrId)" className="w-full border p-2 rounded" />
        <div className="flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateOpportunity;
