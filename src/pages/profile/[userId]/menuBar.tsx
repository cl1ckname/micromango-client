import {useState} from "react";
import {STATUS_LIST} from "@/dto/profile";
import {MangaPreviewResponse} from "@/dto/catalog";
import {fetchOr404} from "@/common/fetch";
import {HOST} from "@/app/globals";
import {MangaPreviewCard} from "@/components/mangaPreviewCard";


const nullList = Object.fromEntries(STATUS_LIST.map((_, i) => [i, null]))
type ListPreload = Record<number, MangaPreviewResponse[] | null>
export function MenuBar(props: {
    userId: string
}) {
    const [tab, setTab] = useState(0)
    const [lists, setLists] = useState<ListPreload>(nullList)
    async function loadList(i: number) {
        if (lists[i]) {
            return
        }
        const url = `${HOST}/api/profile/${props.userId}/list?list=${i+1}`
        const list= await fetchOr404<MangaPreviewResponse[]>(url)
        setLists(prev => ({...prev, [i]: list}))
        console.log("new data!")
    }

    function handleSwitch(i: number) {
        return async () => {
            setTab(i)
            await loadList(i)
        }
    }

    const passive = " flex-grow text-center text-xl bg-green-100 fit inline-block"
    const active = " flex-grow text-center text-xl bg-green-400 fit inline-block"
    console.log(tab, lists)
    return <>
        <ul className={"flex justify-around"}>
            {STATUS_LIST.slice(1).map((e, i) =>
                <li className={i == tab ? active : passive} onClick={handleSwitch(i)}>
                    {e}
                </li>)}
        </ul>
        {lists[tab] ? <div className="flex">
            {lists[tab]?.map(e => MangaPreviewCard(e))}
        </div> : <p>nothing</p>}

    </>
}