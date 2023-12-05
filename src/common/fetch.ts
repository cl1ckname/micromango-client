export type HttpMethod = "POST" | "PUT" | "DELETE" | "OPTIONS" | "PATCH"
export async function fetchJson<P, R>(url: string, method: HttpMethod, body?: P): Promise<R> {
    let bs = null
    if (body) {
        bs = JSON.stringify(body)
    }
    const res = await fetch(url, {
        method,
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: bs,
        credentials: "include"
    })
    const respBody = await res.json()
    if (!res.ok) {
        throw respBody
    }
    return respBody as R
}

export async function fetchOr404<R>(url: string, auth?: string): Promise<R | null> {
    const headers = new Headers()
    if (auth) {
        headers.set("Authorization", `Bearer ${auth}`)
    }

    const res = await fetch(url, {
        headers,
        credentials: "include"
    });
    if (res.status == 404) {
        console.log(res)
        return null
    }
    const body = await res.json()
    if (!res.ok) {
        throw body
    }
    return body
}

export async function fetchFormData<R>(url: string, method: HttpMethod, body: FormData): Promise<R | null> {
    const res = await fetch(url, {
        method,
        body,
        credentials: "include"
    })
    if (!res) {
        return null
    }
    const respBody = await res.json()
    if (!res.ok) {
        throw respBody
    }
    return respBody as R
}