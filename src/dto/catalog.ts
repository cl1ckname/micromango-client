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

export const GENRES: Record<number, string> = {
    1: 'Action',
    2: 'Adventure',
    3: 'Comedy',
    4: 'Mystery',
    5: 'Drama',
    6: 'Ecchi',
    7: 'Fantasy',
    8: 'Harem',
    9: 'Historical',
    10: 'Horror',
    11: 'Mecha',
    12: 'Parody',
    13: 'Psychological',
    14: 'Romance',
    15: 'Samurai',
    16: 'School',
    17: 'SciFi',
    18: 'Slice of Life',
    19: 'Sports',
    20: 'Thriller',
    21: 'War'
}