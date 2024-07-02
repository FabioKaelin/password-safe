import {CategoryWithApi} from "@/app/vault/vaultEntry";
import {BACKENDURL} from "@/app/statics";

export async function getCategories(): Promise<{
    category: Promise<CategoryWithApi[]>,
    status: number
}> {
    const resp = await fetch(`${BACKENDURL}categories/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-cache",
        credentials: "include",
        mode: "cors",
    })

    if (resp.status === 200)
        return {category: resp.json(), status: resp.status}

    return {category: Promise.resolve([]), status: resp.status}
}

export async function deleteCategories(id: string): Promise<number> {
    const resp = await fetch(`${BACKENDURL}categories/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-cache",
        credentials: "include",
        mode: "cors",
    })

    return resp.status
}

export async function editCategory(category: CategoryWithApi): Promise<number> {
    const resp = await fetch(`${BACKENDURL}categories/${category.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: category.id,
            name: category.name,
            userid: category.userid
        }),
        cache: "no-cache",
        credentials: "include",
        mode: "cors",
    })

    return resp.status
}