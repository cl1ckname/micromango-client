import {useState} from "react";
import {GENRES} from "@/dto/catalog";
export default function GenreList(props: {
    value: number[]
    onChange: (i: number[]) => any
}) {
    function getHandler(i: number) {
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
        {Object.keys(GENRES).map(i => <li key={i}>
            <span>
                <input
                    type="checkbox"
                    checked={props.value.includes(Number.parseInt(i))}
                    onChange={getHandler(Number.parseInt(i))}
                />{GENRES[Number.parseInt(i)]}</span>
        </li>)}
    </ul>
}