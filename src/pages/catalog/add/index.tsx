import {ChangeEvent, FormEvent, useState} from "react";
import {MangaResponse} from "@/dto/catalog";
import {useRouter} from "next/router";
import {HOST} from "@/app/globals";
import {fetchFormData} from "@/common/fetch";
import {notFound} from "next/navigation";
import GenrePick from "@/components/genrePickForm";
import GenreList from "@/components/genreListForm";

export default function AddManga() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [cover, setCover] = useState<File | null>(null)
    const [genres, setGenres] = useState<Record<number, boolean>>({})
    const router = useRouter()

    function handleCheck(genre: number) {
        return () => {
            setGenres(prev => ({...prev, genre: !prev[genre]}))
        }
    }
    const createManga = async (e: FormEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("title", title)
        formData.append("genres", Object.values(genres).join(","))
        formData.append("description", description)
        if (cover) {
            formData.append("cover", cover, cover.name)
        }
        const res = await fetchFormData<MangaResponse>(HOST + "/api/catalog", "POST", formData)
        if (!res) {
            notFound()
        }
        return router.replace("/catalog/manga/" + res.mangaId)
    }

    function handleSetPreview(e: ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files || ([] as File[])
        if (fileList.length == 0) {
            return
        }
        const file = fileList[0]
        setCover(file)
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
        <div className="grid grid-cols-4 gap-3">
            <div className="grid grid-cols-2 gap-3 col-span-3">
                <div>
                    <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                        <p className="shrink-0 w-32 font-medium">Title</p>
                        <input
                            placeholder="Title"
                            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                        <p className="shrink-0 w-32 font-medium">Year</p>
                        <input
                            type="number"
                            placeholder="2000"
                            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                        />
                    </div>
                    <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                        <p className="shrink-0 w-32 font-medium">Author</p>
                        <input
                            placeholder="Name Surname"
                            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                        />
                    </div>
                    <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                        <p className="shrink-0 w-32 font-medium">Status</p>
                        <select className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1">
                            <option>Announcement</option>
                            <option>In progress</option>
                            <option>Complete</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="shrink-0 w-32 font-medium">
                        <p className="mb-auto font-medium">Preview</p>
                    </div>
                    <div
                        className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center">
                        {/*<img src="/images/ddHJYlQqOzyOKm4CSCY8o.png" className="h-16 w-16 rounded-full" />*/}
                        <p className="text-sm text-gray-600">Drop your desired image file here to start the upload</p>
                        <input
                            type="file"
                            className="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1"
                            accept="image/png, image/jpeg"
                            onChange={handleSetPreview}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row col-span-2">
                    <p className="shrink-0 w-32 font-medium">Description</p>
                    <textarea
                        placeholder="your cool manga plot"
                        className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className="flex justify-end py-4 sm:hidden">
                    <button
                        className="mr-2 rounded-lg border-2 px-4 py-2 font-medium text-gray-500 focus:outline-none focus:ring hover:bg-gray-200">Cancel
                    </button>
                    <button
                        className="mr-2 rounded-lg border-2 px-4 py-2 font-medium text-gray-500 focus:outline-none focus:ring hover:bg-gray-200">Save
                    </button>
                </div>
            </div>
            <div>
                <GenreList onChange={handleCheck} value={genres}/>
            </div>
        </div>
    </div>
}