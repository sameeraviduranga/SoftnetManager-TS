import useAuth from '@/core/hooks/useAuth'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function RoleRoute({ allowedRoutes }) {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to='/login' replace />
    }

    if (!allowedRoutes.includes(user.role)) {
        return <Navigate to='/403' replace />
    }
    return <Outlet />
}

export default RoleRoute