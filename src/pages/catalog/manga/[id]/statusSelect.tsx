import {useEffect, useState} from "react";
import {HOST} from "@/app/globals";
import useAuth from "@/hooks/useAuth";
import {Auth} from "@/dto/user";
import {useRouter} from "next/router";

const STATUS_LIST = ['Reading', 'To read', 'Completed', 'Drop', "Unknown"]
const UNKNOWN_INDEX = STATUS_LIST.length - 1
export default function StatusSelect(props: {
    mangaId: string
}) {
    const [status, setStatus] = useState(UNKNOWN_INDEX)
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
        let method = "POST"
        if (i == UNKNOWN_INDEX) {
            method = "DELETE"
        }
        const res = await fetch(`${HOST}/api/profile/${auth.userId}/list`, {
            method: method,
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                mangaId: props.mangaId,
                list: i
            })
        })
        const body = await res.json()
        if (!res.ok) {
            throw body
        }
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
                selected={i == status}
                value={i}>{e}</option>
        )}
    </select>
}