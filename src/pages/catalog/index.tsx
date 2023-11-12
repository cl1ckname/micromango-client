import {MangaResponse} from "@/dto/catalog";

interface HomeProps {
    catalog: MangaResponse[]
}
export async function getServerSideProps() {
    const mangas = await fetch("http://localhost:8080/catalog").then(res => res.json())
    return {
        props: {
            catalog: mangas
        }
    }
}

export default function Home(props: HomeProps) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <ul>
                {props.catalog.map(e => <li>{e.title} - {e.description}</li>)}
            </ul>
        </main>
    )
}
