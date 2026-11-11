
import { userManagerApi } from "../api/userManagerApi";

export const getAllUsers = async () => {
    const response = await userManagerApi.getUsers();
    return response.data;
}

export const getUserById = async (id) => {
    const response = await userManagerApi.getUserById(id);
    return response.data;
}

export const getUserDetailById = async (id) => {
    const response = await userManagerApi.getUserDetailById(id);
    return response.data;
}

export const updateUser = async (id, patchDocument) => {
    const response = await userManagerApi.updateUser(id, patchDocument);
    return response.data;
}