import React, { useEffect, useState } from "react";
import { listOpportunitiesAdmin, deleteOpportunityAdmin } from "../../api/opportunityApi";
import { toast } from "react-toastify";

const AdminOpportunities = () => {
  const [ops, setOps] = useState([]);

  const load = async () => {
    try {
      const res = await listOpportunitiesAdmin();
      setOps(res.data);
    } catch (err) { toast.error("Load failed"); }
  };

  useEffect(()=>{ load(); }, []);

  const remove = async (id) => {
    if (!confirm("Soft delete this opportunity?")) return;
    try {
      await deleteOpportunityAdmin(id);
      toast.success("Deleted");
      load();
    } catch { toast.error("Delete failed"); }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">All Opportunities</h2>
      <div className="space-y-3">
        {ops.map(o=>(
          <div key={o.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{o.title}</h3>
                <p className="text-sm text-gray-600">{o.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={()=>remove(o.id)} className="bg-red-600 text-white px-3 py-1 rounded text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOpportunities;
