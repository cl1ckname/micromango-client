import {FormEvent, useState} from "react";
import {MangaEditProperties} from "@/dto/catalog";
import {useRouter} from "next/router";
import {notFound} from "next/navigation";
import MangaEdit from "@/components/mangaEdit";
import {AddManga} from "@/api/catalog";

export default function CreateManga() {
    const router = useRouter()
    const [manga, setManga] = useState<MangaEditProperties>({
        genres: [],
        description: "",
        title: ""
    })

    const createManga = async (e: FormEvent) => {
        e.preventDefault()
        const res = await AddManga(manga)
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