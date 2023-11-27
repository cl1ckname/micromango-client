import {Chapter, MangaContentResponse} from "@/dto/catalog";
import {GetServerSidePropsContext} from "next";
import {HOST} from "@/app/globals";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {notFound} from "next/navigation";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {id, chapter} = context.query;
    if (!id || !chapter) {
        return {props: {}}
    }
    const chapterRes = await fetch(`${HOST}/api/content/${id}`)
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
export default function MangaView(props: MangaContentResponse) {
    const router = useRouter()
    const [page, setPage] = useState(1)
    const [chapter, setChapter] = useState<Chapter>()

    useEffect( () => {
        const chapterNumberStr = router.query["chapter"] as string
        if (!chapterNumberStr) {
            router.query["chapter"] = "1"
            router.push({
                pathname: router.pathname,
                query: {
                    ...router.query
                }
            })
        }
        const chapterNumber = Number.parseInt(chapterNumberStr)
        const chapterMeta = props.chapters[chapterNumber-1]
        if (!chapterMeta) {
            notFound()
        }
        fetch(`${HOST}/api/content/${props.mangaId}/chapter/${chapterMeta.chapterId}`).then(async chapterRes => {
            if (chapterRes.status == 404) {
                notFound()
            }
            if (!chapterRes.ok) {
                throw await chapterRes.json()
            }
            const c = await chapterRes.json() as Chapter
            c.pages = c.pages.sort((a,b) => a.number - b.number)
            setChapter(c)
        })
    }, [router]);


    useEffect(() => {
        if (!chapter) {
            return
        }
        const pageNumberStr = router.query["page"] as string
        if (!pageNumberStr) {
            router.query["page"] = "1"
            router.push({
                pathname: router.pathname,
                query: {
                    ...router.query
                }
            })
        }
        const pageNumber = Number.parseInt(pageNumberStr)
        let chapterNumberStr = router.query["chapter"] as string
        if (!chapterNumberStr) {
            chapterNumberStr = "1"
        }
        const chapterNumber = Number.parseInt(chapterNumberStr)
        if (pageNumber > chapter.pages.length) {
            if (props.chapters.length > chapterNumber) {
                router.query["page"] = "1"
                router.query["chapter"] = chapterNumber + 1 + ""
                router.push({
                    pathname: router.pathname,
                    query: {
                        ...router.query
                    }
                })
            } else {
                router.push(`/catalog/manga/${props.mangaId}`)
            }
        }
        if (pageNumber <= 0) {
            if (pageNumber < 0) {
                router.query["page"] = chapter.pages.length + ""
                router.push({
                    pathname: router.pathname,
                    query: {
                        ...router.query
                    }
                })
            }
            if (chapterNumber > 1) {
                router.query["page"] = "-1"
                router.query["chapter"] = chapterNumber - 1 + ""
                router.push({
                    pathname: router.pathname,
                    query: {
                        ...router.query
                    }
                })
            } else {
                router.push(`/catalog/manga/${props.mangaId}`)
            }
        }
        setPage(pageNumber)
    }, [router, page]);

    async function keyboardHandler(e: KeyboardEvent) {
        if (e.key === "ArrowRight") {
            router.query["page"] = page + 1 + ""
            await router.push({
                pathname: router.pathname,
                query: {
                    ...router.query
                }
            }, undefined, {shallow: true})
        } else if (e.key === "ArrowLeft") {
            router.query["page"] = page - 1 + ""
            await router.push({
                pathname: router.pathname,
                query: {
                    ...router.query
                },
            }, undefined, {shallow: true})
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", keyboardHandler);
        return () => {
            document.removeEventListener("keydown", keyboardHandler)
        }
    }, [page])
    return <>
        <h1>Chapter {chapter?.number} - page {chapter?.pages[page-1]?.number}</h1>
        <img
            alt={"not found"}
            src={chapter?.pages[page - 1]?.image}
            width="1500"
            className="mx-auto"
        />
        </>
}
