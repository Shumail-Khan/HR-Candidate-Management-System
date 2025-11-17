import { useEffect, useState } from "react";
import { getMyApplications, selectApplicant, rejectApplicant } from "../../api/hrApi";
import { toast } from "react-toastify";

const HRApplications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadApplications = async () => {
    try {
      const res = await getMyApplications();
      console.log("Applications fetched:", res.data);
      setApps(res.data.applications || []); // ✅ use applications array
    } catch (err) {
      toast.error("Failed to load applications");
      setApps([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleSelect = async (id) => {
    try {
      await selectApplicant(id);
      toast.success("Applicant selected");
      loadApplications();
    } catch (err) {
      toast.error("Failed to select applicant");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectApplicant(id);
      toast.success("Applicant rejected");
      loadApplications();
    } catch (err) {
      toast.error("Failed to reject applicant");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Applications</h2>
      {loading ? (
        <p>Loading applications...</p>
      ) : apps.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <div className="space-y-4">
          {apps.map((app) => (
            <div
              key={app.id}
              className="bg-white p-4 rounded shadow flex justify-between items-start"
            >
              <div className="space-y-1">
                <p>
                  <strong>Applicant:</strong>{" "}
                  {app.applicant?.ApplicantProfile?.fullName || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {app.applicant?.email || "N/A"}
                </p>
                <p>
                  <strong>Opportunity:</strong> {app.opportunity?.title || "N/A"}
                </p>
                <p>
                  <strong>Status:</strong> {app.status}
                </p>

                {app.applicant?.ApplicantProfile?.cvFile && (
                  <div className="mt-2">
                    <strong>CV:</strong>
                    <iframe
                      src={`${import.meta.env.VITE_API_BASE_URL}${encodeURI(
                        app.applicant.ApplicantProfile.cvFile
                      )}`}
                      title="Applicant CV"
                      className="w-full h-64 border rounded mt-1"
                    />
                  </div>
                )}
              </div>

              <div className="space-x-2">
                {app.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleSelect(app.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Select
                    </button>
                    <button
                      onClick={() => handleReject(app.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HRApplications;
