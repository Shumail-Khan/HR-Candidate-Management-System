import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-gray-800">HR App</Link>

        <nav className="flex items-center space-x-4">
          {user && user.user && (
            <>
              {user.user.role === "admin" && <Link to="/admin" className="text-sm">Admin</Link>}
              {user.user.role === "hr" && <Link to="/hr" className="text-sm">HR</Link>}
              {user.user.role === "applicant" && <Link to="/applicant" className="text-sm">Applicant</Link>}
              <button onClick={logout} className="ml-4 bg-red-600 text-white text-sm px-3 py-1 rounded">Logout</button>
            </>
          )}

          {!user && <Link to="/login" className="text-sm">Login</Link>}
        </nav>
      </div>
    </header>
  );
};

export default Header;
