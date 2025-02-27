import React from 'react';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

const RoleBaseRoutes = ({ children, requiredRole }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user || !requiredRole.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default RoleBaseRoutes;



// import { Navigate, Outlet } from 'react-router-dom';

// const RoleBaseRoutes = ({ requiredRole }) => {
//   const userRole = localStorage.getItem('role'); // Ensure role is stored in localStorage

//   return requiredRole.includes(userRole) ? <Outlet /> : <Navigate to="/login" />;
// };

// export default RoleBaseRoutes;
