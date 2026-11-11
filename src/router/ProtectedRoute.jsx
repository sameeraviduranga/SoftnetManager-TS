import React, { use } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { tokenService } from '../core/services/tokenService'
import useAuth from '@/core/hooks/useAuth';

function ProtectedRoute() {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    if (!isAuthenticated) {
        return <Navigate to='/login' replace state={{ from: location }} />
    }

    return <Outlet />
}

export default ProtectedRoute