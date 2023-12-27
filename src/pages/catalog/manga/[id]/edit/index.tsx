import {ChapterHead, MangaEditProperties, MangaResponse} from "@/dto/catalog";
import {GetServerSidePropsContext} from "next";
import {FormEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";
import MangaEdit from "@/components/mangaEdit";
import {DeleteManga, GetManga, UpdateManga} from "@/api/catalog";
import AddChapter from "@/api/reading";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {id} = context.query;
    const res = await GetManga(id as string)
    if (!res) {
        return {notFound: true}
    }
    res.genres = res.genres || []
    return {props: res};
}

export default function EditManga(props: MangaResponse) {
    const [chapters, setChapters] = useState<ChapterHead[]>(props.content.chapters || [])
    const [chapterName, setChapterName] = useState("")
    const [manga, setManga] = useState<MangaEditProperties>({
        title: props.title,
        genres: props.genres,
        description: props.description
    })
    const [cover, setCover] = useState(props.cover)

    useEffect(() => {
        if (manga.cover)
            setCover(URL.createObjectURL(manga.cover))
    }, [manga.cover]);

    const router = useRouter()

    async function addChapter(e: FormEvent) {
        e.preventDefault()
        e.stopPropagation()
        const resp = await AddChapter(props.mangaId, chapterName, chapters.length + 1)
        setChapters(prev => prev.concat([{
            title: resp.title,
            chapterId: resp.chapterId,
            number: resp.number,
            pages: resp.pages.length,
            createdAt: resp.createdAt
        }]))
        setChapterName("")
    }

    async function updatePreview(e: FormEvent) {
        e.preventDefault()
        return UpdateManga(props.mangaId, {...manga})
    }

    async function deleteManga(e: FormEvent) {
        e.preventDefault()
        await DeleteManga(props.mangaId)
        await router.push("/catalog")
    }

    return <>
        <div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="w-1/2 h-screen hidden lg:block">
                <img src={cover} alt="Placeholder Image" className="object-cover w-full h-full"/>
            </div>
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <input
                    type="text"
                    className="text-7xl font-semibold mb-4 text-decoration-line: underline bg-inherit"
                    value={manga.title}
                    onChange={e =>
                        setManga(prev => ({...prev, title: e.target.value}))}
                />
                <form method="POST">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600">Description</label>
                        <textarea
                            id="username"
                            name="username"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            autoComplete="off"
                            value={manga.description}
                            onChange={e =>
                                setManga(prev => ({...prev, description: e.target.value}))}
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
        <MangaEdit manga={manga} onChange={setManga}/>
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
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Pages
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Creation date
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
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
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-1">
                                            {c.pages || 0}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-1">
                                            {c.createdAt}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-1">
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