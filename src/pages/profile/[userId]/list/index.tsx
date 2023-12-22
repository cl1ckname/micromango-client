import {GetServerSidePropsContext} from "next";
import {ProfileEncoded} from "@/dto/user";
import {ChangeEvent, useEffect, useState} from "react";
import {ListRecord, ListResponse} from "@/dto/profile";
import {GetLists, GetProfile, RateManga} from "@/api/profile";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const userId = context.query.userId as string | undefined
    if (!userId) {
        return {notFound: true}
    }
    const res = await GetProfile(userId)
    if (!res) {
        return {notFound: true}
    }
    return {
        props: res
    }
}

export default function ListPage(props: ProfileEncoded) {
    let [list, setList] = useState<ListResponse | null>(null)
    const [prefix, setPrefix] = useState("")
    async function fetchLists() {
        const list = await GetLists(props.userId)
        if (!list) {
            return
        }
        setList(list)
    }

    useEffect(() => {
        fetchLists()
    }, []);

    if (!list) {
        return <></>
    }

    return <div className="container mx-auto my-5 p-5">
        <h1 className="text-2xl">
            <a href={`/profile/${props.userId}`} className="text-[0.5em]">← back</a> {props.username}
        </h1>
        <div className="w-full mb-5">
            <div className="flex justify-between bg-rose-200">
                <h1 className="text-xl">Search</h1>
                <p>hide</p>
            </div>
            <input className="bg-gray-200 w-full"
                   placeholder="Manga title" value={prefix} onChange={e => setPrefix(e.target.value)}/>
        </div>
        <ListTable list={list[1]} title={"Reading"} prefix={prefix}/>
        <ListTable list={list[2]} title={"To read"} prefix={prefix}/>
        <ListTable list={list[3]} title={"Completed"} prefix={prefix}/>
        <ListTable list={list[4]} title={"Drop"} prefix={prefix}/>
    </div>
}

function ListTable(props: {
    list?: ListRecord[]
    title: string
    prefix: string
}) {
    let list = props.list || []
    list = list.filter(r => r.title.toLowerCase().startsWith(props.prefix.toLowerCase()))
    list.sort((a, b) => (b.rate || 0) - (a.rate || 0))

    function handleRate(mangaId: string) {
        return function (e: ChangeEvent<HTMLInputElement>) {
            const rate = Number.parseInt(e.target.value)
            if (!isNaN(rate))
                return RateManga(mangaId, rate)
        }
    }

    return <div className="w-full">
        <div className="flex justify-between bg-rose-200">
            <h1 className="text-xl">{props.title}</h1>
            <p>hide ({list.length})</p>
        </div>
        <table className="w-full">
            <thead>
            <tr>
                <td className="font-bold underline">#</td>
                <td className="font-bold underline">Title</td>
                <td className="font-bold underline">Rate</td>
            </tr>
            </thead>
            {list.map(((r, i) =>
                <tr key={r.mangaId} className="hover:bg-gray-200">
                    <td>{i}</td>
                    <td><a href={`/catalog/manga/${r.mangaId}`} className="hover:underline">
                        {r.title}
                    </a></td>
                    <td>
                        <input defaultValue={r.rate} type="number" max="10" min="1" onChange={handleRate(r.mangaId)}/>
                    </td>
                </tr>))}
        </table>
    </div>
}