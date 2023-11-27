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
    number: number
    title: string
}

export interface Chapter {
    chapterId:     string
    mangaId:       string
    number: number
    title:         string
    pages:         any[]
}

export interface PageHead {
    pageId: string

}
export interface CreateManga {
    title: string
    description: string
    cover: string
}