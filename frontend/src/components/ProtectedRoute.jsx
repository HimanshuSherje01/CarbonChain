
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth(); // Assuming useAuth provides loading state

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    const userRole = user.user_metadata?.role;

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // Redirect to their appropriate dashboard if they have a role, or home
        if (userRole === 'ngo') return <Navigate to="/ngo" replace />;
        if (userRole === 'verifier') return <Navigate to="/verifier" replace />;
        if (userRole === 'corporate') return <Navigate to="/corporate" replace />;
        if (userRole === 'admin') return <Navigate to="/admin" replace />;
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
