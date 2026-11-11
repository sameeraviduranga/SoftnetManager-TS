import axios from "axios";
import { tokenService } from "@/core/services/tokenService";
import authApi from "@/features/auth/api/authApi";
import api from "@/core/api/axiosInstance";

const clientId = "Client1";
//===================
//login
//===================
export const login = async (user) => {
    const response = await authApi.post("/Auth", user);

    const { Token, RefreshToken } = response.data.Data;
    tokenService.setTokens(Token, RefreshToken);
    return response.data;
}
//===================
//register
//===================
export const registerUser = async (user) => {
    const response = await authApi.post("/User", user);
    return response.data;
}

export const getCurrentUser = async () => {
    const response = await api.get("/User/me");
    return response.data;
}

//===================
//refreshtoken
//===================

export const refreshToken = async () => {


    const response = await authApi.post("/Auth/RefreshToken", {
        RefreshToken: tokenService.getRefreshToken(),
        ClientId: clientId
    });

    tokenService.setTokens(response.data.Data.Token, response.data.Data.RefreshToken);

    return response.data;
}
//===================
//logout
//===================
export const logout = () => {
    tokenService.clearTokens();
}






