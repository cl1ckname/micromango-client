export interface LoginResponse {
    accessToken:         string,
    accessTokenExpired:  string,
    refreshToken:        string,
    refreshTokenExpired: string,
}

export interface RegisterDto {
    username: string
    email: string
    password: string
}

export interface LoginDto {
    email: string
    password: string
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

export interface ProfileBio {
    status: string
    description: string
    gender: string
}

export interface ProfileEncoded {
    userId: string,
    username: string,
    picture: string,
    bio: ProfileBio,
    createdAt: string
}