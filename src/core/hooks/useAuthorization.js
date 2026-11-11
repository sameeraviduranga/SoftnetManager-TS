import useAuth from "@/core/hooks/useAuth";
import { hasAllPermissions, hasAnyPermission, hasAnyRole, hasPermission, hasRole } from "@/core/authorizations/authorization";

//this is hook
function useAuthorization() {
    const { user } = useAuth();

    const can = (permission) => {
        return hasPermission(user, permission);
    }

    const canAny = (permissions) => {
        return hasAnyPermission(user, permissions);
    }

    const canAll = (permissions) => {
        return hasAllPermissions(user, permissions);
    }

    const isRole = (role) => {
        return hasRole(user, role);
    }

    const isAnyRole = (roles) => {
        return hasAnyRole(user, roles);
    }

    return {
        can,
        canAny,
        canAll,
        isRole,
        isAnyRole
    }


}

export default useAuthorization;