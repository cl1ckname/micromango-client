import {GetServerSidePropsContext} from "next";
import {MangaResponse} from "@/dto/catalog";
import {notFound} from "next/navigation";

interface MangaPreviewProps {
    mangaPreview: MangaResponse
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.query;
    const host =  process.env["SERVER_ADDR"]
    const res = await fetch(host + "/api/catalog/" + id);
    if (res.status == 404) {
        return notFound()
    }
    if (!res.ok) {
        console.error(await res.json())
        return
    }
    const mangaPreview = await res.json() as MangaResponse;
    return { props: { mangaPreview } };
}
export default function MangaPreview(props: MangaPreviewProps) {
    const chapters = props.mangaPreview.content.chapters || []
    return <>
        <a href="/catalog">To catalog</a>
        <h1>{props.mangaPreview.title}</h1>
        <img src={props.mangaPreview.cover} alt={props.mangaPreview.cover} width="480" height="480"/>
        <q>{props.mangaPreview.description}</q>
        <h2>There is {chapters.length} chapters already!</h2>
        <ol>
            {chapters.map(c => <li>{c.title}</li>)}
        </ol>
    </>
}