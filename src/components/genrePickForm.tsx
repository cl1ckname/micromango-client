import {GENRES} from "@/dto/catalog";
import Tribox from "@/components/tribox";
import {useEffect, useState} from "react";

export default function GenrePick(props: {
    value: Record<number, boolean>
    onChange: (r: Record<number, boolean>) => any
}){
    const [genres, setGenres] = useState<Record<number, boolean>>({})

    function handleCheck(genre: number) {
        return (v: boolean | null, ) => {
            const newV = (v == null) ? undefined : v
            setGenres(prev => ({...prev, genre: newV}))
            props.onChange(genres)
        }
    }

    return <ul>
        {Object.values(GENRES).map((i, ind) => <li key={i}>
            <span><Tribox onChange={handleCheck(ind)} checked={props.value[ind]}/>{i}</span>
        </li>)}
    </ul>
}