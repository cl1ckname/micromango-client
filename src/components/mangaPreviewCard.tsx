import {MangaPreviewResponse} from "@/dto/catalog";

export function MangaPreviewCard(props: MangaPreviewResponse) {
    return <div
        className="relative m-10 flex max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md min-w-[200px]">
        <a className="relative flex h-60 overflow-hidden" href={"catalog/manga/" + props.mangaId}>
            <img className="object-cover" src={props.cover} alt="product image"/>
        </a>
        <div className="mt-4 px-5 pb-5">
            <a href={"catalog/manga/" + props.mangaId}>
                <h5 className="text-xl tracking-tight text-slate-900 absolute bottom-0">{props.title}</h5>
            </a>
        </div>
    </div>
}