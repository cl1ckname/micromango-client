import {GENRES} from "@/dto/catalog";
import Tribox from "@/components/tribox";
import {useState} from "react";

export default function GenrePick(props: {
    value: Record<number, boolean>
    onChange: (r: Record<number, boolean>) => any
}){
    const [genres, setGenres] = useState<Record<number, boolean>>({})

    function handleCheck() {
        return (v: boolean | null, ) => {
            const newV = (v == null) ? undefined : v
            setGenres(prev => ({...prev, genre: newV}))
            props.onChange(genres)
        }
    }

    return <ul>
        {Object.values(GENRES).map((i, ind) => <li key={i.title}>
            <span><Tribox onChange={handleCheck()} checked={props.value[ind]}/>{i.title}</span>
        </li>)}
    </ul>
}