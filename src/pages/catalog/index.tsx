import {MangaPreviewResponse} from "@/dto/catalog";
import {HOST} from "@/app/globals";
import {fetchOr404} from "@/common/fetch";
import {GetServerSidePropsContext} from "next";

interface HomeProps {
    catalog: MangaPreviewResponse[]
}
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const {auth} = ctx.req.cookies
    const res = await fetchOr404<MangaPreviewResponse[]>(HOST + "/api/catalog", auth)
    return { props: { catalog: res || [] } }
}

export default function Home(props: HomeProps) {
    return (
        <main className="min-h-screen">
            <a href="/catalog/add">Add manga</a>
            <div className="flex flex-row">
                {
                    props.catalog.map(MangaPreviewCard)
                }
            </div>
        </main>
    )
}

function MangaPreviewCard(props: MangaPreviewResponse) {
    return <div
        className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href={"catalog/manga/" + props.mangaId}>
            <img className="object-cover" src={props.cover} alt="product image"/>
        </a>
        <div className="mt-4 px-5 pb-5">
            <a href={"catalog/manga/" + props.mangaId}>
                <h5 className="text-xl tracking-tight text-slate-900">{props.title}</h5>
            </a>
        </div>
    </div>
}