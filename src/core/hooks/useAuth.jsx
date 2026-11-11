import React from 'react'
import { AuthContext } from '@/core/context/AuthContext';
import { useContext } from 'react';

function useAuth() {
    return (
        useContext(AuthContext)
    )
}

export default useAuth