import {Chapter} from "@/dto/catalog";
import {GetServerSidePropsContext} from "next";
import {HOST} from "@/app/globals";
import {ChangeEvent, MouseEventHandler, useState} from "react";
import {notFound} from "next/navigation";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {id, chapterId} = context.query;
    if (!id || !chapterId) {
        throw "invalid path"
    }
    const chapterRes = await fetch(`${HOST}/api/content/${id}/chapter/${chapterId}`)
    console.log(chapterRes.status)
    if (chapterRes.status == 404) {
        return {notFound: true}
    }
    if (!chapterRes.ok) {
        throw await chapterRes.json()
    }
    return {
        props: await chapterRes.json()
    }
}
export default function EditChapter(props: Chapter) {
    const [file, setFile] = useState<File | null>(null)
    const [pages, setPages] = useState(props.pages || [])
    const [title, setTitle] = useState(props.title)
    async function AddPage() {
        const formData = new FormData()
        formData.append("number", pages.length + 1 + "")
        formData.append("mangaId", props.mangaId)
        if (file) {
            formData.append("image", file, file.name)
        }
        const res = await fetch(`${HOST}/api/content/${props.mangaId}/chapter/${props.chapterId}/page`, {
            method: "POST",
            body: formData
        })
        if (res.status == 404) {
            notFound()
        }
        if (!res.ok) {
            throw await res.json()
        }
        const newPage = await res.json()
        setPages(prev => prev.concat([newPage]))
    }

    function handleTitle(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value)
    }

    const UpdateChapter: MouseEventHandler = async (e) => {
        e.preventDefault()
        const res = await fetch(`${HOST}/api/content/${props.mangaId}/chapter/${props.chapterId}`, {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({chapterId: props.chapterId, title})
        })
        const body = await res.json()
        if (!res.ok) {
            throw body
        }
    }

    return <div>
        <div className="flex flex-row">
            <input value={title} onChange={handleTitle} type="text"/>
            <button onClick={UpdateChapter}>Rename</button>
        </div>
        <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">Pages</h3>
            </div>
            <input
                className="h-12 min-w-[12rem] rounded-lg border-emerald-500 indent-4 text-emerald-900 shadow-lg focus:outline-none focus:ring focus:ring-emerald-600"
                type="file"
                placeholder="Chapter title"
                onChange={e => {
                    if (e.target.files)
                        setFile(e.target.files[0])
                }}
            />
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={_ => AddPage()}
                >Add Page
                </button>
            </div>
        </div>
        <table className="items-center bg-transparent w-full border-collapse">
            <thead>
            <tr>
                <th
                    className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >Page number</th>
                <th
                    className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >Page image</th>
            </tr>
            </thead>
            <tbody>
            {pages.map(p => <tr>
                <td>
                    {p.number}
                </td>
                <td>
                    <a href={p.image} target="_blank">
                        <img src={p.image} alt={p.image} width="100"/>
                    </a>
                </td>
            </tr>)}
            </tbody>
        </table>
    </div>
}