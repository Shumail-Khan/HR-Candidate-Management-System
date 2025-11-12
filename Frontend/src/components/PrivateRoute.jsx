import React from "react";
import { Navigate } from "react-router-dom";

// children = component to render if authenticated
const PrivateRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.token) {
        // Not logged in, redirect to login
        return <Navigate to="/login" replace />;
    }

    // Logged in, render the child component
    return children;
};

export default PrivateRoute;
