export interface MangaResponse {
    mangaId: string
    title: string
    cover: string
    description: string
    content: MangaContentResponse
    createdAt: string
    list?: number
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

export const GENRES = {
    0: 'Action',
    1: 'Adventure',
    2: 'Comedy',
    3: 'Mystery',
    4: 'Drama',
    5: 'Ecchi',
    6: 'Fantasy',
    7: 'Harem',
    8: 'Historical',
    9: 'Horror',
    10: 'Mecha',
    11: 'Parody',
    12: 'Psychological',
    13: 'Romance',
    14: 'Samurai',
    15: 'School',
    16: 'SciFi',
    17: 'Slice of Life',
    18: 'Sports',
    19: 'Thriller',
    20: 'War'
}