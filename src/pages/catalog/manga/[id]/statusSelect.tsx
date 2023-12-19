import {useEffect, useState} from "react";
import useAuth from "@/hooks/useAuth";
import {Auth} from "@/dto/user";
import {useRouter} from "next/router";
import {STATUS_LIST, UNKNOWN_INDEX} from "@/dto/profile";
import {AddToList, RemoveFromList} from "@/api/profile";

export default function StatusSelect(props: {
    mangaId: string
    status?: number
}) {
    const [status, setStatus] = useState(props.status || UNKNOWN_INDEX)
    const [auth, setAuth] = useState<Auth | null>(null)
    const router = useRouter()

    useEffect(() => {
        const auth = useAuth()
        setAuth(auth)
    }, []);
    async function handleSetStatus(i: number) {
        setStatus(i)
        if (!auth) {
            return router.push("/login")
        }
        if (i == UNKNOWN_INDEX) {
            return RemoveFromList(auth.userId, props.mangaId)
        }
        return AddToList(auth.userId, props.mangaId, i)
    }

    return <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={status}
        onChange={e => {
        const i = Number.parseInt(e.target.value)
        return handleSetStatus(i)
    }}>
        {STATUS_LIST.map((e, i) =>
            <option
                key={i}
                value={i}>{e}</option>
        )}
    </select>
}