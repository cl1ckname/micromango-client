import {ChangeEvent, FormEvent, useState} from "react";
import {MangaEditProperties, MangaResponse} from "@/dto/catalog";
import {useRouter} from "next/router";
import {HOST} from "@/app/globals";
import {fetchFormData} from "@/common/fetch";
import {notFound} from "next/navigation";
import GenrePick from "@/components/genrePickForm";
import GenreList from "@/components/genreListForm";
import MangaEdit from "@/components/mangaEdit";

export default function AddManga() {
    const router = useRouter()
    const [manga, setManga] = useState<MangaEditProperties>({
        genres: [],
        description: "",
        title: ""
    })

    const createManga = async (e: FormEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("title", manga.title)
        formData.append("genres", Object.values(manga.genres).join(","))
        formData.append("description", manga.description)
        if (manga.cover) {
            formData.append("cover", manga.cover, manga.cover.name)
        }
        const res = await fetchFormData<MangaResponse>(HOST + "/api/catalog", "POST", formData)
        if (!res) {
            notFound()
        }
        return router.replace("/catalog/manga/" + res.mangaId)
    }

    return <div className="my-4 border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 mx-7">
        <div className="flex flex-col border-b py-4 sm:flex-row sm:items-start">
            <div className="shrink-0 mr-auto sm:py-3">
                <p className="font-medium">Add new manga</p>
                <p className="text-sm text-gray-600">Input primary details</p>
            </div>
            <button
                className="mr-2 hidden rounded-lg border-2 px-4 py-2 font-medium text-gray-500 sm:inline focus:outline-none focus:ring hover:bg-gray-200">Cancel
            </button>
            <button
                onClick={createManga}
                className="hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white sm:inline focus:outline-none focus:ring hover:bg-blue-700"
            >Save
            </button>
        </div>
        <MangaEdit manga={manga} onChange={setManga}/>
    </div>
}