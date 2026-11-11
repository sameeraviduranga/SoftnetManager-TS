import api from "@/core/api/axiosInstance";

const userApi = {
    getUsers: () => api.get(`/User`),
    createUser: (data) => api.post(`/User/CreateUser`, data),
    checkEmailAvailibility: (email) => api.get(`/User/check-email`, {
        params: { email }
    }),
    checkNicAvailablility: (nic) => api.get(`/User/check-nic`, {
        params: { nic }
    }),

    //lookup data
    getUserFormLookUpData: () => api.get(`/LookUp/user-form-data`)
}

export default userApi;