import React, { Children, useEffect, useRef } from 'react'
import { useState } from 'react';
import { useMemo } from 'react';
import { AuthContext } from './AuthContext';
import * as authservice from '@/core/api/authenticationService'
import { jwtDecode } from 'jwt-decode';
import { tokenService } from '../services/tokenService';


function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [Profile, setProfile] = useState(null);
    const [initializing, setInitializing] = useState(true)
    const [registering, setRegistering] = useState(false)
    const [loggingIn, setLoggingIn] = useState(false)
    const restorePromiseRef = useRef(null);
    //const [loading, setLoading] = useState(false);

    useEffect(() => {
        restoreUser();

    }, []);

    const setUserFromAccessToken = async (accessToken) => {
        const decoded = jwtDecode(accessToken);
        //console.log(decoded)
        setUser({
            id: decoded.sub,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
            permissions: decoded.permission
        });

        await loadCurrentUser();


    }

    const loadCurrentUser = async () => {
        const response = await authservice.getCurrentUser();

        if (response.IsSuccess) {
            setProfile(response.Data);

        }



    }



    const restoreUser = async () => {
        if (restorePromiseRef.current) {
            return restorePromiseRef.current;
        }
        restorePromiseRef.current = (async () => {

            try {
                const refreshToken = tokenService.getRefreshToken();
                if (!refreshToken) {
                    return;
                }

                const response = await authservice.refreshToken()
                await setUserFromAccessToken(response.Data.Token);



            } catch (error) {//if toke corrupt exception happens
                console.error(
                    "Session restore failed",
                    error
                );
                authservice.logout();
                setUser(null);
                setProfile(null)
            } finally {
                setInitializing(false);
                // Request complete වුණාට පස්සේ
                // ref එක clear කරනවා.
                restorePromiseRef.current = null;
            }
        })();
        return restorePromiseRef.current;
    }

    //============================================
    //register
    //============================================

    const register = async (userData) => {
        setRegistering(true);
        try {
            const response = await authservice.registerUser(userData);
            return response;
        } finally {
            setRegistering(false);
        }
    }

    //============================================
    //login
    //============================================

    const login = async (credential) => {
        setLoggingIn(true);

        try {

            const response = await authservice.login(credential);
            await setUserFromAccessToken(response.Data.Token);

            return true;
        } finally {

            setLoggingIn(false);
        }
    }



    //============================================
    //logout
    //============================================

    const logout = () => {
        authservice.logout();
        setUser(null);
        setProfile(null);
    }

    const value = useMemo(() => ({
        user,
        Profile,
        //setUser,dont export
        initializing,
        loggingIn,
        registering,
        //setLoading,
        register,
        login,
        logout,
        isAuthenticated: !!user
    }), [user, initializing, loggingIn]);


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider