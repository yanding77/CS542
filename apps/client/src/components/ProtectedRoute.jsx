import { Navigate } from 'react-router-dom';

// This is for protecting certain routes that should only be seen by certain roles (owner or location)
export default function ProtectedRoute({ children, allowedRole }) {
    const token = localStorage.getItem('jwt');
    const role = localStorage.getItem('role');

    // if a person is not logged in, kick them to the login screen
    if (!token) {
        return <Navigate to="/login" />;
    }

    if (allowedRole && role !== allowedRole) {
        return <Navigate to="/login" />;
    }

    return children;
}