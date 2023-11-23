import {MangaResponse} from "@/dto/catalog";

interface HomeProps {
    catalog: MangaResponse[]
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
    const mangas = await fetch(host + "/api/catalog").then(res => res.json())
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
                {props.catalog.map((e, i) => <li key={i}>{e.title} - {e.description}</li>)}
            </ul>
        </main>
    )
}
