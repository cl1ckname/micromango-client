import {GetServerSidePropsContext} from "next";
import {fetchOr404} from "@/common/fetch";
import {Profile, ProfileEncoded} from "@/dto/user";
import {HOST} from "@/app/globals";
import {useEffect, useState} from "react";
import {ListRecord, ListResponse} from "@/dto/profile";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const userId = context.query.userId as string | undefined
    if (!userId) {
        return {notFound: true}
    }
    const res = await fetchOr404<Profile>(`${HOST}/api/profile/${userId}`)
    if (!res) {
        return {notFound: true}
    }
    let profile: ProfileEncoded | null
    try {
        profile = {...res, bio: JSON.parse(res.bio)}
    } catch (e) {
        console.warn(e)
        profile = {...res, bio: {gender: "Other", status: "", description: ""}}
    }
    return {
        props: profile
    }
}

export default function ListPage(props: ProfileEncoded) {
    let [list, setList] = useState<ListResponse | null>(null)

    async function fetchLists() {
        const url = `${HOST}/api/profile/${props.userId}/list`
        const list = await fetchOr404<ListResponse>(url)
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
        <div
            style={{background: "url(\"https://cover.imglib.info/uploads/users/141436/f20b284b-ac02-4077-8bae-208b50a5d225.jpg\")"}}
            className={"bg-cover box-border pt-[30%]"}></div>
        <ListTable list={list[1]} title={"Reading"}/>
        <ListTable list={list[2]} title={"To read"}/>
        <ListTable list={list[3]} title={"Completed"}/>
        <ListTable list={list[4]} title={"Drop"}/>
    </div>
}

function ListTable(props: {
    list?: ListRecord[]
    title: string
}) {
    const list = props.list || []
    list.sort((a, b) => (b.rate || 0) - (a.rate || 0))

    return <div className="w-full">
        <div className="flex justify-between bg-rose-200">
            <h1 className="text-xl">{props.title}</h1>
            <p>hide</p>
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
                        <input value={r.rate} type="number" max="10" min="1"/>
                    </td>
                </tr>))}
        </table>
    </div>
}