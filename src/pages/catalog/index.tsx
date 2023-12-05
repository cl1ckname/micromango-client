import {MangaPreviewResponse} from "@/dto/catalog";
import {HOST} from "@/app/globals";
import {fetchOr404} from "@/common/fetch";
import {GetServerSidePropsContext} from "next";
import {MangaPreviewCard} from "@/components/mangaPreviewCard";
import GenrePick from "@/components/genrePickForm";

interface HomeProps {
    catalog: MangaPreviewResponse[]
}
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const {auth} = ctx.req.cookies
    let url = HOST + "/api/catalog"
    let q = []
    for (const k of Object.keys(ctx.query)) {
        q.push(k+"="+ctx.query[k])
    }
    if (q.length) {
        url += "?" + q.join("&")
    }
    const res = await fetchOr404<MangaPreviewResponse[]>(url, auth)
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

