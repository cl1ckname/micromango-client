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

export interface Profile {
    userId: string,
    username: string,
    picture: string,
    bio: string,
    createdAt: string
}