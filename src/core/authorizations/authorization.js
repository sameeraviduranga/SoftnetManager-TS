export const hasPermission = (user, permission) => {
    return user?.permissions?.includes(permission);
}

export const hasAnyPermission = (permissions) => {

    return permissions.some(permission => user?.permissions?.includes(permission));

}

export const hasAllPermissions = (permissions) => {
    return permissions.every(permission => user?.permissions?.includes(permission));
}

export const hasRole = (user, role) => {
    return user?.role === role;
}

export const hasAnyRole = (user, roles) => {
    return roles.includes(user?.role);
}