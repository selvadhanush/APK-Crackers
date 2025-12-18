import { Navigate } from 'react-router-dom';

// Protected Route for Customers
export const ProtectedCustomerRoute = ({ children }) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole');

    if (!token || userRole !== 'customer') {
        return <Navigate to="/Login" replace />;
    }

    return children;
};

// Protected Route for Sellers
export const ProtectedSellerRoute = ({ children }) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole');

    if (!token || userRole !== 'seller') {
        return <Navigate to="/seller-login" replace />;
    }

    return children;
};

// Protected Route for Admins
export const ProtectedAdminRoute = ({ children }) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole');

    if (!token || userRole !== 'admin') {
        return <Navigate to="/admin-login" replace />;
    }

    return children;
};

// Public Route (redirect to home if already logged in)
export const PublicRoute = ({ children, redirectPath = '/' }) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole');

    if (token && userRole) {
        // Redirect based on user role
        if (userRole === 'seller') {
            return <Navigate to="/seller-home" replace />;
        } else if (userRole === 'admin') {
            return <Navigate to="/admin-Dashboard" replace />;
        } else if (userRole === 'customer') {
            return <Navigate to={redirectPath} replace />;
        }
    }

    return children;
};
