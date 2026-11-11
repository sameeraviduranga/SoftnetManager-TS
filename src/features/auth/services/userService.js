import userApi from "@/features/auth/api/userApi";



export const createUser = async (data) => {
    const response = await userApi.createUser(data);
    return response.data;
}



//lookup data
export const getUserFormLookUpData = async () => {
    const response = await userApi.getUserFormLookUpData();
    return response.data;
}
//check email
export const checkEmailAvailibility = async (email) => {
    const response = await userApi.checkEmailAvailibility(email);
    return response.data;
}

export const checkNicAvailablility = async (nic) => {
    const response = await userApi.checkNicAvailablility(nic);
    return response.data;
}