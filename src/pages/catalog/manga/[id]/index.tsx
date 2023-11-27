import {GetServerSidePropsContext} from "next";
import {Chapter, ChapterHead, MangaResponse} from "@/dto/catalog";
import {notFound} from "next/navigation";
import {FormEvent, useState} from "react";
import {HOST} from "@/app/globals";

interface MangaPreviewProps {
    mangaPreview: MangaResponse
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {id} = context.query;
    const res = await fetch(HOST + "/api/catalog/" + id);
    if (res.status == 404) {
        return notFound()
    }
    if (!res.ok) {
        console.error(await res.json())
        return
    }
    const mangaPreview = await res.json() as MangaResponse;
    return {props: {mangaPreview}};
}

export default function MangaPreview(props: MangaPreviewProps) {
    const [chapters, setChapters] = useState<ChapterHead[]>(props.mangaPreview.content.chapters || [])
    const [chapterName, setChapterName] = useState("")

    async function addChapter(e: FormEvent) {
        e.preventDefault()
        e.stopPropagation()
        const resp = await fetch(HOST + "/api/content/" + props.mangaPreview.mangaId + "/chapter", {
            method: "POST",
            body: JSON.stringify({title: chapterName, number: chapters.length + 1}),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        if (!resp.ok) {
            throw await resp.json()
        }
        const respData = await resp.json() as Chapter
        setChapters(prev => prev.concat([{
            title: respData.title,
            chapterId: respData.chapterId,
            number: respData.number
        }]))
        setChapterName("")
    }

    return <div className="my-4 max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
        <a href="/catalog">To catalog</a>
        <h1 className="text-3xl font-bold leading-9 sm:text-4xl sm:leading-tight">{props.mangaPreview.title}</h1>
        <img src={props.mangaPreview.cover} alt={props.mangaPreview.cover} width="480" height="480"/>
        <p className="mt-6 text-base md:max-w-xs">{props.mangaPreview.description}</p>
        <h2>There is {chapters.length} chapters already!</h2>
        {/*<form>*/}
        {/*    <input type="text" value={chapterName} onChange={e => setChapterName(e.target.value)}/>*/}
        {/*    <input type="button" value="Add chapter" onClick={addChapter}/>*/}
        {/*</form>*/}


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
                            {chapters.sort((a,b) => b.number - a.number).map(c => <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-1 text-left text-blueGray-700 ">
                                    {c.number}
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-1 ">
                                    {c.title}
                                </td>
                            </tr>)}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </section>

    </div>
}