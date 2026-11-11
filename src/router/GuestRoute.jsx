import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '@/core/hooks/useAuth'

function GuestRoute() {

    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (isAuthenticated) {
        const from = location.state?.from?.pathname || '/main/dashboard';
        //console.log(from)
        return <Navigate to={from} replace />
    }

    return <Outlet />
}

export default GuestRoute