import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CandidateForm from "./components/CandidateForm";
import PrivateRoute from "./components/PrivateRoute";
import SyncHandler from "./components/SyncHandler";

function App() {
  return (
    <Router>
      {/* Sync offline data in background */}
      <SyncHandler />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-candidate"
          element={
            <PrivateRoute>
              <CandidateForm />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
