import React, { useEffect, useState } from "react";
import { listOpportunitiesHR } from "../../api/opportunityApi";
import { toast } from "react-toastify";

const MyOpportunities = () => {
  const [ops, setOps] = useState([]);

  const load = async () => {
    try {
      const res = await listOpportunitiesHR();
      setOps(res.data);
    } catch (err) { toast.error("Load failed"); }
  };

  useEffect(()=>{ load(); }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">My Opportunities</h2>
      <div className="space-y-3">
        {ops.map(o => (
          <div key={o.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{o.title}</h3>
            <p className="text-sm text-gray-600">{o.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOpportunities;
