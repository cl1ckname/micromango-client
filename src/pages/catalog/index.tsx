import {MangaPreviewResponse, MangaResponse} from "@/dto/catalog";

interface HomeProps {
    catalog: MangaPreviewResponse[]
}

export async function getServerSideProps() {
    const host = process.env["SERVER_ADDR"]
    if (!host) {
        console.warn("invalid host: " + host)
        return {
            props: {
                catalog: []
            }
        }
    }
    const response = await fetch(host + "/api/catalog")
    if (!response.ok) {
        console.error(await response.json())
        throw "Invalid response code: " + response.status
    }
    const mangas = await response.json()
    return {
        props: {
            catalog: mangas || []
        }
    }
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