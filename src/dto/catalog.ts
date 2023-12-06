export interface MangaResponse {
    mangaId: string
    title: string
    cover: string
    description: string
    content: MangaContentResponse
    createdAt: string
    list?: number
    genres: number[]
}

export interface MangaEditProperties {
    title: string
    cover?: File
    description: string
    genres: number[]
}

export interface MangaPreviewResponse {
    mangaId: string
    title: string
    cover: string
}

export interface MangaContentResponse {
    mangaId: string
    chapters: ChapterHead[]
}

export interface ChapterHead {
    chapterId: string
    number: number
    title: string
    createdAt: string
}

export interface Chapter {
    chapterId: string
    mangaId: string
    number: number
    title: string
    pages: PageHead[]
    createdAt: string
}

export interface PostChapter {
    title: string,
    number: number
}

export interface PageHead {
    pageId: string
    number: number
    image: string

}

export interface PutChapter {
    chapterId: string
    title: string
}

export interface Genre {
    title: string
    className: string
}
export const GENRES: Record<number, Genre> = {
    1: {title: 'Action', className: "bg-red-200"},
    2: {title: 'Adventure', className: "bg-cyan-400"},
    3: {title: 'Comedy', className: "bg-amber-200"},
    4: {title: 'Mystery', className: "bg-violet-300"},
    5: {title: 'Drama', className: "bg-sky-300"},
    6: {title: 'Ecchi', className: "bg-red-300"},
    7: {title: 'Fantasy', className: "bg-lime-200"},
    8: {title: 'Harem', className: "bg-red-500"},
    9: {title: 'Historical', className: "bg-yellow-100"},
    10: {title: 'Horror', className: "bg-black text-white"},
    11: {title: 'Mecha', className: "bg-violet-700 text-green-500"},
    12: {title: 'Parody', className: "bg-emerald-200"},
    13: {title: 'Psychological', className: ""},
    14: {title: 'Romance', className: "bg-pink-300"},
    15: {title: 'Samurai', className: "bg-orange-300"},
    16: {title: 'School', className: "bg-teal-300"},
    17: {title: 'SciFi', className: "bg-black text-green-500"},
    18: {title: "'Slice of Life'", className: "bg-slate-500"},
    19: {title: 'Sports', className: "bg-blue-500"},
    20: {title: 'Thriller', className: "bg-neutral-700 text-red-700"},
    21: {title: 'War', className: "bg-stone-400"}
}