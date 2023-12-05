import {MangaPreviewResponse} from "@/dto/catalog";
import {HOST} from "@/app/globals";
import {fetchOr404} from "@/common/fetch";
import {GetServerSidePropsContext} from "next";
import {MangaPreviewCard} from "@/components/mangaPreviewCard";

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

