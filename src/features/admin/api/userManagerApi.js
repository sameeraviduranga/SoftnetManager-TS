import api from "@/core/api/axiosInstance";
import { patch } from "@mui/material";

export const userManagerApi = {
    getUsers: () => api.get("/User"),
    getUserById: (id) => api.get(`/User/${id}`),
    getUserDetailById: (id) => api.get(`/User/${id}/details`),
    updateUser: (id, patchDocument) => api.patch(`/User/${id}`, patchDocument, { headers: { "Content-Type": 'application/json-patch+json' } })
    //createuser
}