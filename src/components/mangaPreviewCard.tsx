import {MangaPreviewResponse} from "@/dto/catalog";

export function MangaPreviewCard(props: MangaPreviewResponse) {
    return <div
        className="rounded-lg border border-gray-100 bg-white shadow-md" key={props.mangaId}>
        <div className="relative">
            <div className="absolute bg-green-800 text-white w-[3em] left-[-5px] top-1 rounded-lg">
                {props.rate.toFixed(1)}
            </div>
        </div>
        <a href={"catalog/manga/" + props.mangaId}>
            <img className="object-cover" src={props.cover} alt="product image"/>
        </a>
        <a href={"catalog/manga/" + props.mangaId}>
            <h5 className="text-xl tracking-tight text-slate-900">{props.title}</h5>
        </a>
    </div>
}