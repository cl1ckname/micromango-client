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
        <main className="min-h-screen mx-5">
            <div className="flex flex-row justify-between">
                <h1 className="text-3xl">Catalog</h1>
                <a href="/catalog/add">Add manga</a>
            </div>
            <div className="grid grid-cols-6 gap-5">
                <div className="col-span-5">
                    <input type="text" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-100 sm:text-xs  focus:border-blue-500 my-3" placeholder="Search for title"/>
                    <div className="grid grid-cols-5 gap-20">
                        {
                            props.catalog.map(MangaPreviewCard)
                        }
                    </div>
                </div>
                <GenrePick value={{}} onChange={() => {}}/>
            </div>
        </main>
    )
}

