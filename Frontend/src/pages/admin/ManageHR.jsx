import React, { useEffect, useState } from "react";
import { getAllHR, deleteHR } from "../../api/adminApi";
import { toast } from "react-toastify";

export default function ManageHR() {
  const [hrList, setHrList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all HR
  const loadHR = async () => {
    try {
      const res = await getAllHR();
      setHrList(res.data.hr || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load HR list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHR();
  }, []);

  // Soft Delete HR
  const handleSoftDelete = async (id) => {
    if (!window.confirm("Deactivate this HR? They will not be able to log in.")) return;

    try {
      await deleteHR(id); // default = soft delete
      toast.success("HR deactivated successfully");
      loadHR();
    } catch (err) {
      console.error(err);
      toast.error("Failed to deactivate HR");
    }
  };

  // Hard Delete HR
  const handleHardDelete = async (id) => {
    if (!window.confirm("Permanently delete? This action cannot be undone!")) return;

    try {
      await deleteHR(`${id}?hard=true`);
      toast.success("HR permanently deleted");
      loadHR();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete HR");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading HR list...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage HR</h1>

      {hrList.length === 0 ? (
        <p className="text-gray-500">No HR Managers found.</p>
      ) : (
        <div className="overflow-x-auto shadow border rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">ID</th>
                <th className="p-3">Email</th>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Active</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {hrList.map((hr) => (
                <tr key={hr.id} className="border-t">
                  <td className="p-3">{hr.id}</td>
                  <td className="p-3">{hr.email}</td>
                  <td className="p-3">{hr.fullName || "-"}</td>
                  <td className="p-3">{hr.phone || "-"}</td>
                  <td className="p-3">
                    {hr.isActive ? (
                      <span className="text-green-600 font-medium">Active</span>
                    ) : (
                      <span className="text-red-600 font-medium">Inactive</span>
                    )}
                  </td>

                  <td className="p-3 flex gap-2">
                    {/* Soft Delete */}
                    {hr.isActive && (
                      <button
                        onClick={() => handleSoftDelete(hr.id)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Deactivate
                      </button>
                    )}

                    {/* Hard Delete */}
                    <button
                      onClick={() => handleHardDelete(hr.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}
