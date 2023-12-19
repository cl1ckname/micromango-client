import {fetchJson, fetchOr404} from "@/common/fetch";
import {ListResponse, PostList} from "@/dto/profile";
import {HOST} from "@/app/globals";
import {Profile, ProfileEncoded} from "@/dto/user";

export function AddToList(userId: string, mangaId: string, list: number) {
    return fetchJson<PostList, unknown>(`${HOST}/api/profile/${userId}/list`, "POST", {mangaId, list})
}

export function RemoveFromList(userId: string, mangaId: string) {
    return fetchJson<{mangaId: string}, unknown>(`${HOST}/api/profile/${userId}/list`, "DELETE", {mangaId})
}

export async function GetProfile(userId: string) {
    const res = await fetchOr404<Profile>(`${HOST}/api/profile/${userId}`)
    if (!res) {
        return null
    }
    let profile: ProfileEncoded | null
    try {
        profile = {...res, bio:  JSON.parse(res.bio)}
    }
    catch (e) {
        console.warn(e)
        profile = {...res, bio: {gender: "Other", status: "", description: ""}}
    }
    return profile
}

export function GetLists(userId: string) {
    const url = `${HOST}/api/profile/${userId}/list`
    return fetchOr404<ListResponse>(url)
}

export function  LikeManga(mangaId: string) {
    return fetchJson(`${HOST}/api/activity/manga/${mangaId}/like`, "POST")
}

export function  UnlikeManga(mangaId: string) {
    return fetchJson(`${HOST}/api/activity/manga/${mangaId}/like`, "DELETE")
}

export function RateManga(mangaId: string, rate: number) {
    return fetchJson(`${HOST}/api/activity/manga/${mangaId}/rate`, "POST", {rate})
}