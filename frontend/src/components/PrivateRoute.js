import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    // Simple authentication check
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        return !!token; // Returns true if token exists, false otherwise
    };

    return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;