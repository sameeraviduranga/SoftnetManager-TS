import React, { useRef, useState } from 'react'
import * as userService from '@/features/auth/services/userService'
import { fa } from 'zod/v4/locales';

function useUserAvailability() {

    const [emailStatus, setEmailStatus] = useState({
        checking: false,
        error: "",
        available: null
    });

    const [nicStatus, setNicStatus] = useState({
        checking: false,
        error: "",
        available: null
    });

    const emailRequestId = useRef(0);
    const nicRequestId = useRef(0);

    const resetEmailStatus = () => {
        emailRequestId.current++;
        setEmailStatus({
            checking: false,
            error: "",
            available: null
        });
    }

    const resetNicStatus = () => {
        nicRequestId.current++;
        setNicStatus({
            checking: false,
            error: "",
            available: null
        });
    }

    //check email
    const checkEmail = async (email) => {
        const requestId = ++emailRequestId.current;

        setEmailStatus({
            checking: false,
            error: "",
            available: null
        });

        const normalizedEmail = email.trim();

        if (!normalizedEmail) return;

        const emailFormatValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

        if (!emailFormatValid) return;

        setEmailStatus({
            checking: true,
            error: "",
            available: null
        });

        try {
            const response = await userService.checkEmailAvailibility(normalizedEmail);

            if (requestId !== emailRequestId.current) return;

            if (response?.IsSuccess !== true) {

                setEmailStatus({
                    checking: false,
                    error: "Unable to verify email availability.",
                    available: null
                });
                return;
            }

            const available = response.Data?.IsAvailable;

            if (typeof available !== 'boolean') {
                setEmailStatus({
                    checking: false,
                    error: "Unable to verify email availability.",
                    available: null
                });
                return;
            }

            setEmailStatus({
                checking: false,
                error: available ? "" : "Email has already been registered.",
                available
            });
            return;


        } catch (e) {
            if (requestId !== emailRequestId.current) return;
            setEmailStatus({
                checking: false,
                error: "Unable to verify email availability.",
                available: null
            });
        }



    }

    //check NIC
    const checkNic = async (nic) => {
        const requestId = ++nicRequestId.current;

        setNicStatus({
            checking: false,
            error: "",
            available: null
        });

        const normalizedNic = nic.trim();

        if (!normalizedNic) return;


        setNicStatus({
            checking: true,
            error: "",
            available: null
        });

        try {
            const response = await userService.checkNicAvailablility(normalizedNic);

            if (requestId !== nicRequestId.current) return;

            if (response?.IsSuccess !== true) {

                setNicStatus({
                    checking: false,
                    error: "Unable to verify Nic availability.",
                    available: null
                });
                return;
            }

            const available = response.Data?.IsAvailable;

            if (typeof available !== 'boolean') {
                setNicStatus({
                    checking: false,
                    error: "Unable to verify Nic availability.",
                    available: null
                });
                return;
            }

            setNicStatus({
                checking: false,
                error: available ? "" : "NIC has already been registered.",
                available
            });
            return;


        } catch (e) {
            if (requestId !== nicRequestId.current) return;
            setNicStatus({
                checking: false,
                error: "Unable to verify Nic availability.",
                available: null
            });
        }



    }


    return ({
        emailStatus,
        nicStatus,
        checkEmail,
        checkNic,
        resetEmailStatus,
        resetNicStatus
    });
}

export default useUserAvailability