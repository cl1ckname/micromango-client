import {fetchFormData, fetchJson, fetchOr404} from "@/common/fetch";
import {MangaEditProperties, MangaPreviewResponse, MangaResponse} from "@/dto/catalog";
import {HOST} from "@/app/globals";

export async function GetManga(id: string, auth?: string) {
    const res = await fetchOr404<MangaResponse>(HOST + "/api/catalog/" + id, auth);
    if (!res) {
        return null
    }
    res.genres = res.genres || []
    res.listStats = res.listStats || {}
    return res
}

export function AddManga(manga: MangaEditProperties) {
    const formData = new FormData()
    formData.append("title", manga.title)
    formData.append("genres", Object.values(manga.genres).join(","))
    formData.append("description", manga.description)
    if (manga.thumbnail) {
        formData.append("cover", manga.thumbnail, manga.thumbnail.name)
    }
    return fetchFormData<MangaResponse>(HOST + "/api/catalog", "POST", formData)
}

type MangaUpdates = Partial<Omit<MangaResponse, "mangaId" | "thumbnail"> & {thumbnail: File}>

export async function UpdateManga(id: string, manga: MangaUpdates) {
    const formData = new FormData()
    if (manga.genres)
        formData.append("genres", manga.genres.join(","))
    if (manga.title)
        formData.append("title", manga.title)
    if (manga.description)
        formData.append("description", manga.description)
    if (manga.thumbnail) {
        formData.append("thumbnail", manga.thumbnail, manga.thumbnail.name)
    }
    return fetchFormData<MangaResponse>(`${HOST}/api/catalog/${id}`, "PUT", formData)
}

export async function DeleteManga(id: string) {
    return fetchJson(`${HOST}/api/catalog/${id}`, "DELETE")
}

export async function GetMangaUpdates(): Promise<MangaPreviewResponse[]> {
    return fetchOr404<MangaPreviewResponse[]>(`${HOST}/api/feed/updates`).then(r => r || [])
}