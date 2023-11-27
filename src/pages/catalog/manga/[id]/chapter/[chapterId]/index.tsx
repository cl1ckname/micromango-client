import {Chapter} from "@/dto/catalog";
import {GetServerSidePropsContext} from "next";
import {HOST} from "@/app/globals";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {id, chapterId} = context.query;
    if (!id || !chapterId) {
        throw "invalid path"
    }
    const chapterRes = await fetch(`${HOST}/api/content/${id}/chapter/${chapterId}`)
    console.log(chapterRes.status)
    if (chapterRes.status == 404) {
        return {notFound: true}
    }
    if (!chapterRes.ok) {
        throw await chapterRes.json()
    }
    return {
        props: await chapterRes.json()
    }
}
export default function ChapterView(props: Chapter) {
    const router = useRouter()
    const {id, chapterId } = router.query

    const [page, setPage] = useState(1)
    const pages = props.pages || []
    useEffect(() => {
        const pageNumberStr = router.query["page"] as string
        const pageNumber = Number.parseInt(pageNumberStr)
        if (!pageNumber) {
            router.query["page"] = "1"
            router.push(router)
        }
        if (pageNumber > pages.length) {
            router.query["page"] = "1"
            router.push(router)
        }
        setPage(pageNumber)
    }, [router, page]);

    async function addPage() {
        fetch(`${HOST}/api/content/${id}/chapter/${chapterId}/page`, {
            method: "POST",
            body: JSON.stringify({
                chapterId: props.chapterId,
                number: pages.length + 1
            })
        })
    }

    return <>
        {(pages.length) ? <button>Next page</button> : <button>Add first page</button>}<br/>
        {props.title}<br/>
        {JSON.stringify(props)}<br/>
        {page}
        </>
}