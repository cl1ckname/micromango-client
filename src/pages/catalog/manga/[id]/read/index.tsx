import {Chapter, MangaContentResponse} from "@/dto/catalog";
import {GetServerSidePropsContext} from "next";
import {HOST} from "@/app/globals";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {notFound} from "next/navigation";
import ReadingLayout from "@/pages/catalog/manga/[id]/read/layout";

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

    function nextPage() {
        router.query["page"] = page + 1 + ""
        return router.push({
            pathname: router.pathname,
            query: {
                ...router.query
            }
        }, undefined, {shallow: true})
    }

    function previousPage() {
        router.query["page"] = page - 1 + ""
        return router.push({
            pathname: router.pathname,
            query: {
                ...router.query
            },
        }, undefined, {shallow: true})
    }

    function setPageAndChapter(chapterNumber: number, pageNumber: number) {
        router.query["page"] = pageNumber + ""
        router.query["chapter"] = chapterNumber + ""
        return router.push({
            pathname: router.pathname,
            query: {
                ...router.query
            }
        })
    }

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
        let chapterNumberStr = router.query["chapter"] as string
        if (!chapterNumberStr) {
            chapterNumberStr = "1"
        }
        const chapterNumber = Number.parseInt(chapterNumberStr)
        const pageNumberStr = router.query["page"] as string
        if (!pageNumberStr) {
            setPageAndChapter(chapterNumber, 1)
        }
        const pageNumber = Number.parseInt(pageNumberStr)
        if (pageNumber > chapter.pages.length) {
            if (props.chapters.length > chapterNumber) {
                setPageAndChapter(chapterNumber + 1, 1)
            } else {
                router.push(`/catalog/manga/${props.mangaId}`)
            }
        }
        if (pageNumber <= 0) {
            if (pageNumber < 0) {
                setPageAndChapter(chapterNumber, chapter.pages.length)
            }
            if (chapterNumber > 1) {
                setPageAndChapter(chapterNumber -1, -1)
            } else {
                router.push(`/catalog/manga/${props.mangaId}`)
            }
        }
        setPage(pageNumber)
    }, [router, page]);

    async function keyboardHandler(e: KeyboardEvent) {
        if (e.key === "ArrowRight") {
            await nextPage()
        } else if (e.key === "ArrowLeft") {
            await previousPage()
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", keyboardHandler);
        return () => {
            document.removeEventListener("keydown", keyboardHandler)
        }
    }, [page])

    if (!chapter) {
        return "loading"
    }

    return <>
        <ReadingLayout
            page={page}
            chapter={chapter.number}
            mangaId={chapter.mangaId}
            onNextPage={nextPage}
            onPreviousPage={previousPage}
        />
        <img
            alt={"not found"}
            src={chapter?.pages[page - 1]?.image}
            width="1500"
            className="mx-auto"
        />
        </>
}
