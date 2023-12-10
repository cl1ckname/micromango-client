import {MangaPreviewResponse} from "@/dto/catalog";
import {HOST} from "@/app/globals";
import {fetchOr404} from "@/common/fetch";
import {GetServerSidePropsContext} from "next";
import {MangaPreviewCard} from "@/components/mangaPreviewCard";
import GenrePick from "@/components/genrePickForm";
import {useRouter} from "next/router";
import {useState, KeyboardEvent} from "react";

interface HomeProps {
    catalog: MangaPreviewResponse[]
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const {auth} = ctx.req.cookies
    let url = HOST + "/api/catalog"
    let q = []
    for (const k of Object.keys(ctx.query)) {
        q.push(k + "=" + ctx.query[k])
    }
    if (q.length) {
        url += "?" + q.join("&")
    }
    const res = await fetchOr404<MangaPreviewResponse[]>(url, auth)
    return {props: {catalog: res || []}}
}

function parseQueryIntArr(genre: string | string[] | undefined) {
    if (!genre) return []
    if (typeof genre === "string") {
        return [Number.parseInt(genre)]
    }
    return genre.map(i => Number.parseInt(i)).filter(i => !!i)
}

export default function Home(props: HomeProps) {
    const router = useRouter()
    const genreMap: Record<number, boolean> = {}
    let {starts} = router.query
    if (!starts || Array.isArray(starts)) {
        starts = ""
    }

    function getGenres(): number[] {
        const {genre} = router.query
        return parseQueryIntArr(genre);
    }

    function excludeGenres(): number[] {
        const {exclude_genre} = router.query
        // console.log("ex", exclude_genre, router.query)
        return parseQueryIntArr(exclude_genre);
    }

    for (const i of getGenres()) {
        genreMap[i] = true
    }
    for (const i of excludeGenres()) {
        genreMap[i] = false
    }

    async function handleTitleEnter(starts: string) {
        const query = {...router.query, starts} as any
        if (!query.starts)
            delete query.starts
        return router.replace({
            pathname: router.pathname,
            query
        })
    }

    function handlePickGenre(r: Record<number, boolean>) {
        const newQ: Record<"genre" | "exclude_genre", string[]> = {genre: [], exclude_genre: []}
        for (const k in r) {
            const ki = Number.parseInt(k)
            const v = r[ki]
            if (v) {
                newQ.genre.push(k)
            } else {
                newQ.exclude_genre.push(k)
            }
        }
        router.query = newQ
        router.replace({
            pathname: router.pathname,
            query: newQ
        })
    }

    return (
        <main className="min-h-screen mx-5">
            <div className="flex flex-row justify-between">
                <h1 className="text-3xl">Catalog</h1>
                <a href="/catalog/add">Add manga</a>
            </div>
            <div className="grid grid-cols-6 gap-5">
                <div className="col-span-5">
                    <QueryInput value={starts} onChange={handleTitleEnter}/>
                    <div className="grid grid-cols-5 gap-20">
                        {props.catalog.map(MangaPreviewCard)}
                    </div>
                </div>
                <GenrePick value={genreMap} onChange={handlePickGenre}/>
            </div>
        </main>
    )
}

function QueryInput(props: {
    value: string
    onChange: (v: string) => any
}) {
    const [query, setQuery] = useState<string>(props.value)

    function handleEnter(e: KeyboardEvent<HTMLInputElement>) {
        if (e.code === "Enter")
            props.onChange(query)
    }

    function handleClick() {
        props.onChange(query)
    }

    return <div className="relative">
        <button
            className={"absolute right-1 bottom-[0.1em] text-xl"}
            onClick={handleClick}>
            🔎
        </button>
        <input type="text"
               className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-100 sm:text-xs  focus:border-blue-500 my-3"
               placeholder="Search for title"
               value={query}
               onChange={e => setQuery(e.target.value)}
               onKeyDown={handleEnter}
        />
    </div>
}