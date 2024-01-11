import GenreList from "@/components/genreListForm";
import {MangaEditProperties} from "@/dto/catalog";
import {ChangeEvent} from "react";

export default function MangaEdit(props: {
    manga: MangaEditProperties
    onChange: (m: MangaEditProperties) => void
}) {

    function setTitle(e: ChangeEvent<HTMLInputElement>) {
        props.onChange({...props.manga, title: e.target.value})
    }

    function setDescription(e: ChangeEvent<HTMLTextAreaElement>) {
        props.onChange({...props.manga, description: e.target.value})
    }

    function handleSetPreview(e: ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files || ([] as File[])
        if (fileList.length == 0) {
            return
        }
        const file = fileList[0]
        props.onChange({...props.manga, thumbnail: file})
    }

    function handleCheck(genres: number[]) {
        props.onChange({...props.manga, genres})
    }

    return <div className="grid grid-cols-4 gap-3 mx-3 py-3">
        <div className="grid grid-cols-2 gap-3 col-span-3">
            <div>
                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                    <p className="shrink-0 w-32 font-medium">Title</p>
                    <input
                        placeholder="Title"
                        style={{inlineSize: "100%"}}
                        className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 break-words"
                        value={props.manga.title}
                        onChange={setTitle}
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
                    value={props.manga.description}
                    onChange={setDescription}
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
            <GenreList onChange={handleCheck} value={props.manga.genres}/>
        </div>
    </div>
}