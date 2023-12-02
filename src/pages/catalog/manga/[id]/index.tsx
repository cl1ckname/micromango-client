import {GetServerSidePropsContext} from "next";
import {MangaResponse} from "@/dto/catalog";
import {HOST} from "@/app/globals";
import {ChapterTable} from "@/pages/catalog/manga/[id]/chapterTable";
import {Tabs} from "@/pages/catalog/manga/[id]/previewTabs";
import StatusSelect from "@/pages/catalog/manga/[id]/statusSelect";


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {id} = context.query;
    const res = await fetch(HOST + "/api/catalog/" + id);
    console.log(res.status)
    if (res.status == 404) {
        return {notFound: true}
    }
    if (!res.ok) {
        console.error(await res.json())
        return
    }
    const mangaPreview = await res.json() as MangaResponse;
    return {props: mangaPreview};
}

export default function MangaPreview(props: MangaResponse) {
    const chapters = props.content.chapters || []

    return <div className="my-4 border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
        <a href="/catalog">To catalog</a>
        <h1 className="text-3xl font-bold leading-9 sm:text-4xl sm:leading-tight">{props.title}</h1>
        <h3 className="">{props.createdAt}</h3>
        <div className="flex justify-items-center w-full">
            <div className="min-w-fit pr-2">
                <img src={props.cover} alt={props.cover} width="240" height="320"/>
                <a href={`/catalog/manga/${props.mangaId}/read?chapter=1&page=1`}>
                    <button
                        className="bg-indigo-500 text-white active:bg-indigo-600 text-m font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-full mt-1"
                        type="button" >Start reading
                    </button>
                </a>
                <a href={`/catalog/manga/${props.mangaId}/edit`}>
                    <button
                        className="bg-orange-500 text-white active:bg-indigo-600 text-m font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-full mt-1"
                        type="button" >Edit
                    </button>
                </a>
                <StatusSelect mangaId={props.mangaId}/>
            </div>
            <div className="grow">
                <Tabs
                    description={props.description}
                    chapter={<ChapterTable mangaId={props.mangaId} chapterHeads={chapters}/>}
                />
            </div>
        </div>


    </div>
}