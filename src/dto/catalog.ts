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
    title: string, number: number
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