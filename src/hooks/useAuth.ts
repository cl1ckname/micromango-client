import {Auth, LoginResponse} from "@/dto/user";

export default function useAuth(): Auth | null {
    const auth = localStorage.getItem("auth")
    if (!auth) { return null}

    const login: LoginResponse = JSON.parse(auth)
    const token = login.accessToken
    const payloadB64 = token.split(".")[1]
    const payloadJson = atob(payloadB64)
    return JSON.parse(payloadJson) as Auth
}