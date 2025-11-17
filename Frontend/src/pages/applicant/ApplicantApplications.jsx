import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMyApplications } from "../../api/applicantApi";

const ApplicantApplications = () => {
  const [applications, setApplications] = useState([]);

  const loadApplications = async () => {
    try {
      const res = await getMyApplications();
      setApplications(res.data);
    } catch (err) {
      toast.error("Failed to load your applications");
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Applications</h2>

      {applications.length === 0 ? (
        <p className="bg-white p-4 rounded shadow">You have not applied to any opportunities yet.</p>
      ) : (
        <div className="bg-white p-4 rounded shadow space-y-4">
          {applications.map(app => (
            <div key={app.id} className="flex justify-between items-center border-b py-2">
              <div>
                <p className="font-semibold">{app.opportunity?.title || "Unknown Opportunity"}</p>
                <p className="text-sm text-gray-600">{app.opportunity?.description}</p>
              </div>
              <div>
                <span
                  className={`px-3 py-1 rounded text-white ${
                    app.status === "pending" ? "bg-yellow-500" :
                    app.status === "reviewing" ? "bg-blue-500" :
                    app.status === "selected" ? "bg-green-600" :
                    "bg-red-500"
                  }`}
                >
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicantApplications;
