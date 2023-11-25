export interface MangaResponse {
    mangaId: string
    title: string
    cover: string
    description: string
    content: MangaContentResponse
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
    chapterNumber: number
    title: string
}

export interface CreateManga {
    title: string
    description: string
    cover: string
}