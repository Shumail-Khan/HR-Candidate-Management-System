import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import localforage from "localforage";
import { getOpenOpportunities, applyToOpportunity } from "../../api/applicantApi";

const ApplyToOpportunity = () => {
  const [ops, setOps] = useState([]);
  const [selected, setSelected] = useState("");

  const load = async () => {
    try {
      const res = await getOpenOpportunities();
      setOps(res.data);
    } catch (err) {
      toast.error("Failed to load opportunities");
    }
  };

  useEffect(() => { load(); }, []);

  const apply = async () => {
    if (!selected) return toast.error("Select opportunity");

    const payload = { opportunityId: selected };

    try {
      await applyToOpportunity(payload);
      toast.success("Applied successfully!");
      setSelected(""); // reset selection
    } catch (err) {
      // offline fallback
      await localforage.setItem(`offline-apply-${Date.now()}`, payload);
      toast.info("Offline: saved application locally. It will sync when online.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Apply to Opportunity</h2>
      <div className="bg-white p-4 rounded shadow space-y-3">
        <select
          className="w-full border p-2 rounded"
          value={selected}
          onChange={e => setSelected(e.target.value)}
        >
          <option value="">Select opportunity</option>
          {ops.map(o => <option key={o.id} value={o.id}>{o.title}</option>)}
        </select>
        <button
          onClick={apply}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default ApplyToOpportunity;
