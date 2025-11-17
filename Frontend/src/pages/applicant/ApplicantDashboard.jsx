import { Link } from "react-router-dom";

const ApplicantDashboard = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Applicant Dashboard</h1>
        <Link
          to="/applicant/opportunities"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Browse Opportunities
        </Link>
      </div>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Link
            to="/applicant/profile"
            className="p-4 bg-indigo-600 text-white rounded text-center"
          >
            Edit Profile
          </Link>

          <Link
            to="/applicant/profile/view"
            className="p-4 bg-gray-700 text-white rounded text-center"
          >
            View Profile
          </Link>

          <Link
            to="/applicant/applications"
            className="p-4 bg-blue-600 text-white rounded text-center"
          >
            My Applications
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDashboard;
