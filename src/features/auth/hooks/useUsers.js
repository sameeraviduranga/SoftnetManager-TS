import React from 'react'
import * as userService from '@/features/auth/services/userService'
import { useState } from 'react';
import buildFormData from '@/features/auth/utils/userFormData';



const useUsers = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(null);
    const [responseMessage, setresponseMessage] = useState('');



    const createUser = async (data) => {

        setIsCreating(false);
        setSubmitError(null);
        setIsSuccess(false);
        setresponseMessage('');

        try {

            setIsCreating(true);

            var formData = buildFormData(data);
            var response = await userService.createUser(formData);
            if (!response?.IsSuccess) {
                setSubmitError(response?.Message ?? "Unable to create user.");
                return { success: false, error: response }
            }

            setIsSuccess(true);
            setresponseMessage(response?.Message || "User created successfully.");
            return { success: true, data: response }



        } catch (e) {

            const errorResponse = e.response?.data;
            console.log(errorResponse);
            setSubmitError(errorResponse?.Message || e.message || "Something went wrong while creating the user.")
            return {
                success: false,
                error: errorResponse,
                message: errorResponse?.Message || e.message || "Something went wrong."
            };

        } finally {
            setIsCreating(false)
        }
    }





    return {
        isCreating,
        isSuccess,
        createUser,
        submitError,
        responseMessage

    }

}

export default useUsers