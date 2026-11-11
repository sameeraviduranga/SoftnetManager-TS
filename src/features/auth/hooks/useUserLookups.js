import { useEffect, useState } from "react"
import * as userService from '@/features/auth/services/userService'

const useUserLookups = () => {

    const [salutations, setSalutations] = useState([]);
    const [genders, setGenders] = useState([]);
    const [maritialStatus, setMaritialStatus] = useState([]);
    const [branches, setBranches] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [roles, setRoles] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const loadLookUps = async () => {
        try {
            setIsLoading(true);

            const data = await userService.getUserFormLookUpData();

            setSalutations(data.Data.Salutations);
            setGenders(data.Data.Genders)
            setMaritialStatus(data.Data.MaritialStatus)
            setBranches(data.Data.Branches)
            setDesignations(data.Data.Designations)
            setRoles(data.Data.Roles)
        } catch (err) {
            console.error('Error loading user form lookups:', err);
            setError('Failed to load user form data.');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadLookUps();
    }, []);

    return {
        salutations,
        genders,
        maritialStatus,
        branches,
        designations,
        roles,
        isloading,
        error
    }

}

export default useUserLookups;