import {useState} from "react";
import {GENRES} from "@/dto/catalog";

export function GenreList2(props: {
    value: Record<number, boolean>
    onChange: (i: number) => any
}) {

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

export default function GenreList(props: {
    value: string[]
    onChange: (i: string[]) => any
}) {
    function getHandler(i: string) {
        return function () {
            const genresCopy = [...props.value]
            const index = genresCopy.indexOf(i);
            if (index !== -1) {
                genresCopy.splice(index, 1);
            } else {
                genresCopy.push(i)
            }
            props.onChange(genresCopy)
        }
    }

    return <ul>
        {Object.values(GENRES).map(i => <li key={i}>
            <span>
                <input
                    type="checkbox"
                    checked={props.value.includes(i)}
                    onChange={getHandler(i)}
                />{i}</span>
        </li>)}
    </ul>
}