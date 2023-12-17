import {GENRES} from "@/dto/catalog";
import Tribox from "@/components/tribox";

export default function GenrePick(props: {
    value: Record<number, boolean>
    onChange: (r: Record<number, boolean>) => any
}){
    const genres = Object.assign({}, props.value)
    function getHandleCheck(i: number) {
        return (v: boolean | null, ) => {
            if (v != null) {
                genres[i] = v
            } else {
                delete genres[i]
            }
            props.onChange(genres)
        }
    }

    return <ul>
        {Object.values(GENRES).map((i, ind) => <li key={i.title}>
            <span>
                <Tribox onChange={getHandleCheck(ind+1)} checked={genres[ind+1]}/>{
                i.title}
            </span>
        </li>)}
    </ul>
}