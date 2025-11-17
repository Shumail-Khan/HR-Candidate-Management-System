import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RoleRoute = ({ roles, children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // backend returns { user: { role }, token, message }
    const role = user.user?.role;

    if (!roles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default RoleRoute;
