export interface LoginResponse {
    accessToken:         string,
    accessTokenExpired:  string,
    refreshToken:        string,
    refreshTokenExpired: string,
}

export interface Auth {
    userId: string,
    username: string
}