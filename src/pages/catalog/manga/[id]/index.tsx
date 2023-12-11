import {GetServerSidePropsContext} from "next";
import {GENRES, MangaResponse} from "@/dto/catalog";
import {HOST} from "@/app/globals";
import {ChapterTable} from "@/pages/catalog/manga/[id]/chapterTable";
import {Tabs} from "@/pages/catalog/manga/[id]/previewTabs";
import StatusSelect from "@/pages/catalog/manga/[id]/statusSelect";
import {fetchOr404} from "@/common/fetch";
import {STATUS_LIST} from "@/dto/profile";


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const {id} = ctx.query;
    const {auth} = ctx.req.cookies
    const res = await fetchOr404<MangaResponse>(HOST + "/api/catalog/" + id, auth);
    if (!res) {
        return {notFound: true}
    }
    res.genres = res.genres || []
    return {props: res};
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
                <StatusSelect mangaId={props.mangaId} status={props.list}/>
            </div>
            <div className="grow">
                <Tabs
                    description={<DescriptionTab
                        description={props.description}
                        genres={props.genres}
                        listStats={props.listStats}
                    />}
                    chapter={<ChapterTable mangaId={props.mangaId} chapterHeads={chapters}/>}
                />
            </div>
        </div>
    </div>
}

function DescriptionTab(props: {
    description: string
    genres: number[]
    listStats: Record<number, number>
}) {
    return <div>
        <div className="min-h-[7em]">
            {props.description}
        </div>
        <div>
            {props.genres.map(g =>
                <span className={"text-sm inline-block font-medium me-2 px-2.5 py-0.5 rounded " + GENRES[g].className}>{GENRES[g].title}</span>)}
        </div>
        <div className="grid grid-cols-2">
            {ListStats(props.listStats)}
        </div>
    </div>
}

function ListStats(props: Record<number, number>) {
    const sum = Object.values(props).reduce((i,j) => i+j)
    return <div>
        In lists: {sum}
        <ul>
            {STATUS_LIST.map((k, i) =>
                <li key={k}>
                    {k} - {props[i] || 0}: {((props[i] || 0) / sum)
                    .toLocaleString(undefined, {style: "percent", minimumFractionDigits: 2})}
                </li>
            )}
        </ul>
    </div>
}