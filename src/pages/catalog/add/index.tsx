import {FormEvent, useState} from "react";

interface AddMangaProps {
    host: string
}
export const getStaticProps = (_: any) => {
    const host =  process.env["SERVER_ADDR"]
    if (!host) {
        console.warn("invalid host: " + host)
    }
    return {
        props: { host }
    }
}
export default function AddManga(props: AddMangaProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const createManga = async (e: FormEvent) => {
        e.preventDefault()
        await fetch(props.host + "/api/catalog", {
            method: "POST",
            headers: new Headers({
                "content-type": "application/json"
            }),
            mode: "cors",
            body: JSON.stringify({title, description})
        })
    }

    return <>
        <h1>Add manga</h1>
        <form onSubmit={createManga}>
            <label>Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
            <label>Description</label>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)}/>
            <label>Create</label>
            <input type="submit"/>
        </form>
    </>
}