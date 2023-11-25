import {MangaPreviewResponse, MangaResponse} from "@/dto/catalog";

interface HomeProps {
    catalog: MangaPreviewResponse[]
}
export async function getServerSideProps() {
    const host =  process.env["SERVER_ADDR"]
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
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <a href="/catalog/add">Add manga</a>
            <ul>
                {props.catalog.map((e, i) =>
                    <li key={i}>
                        <a href={"catalog/manga/" + e.mangaId}><img alt={e.cover} src={e.cover}/>{e.title}</a>
                    </li>)}
            </ul>
        </main>
    )
}
