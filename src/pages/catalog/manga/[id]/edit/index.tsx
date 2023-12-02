import {Chapter, ChapterHead, MangaResponse, PostChapter} from "@/dto/catalog";
import {GetServerSidePropsContext} from "next";
import {HOST} from "@/app/globals";
import {FormEvent, useState} from "react";
import {useRouter} from "next/router";
import {fetchFormData, fetchJson, fetchOr404} from "@/common/fetch";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {id} = context.query;
    const res = await fetchOr404<MangaResponse>(HOST + "/api/catalog/" + id);
    if (!res) {
        return {notFound: true}
    }
    return {props: res};
}

export default function EditManga(props: MangaResponse) {
    const [chapters, setChapters] = useState<ChapterHead[]>(props.content.chapters || [])
    const [chapterName, setChapterName] = useState("")
    const [title, setTitle] = useState(props.title)
    const [description, setDescription] = useState(props.description)
    const router = useRouter()
    async function addChapter(e: FormEvent) {
        e.preventDefault()
        e.stopPropagation()
        const resp = await fetchJson<PostChapter, Chapter>(
            HOST + "/api/content/" + props.mangaId + "/chapter",
            "POST",
            {title: chapterName, number: chapters.length + 1}
        )
        setChapters(prev => prev.concat([{
            title: resp.title,
            chapterId: resp.chapterId,
            number: resp.number,
            createdAt: resp.createdAt
        }]))
        setChapterName("")
    }

    async function updatePreview(e: FormEvent) {
        e.preventDefault()
        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        return fetchFormData(`${HOST}/api/catalog/${props.mangaId}`, "PUT", formData)
    }

    async function deleteManga(e: FormEvent) {
        e.preventDefault()
        await fetchJson(`${HOST}/api/catalog/${props.mangaId}`, "PUT")
        await router.push("/catalog")
    }

    return <>
        <div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="w-1/2 h-screen hidden lg:block">
                <img src={props.cover} alt="Placeholder Image" className="object-cover w-full h-full"/>
            </div>
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <input
                    type="text"
                    className="text-7xl font-semibold mb-4 text-decoration-line: underline bg-inherit"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <form method="POST">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600">Description</label>
                        <textarea
                            id="username"
                            name="username"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            autoComplete="off"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <input type="checkbox" id="remember" name="remember" className="text-blue-500"/>
                        <label htmlFor="remember" className="text-gray-600 ml-2">Publish</label>
                    </div>
                    <button onClick={updatePreview}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Update
                    </button>
                    <button onClick={deleteManga}
                            className="bg-red-700 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Delete
                    </button>
                </form>
            </div>
        </div>

        <section className="py-1 bg-blueGray-50">
            <div className="w-full mb-12 xl:mb-0 mx-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">Chapters</h3>
                            </div>
                            <input
                                className="h-12 min-w-[12rem] rounded-lg border-emerald-500 indent-4 text-emerald-900 shadow-lg focus:outline-none focus:ring focus:ring-emerald-600"
                                type="text"
                                placeholder="Chapter title"
                                value={chapterName}
                                onChange={e => setChapterName(e.target.value)}
                            />
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <button
                                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={addChapter}
                                >Add Chapter
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse ">
                            <thead>
                            <tr>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Chapter number
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Title
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                            {chapters.sort((a, b) => b.number - a.number).map(c => <>
                                <tr>

                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-1 text-left text-blueGray-700 ">
                                        {c.number}
                                    </th>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-1 ">
                                        <a href={`/catalog/manga/${props.mangaId}/chapter/${c.chapterId}`}>
                                            {c.title}
                                        </a>
                                    </td>
                                    <td>
                                        <a href={`/catalog/manga/${props.mangaId}/edit/${c.chapterId}`}>Edit</a>
                                    </td>
                                </tr>
                                </>
                            )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </section>
    </>
}