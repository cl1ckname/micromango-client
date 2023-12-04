import {Auth} from "@/dto/user";

export default function useAuth(): Auth | null {
    const auth = getCookie("signin")
    if (!auth) { return null}
    return JSON.parse(atob(auth))
}

function getCookie(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}