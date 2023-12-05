import {useState} from "react";
import {GENRES} from "@/dto/catalog";

export default function GenreList(props: {
    value: Record<number, boolean>
    onChange: (i: number) => any
}){

    return <ul>
        {Object.values(GENRES).map((i, ind) => <li key={i}>
            <span>
                <input
                    type="checkbox"
                    checked={props.value[ind]}
                    onChange={_ => ind}
                />{i}</span>
        </li>)}
    </ul>
}