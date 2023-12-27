import {ProfileBio} from "@/dto/user";

export interface PostList {
    mangaId: string,
    list: number
}

export const STATUS_LIST = ["Unknown", 'Reading', 'To read', 'Completed', 'Drop']
export const UNKNOWN_INDEX = 0

export type ListResponse = Record<number, ListRecord[]>

export interface ListRecord {
    mangaId: string,
    title: string,
    rate?: number
}

export interface UpdateProfileDto {
    userId: string,
    username?: string,
    bio?: ProfileBio,
    picture: File | null,
    cover: File | null
}