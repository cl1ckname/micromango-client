export interface MangaResponse {
    mangaId: string
    title: string
    cover: string
    description: string
    chapterNumber: number
}

export interface CreateManga {
    title: string
    description: string
    cover: string
}