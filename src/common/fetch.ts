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
        body: bs
    })
    const respBody = await res.json()
    if (!res.ok) {
        throw respBody
    }
    return respBody as R
}

export async function fetchOr404<R>(url: string): Promise<R | null> {
    const res = await fetch(url);
    if (res.status == 404) {
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
        body
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