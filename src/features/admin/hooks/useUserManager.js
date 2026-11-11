import React, { useEffect, useState } from 'react'
import * as userManagerService from '../services/userManagerService';
import { tr } from 'zod/v4/locales';
import { useCallback } from 'react';



function useUserManager() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);



    const loadUsers = useCallback(async () => {
        console.log("loaduser");
        setLoading(true);
        setMessage('');
        try {
            const response = await userManagerService.getAllUsers();
            if (!response.IsSuccess) {
                setMessage(response.Message || "No Users loaded");
                return;
            }

            setUsers(response.Data);

        } catch (e) {

            const errorResponse = e.response?.data;
            setMessage(errorResponse?.Message || e.message || "Failed to load users");


        } finally {
            setLoading(false);
        }
    }, [])

    const loadUser = useCallback(async (id) => {
        setLoading(true);
        setMessage('');
        try {

            const response = await userManagerService.getUserById(id);

            if (!response.IsSuccess) {
                setMessage(response.Message || "No User loaded");
                return;
            }


            return { success: true, data: response.Data };

        } catch (e) {

            const errorResponse = e.response?.data;
            setMessage(errorResponse?.Message || e.message || "Failed to load users");
            return {
                success: false,
                error: errorResponse,
                message: errorResponse?.Message || e.message || "Failed to load users"
            }


        } finally {
            setLoading(false);
        }
    }, []);

    const loadUserDetail = useCallback(async (userId) => {
        setLoading(true);
        setMessage('');
        try {

            const result = await userManagerService.getUserDetailById(userId);
            if (!result.IsSuccess) {
                setMessage(result.Message || "No User loaded");
                return;
            }

            return { success: true, data: result.Data }


        } catch (e) {
            const errorResponse = e.response?.data;
            setMessage(errorResponse?.Message || e.message || "Failed to load users");
            return {
                success: false,
                error: errorResponse,
                message: errorResponse?.Message || e.message || "Failed to load users"
            }

        } finally {
            setLoading(false);
        }

    }, []);

    const updateUser = useCallback(async (id, patchDocument) => {
        setIsSubmit(true);
        setMessage('');
        try {

            const response = await userManagerService.updateUser(id, patchDocument);
            if (!response.IsSuccess) {
                setMessage(response?.Message || 'User not Updated');
                return { success: false, message: response?.Message || 'User not Updated' }

            }

            return {
                success: true,
                message: response?.Message || 'User Updated SuccessFully !'
            }

        } catch (e) {
            const errorResponse = e.response?.data;
            return {
                success: false,
                errorResponse: errorResponse,
                message: errorResponse?.Message || e.message || 'Something went wrong while updating user.'
            }

        } finally {
            setIsSubmit(false);
        }
    }, []);


    return { loading, users, message, isSubmit, loadUsers, loadUser, loadUserDetail, updateUser }
}

export default useUserManager