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

    const [page, setPage] = useState(1)
    const pages = props.pages.sort((a,b) => a.number - b.number) || []
    useEffect(() => {
        const pageNumberStr = router.query["page"] as string
        const pageNumber = Number.parseInt(pageNumberStr)
        if (!pageNumber) {
            router.query["page"] = "1"
            router.push({
                pathname: router.pathname,
                query: {
                    ...router.query
                }
            })
        }
        if (pageNumber > pages.length) {
            router.query["page"] = "1"
            router.push({
                pathname: router.pathname,
                query: {
                    ...router.query
                }
            })
        }
        setPage(pageNumber)
    }, [router, page]);

    useEffect(() => {
        document.addEventListener("keydown", e => {
            if (e.key === "ArrowRight") {
                router.query["page"] = page + 1 + ""
                router.push({
                    pathname: router.pathname,
                    query: {
                        ...router.query
                    }
                }, undefined, {shallow: true})
            } else if (e.key === "ArrowLeft") {
                router.query["page"] = page - 1 + ""
                router.push({
                    pathname: router.pathname,
                    query: {
                        ...router.query
                    },
                }, undefined, {shallow: true})
            }
        })
    }, [page]);
    return <>
        <h1>Chapter {props.number} - page {pages[page-1]?.number}</h1>
        <img src={pages[page - 1]?.image} width="1500"/>
        </>
}