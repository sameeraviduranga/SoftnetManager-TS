
const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken"

export const tokenService = {
    getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN);
    },
    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN);
    },
    setTokens(accessToken, refreshToken) {
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
    },

    clearTokens() {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
    }
}

