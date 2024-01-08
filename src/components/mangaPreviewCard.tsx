import {MangaPreviewResponse} from "@/dto/catalog";
import ImageDefault from "./imageDefault";
import { DEFAULT_MANGA_THUMB } from "@/app/globals";

export function MangaPreviewCard(props: MangaPreviewResponse) {
    return <div
        className="rounded-lg border border-gray-100 bg-white shadow-md" key={props.mangaId}>
        <div className="relative">
            <div className="absolute bg-green-800 text-white w-[3em] left-[-5px] top-1 rounded-lg">
                {props.rate?.toFixed(1)}
            </div>
        </div>
        <a href={"catalog/manga/" + props.mangaId}>
            <ImageDefault src={props.thumbnail} default={DEFAULT_MANGA_THUMB}/>
        </a>
        <a href={"catalog/manga/" + props.mangaId}>
            <h5 className="text-xl tracking-tight text-slate-900">{props.title}</h5>
        </a>
    </div>
}