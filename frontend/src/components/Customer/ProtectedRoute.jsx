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


export const PublicRoute = ({ children, redirectPath = '/' }) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole');
    const currentPath = window.location.pathname;

    if (token && userRole) {
        // Only redirect if user is trying to access their own role's login page
        if (userRole === 'seller' && (currentPath === '/seller-login' || currentPath === '/seller-register')) {
            return <Navigate to="/seller-home" replace />;
        } else if (userRole === 'admin' && currentPath === '/admin-login') {
            return <Navigate to="/admin-Dashboard" replace />;
        } else if (userRole === 'customer' && (currentPath === '/Login' || currentPath === '/Register')) {
            return <Navigate to={redirectPath} replace />;
        }
        // Allow access to other role's login pages (e.g., customer can access seller-login)
    }

    return children;
};
