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
        console.log("host", HOST + "/api/content/" + props.mangaPreview.mangaId + "/chapter")
        const resp = await fetch(HOST + "/api/content/" + props.mangaPreview.mangaId + "/chapter", {
            method: "POST",
            body: JSON.stringify({title: chapterName}),
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
            chapterNumber: respData.chapterNumber
        }]))

    }

    return <div className="my-4 max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
        <a href="/catalog">To catalog</a>
        <h1 className="text-3xl font-bold leading-9 sm:text-4xl sm:leading-tight">{props.mangaPreview.title}</h1>
        <img src={props.mangaPreview.cover} alt={props.mangaPreview.cover} width="480" height="480"/>
        <p className="mt-6 text-base md:max-w-xs">{props.mangaPreview.description}</p>
        <h2>There is {chapters.length} chapters already!</h2>
        <form>
            <input type="text" value={chapterName} onChange={e => setChapterName(e.target.value)}/>
            <input type="button" value="Add chapter" onClick={addChapter}/>
        </form>
        <ol>
            {chapters.map(c => <li>{c.title}</li>)}
        </ol>
    </div>
}