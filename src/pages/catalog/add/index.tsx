import {FormEvent, useState} from "react";
import {MangaResponse} from "@/dto/catalog";
import {useRouter} from "next/router";
import {HOST} from "@/app/globals";

export default function AddManga() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [cover, setCover] = useState<File | null>(null)
    const router = useRouter()
    const createManga = async (e: FormEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        if (cover) {
            console.log("there is file!!")
            formData.append("cover", cover, cover.name)
        }
        const res = await fetch(HOST + "/api/catalog", {
            method: "POST",
            mode: "cors",
            body: formData
        })
        if (!res.ok) {
            console.error(await res.json())
            return
        }
        const createdManga = await res.json() as MangaResponse
        return router.replace("/catalog/manga/" + createdManga.mangaId)
    }

    return <div className="my-4 max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
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
            <p className="shrink-0 w-32 font-medium">Description</p>
            <input
                placeholder="your cool manga plot"
                className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
        </div>
        <div className="flex flex-col gap-4 py-4  lg:flex-row">
            <div className="shrink-0 w-32  sm:py-4">
                <p className="mb-auto font-medium">Preview</p>
                <p className="text-sm text-gray-600">Upload your preview</p>
            </div>
            <div
                className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center">
                {/*<img src="/images/ddHJYlQqOzyOKm4CSCY8o.png" className="h-16 w-16 rounded-full" />*/}
                <p className="text-sm text-gray-600">Drop your desired image file here to start the upload</p>
                <input
                    type="file"
                    className="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1"
                    accept="image/png, image/jpeg"
                    onChange={e => {
                        const fileList = e.target.files || ([] as File[])
                        if (fileList.length == 0) {
                            return
                        }
                        const file = fileList[0]
                        setCover(file)
                    }
                    }
                />
            </div>
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
}