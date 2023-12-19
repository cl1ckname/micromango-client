import {fetchJson} from "@/common/fetch";
import {Chapter, PostChapter} from "@/dto/catalog";
import {HOST} from "@/app/globals";

export default function AddChapter(mangaId: string, title: string, number: number) {
    return fetchJson<PostChapter, Chapter>(
        HOST + "/api/content/" + mangaId + "/chapter",
        "POST",
        {title, number: number}
    )
}