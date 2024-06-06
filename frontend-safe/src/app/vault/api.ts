import {User} from "@/app/login/page";
import {BACKENDURL} from "@/app/statics";
import {VaultEntry} from "@/app/vault/vaultEntry";

export async function getPasswordForUser(): Promise<VaultEntry[]> {
    const resp = await fetch(`${BACKENDURL}passwords/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-cache",
        credentials: "include",
        mode: "cors",
    })

    return resp.json()
}

export async function createNewEntry(entry: VaultEntry): Promise<VaultEntry> {
    const resp = await fetch(`${BACKENDURL}passwords/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: entry.title,
            description: entry.description,
            url: entry.url,
            username: entry.username,
            password: entry.password
        }),
        cache: "no-cache",
        credentials: "include",
        mode: "cors",
    })

    return resp.json()
}

export async function deletePassword(id: string): Promise<string> {
    const resp = await fetch(`${BACKENDURL}passwords/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-cache",
        credentials: "include",
        mode: "cors",
    })

    if (resp.status !== 204) {
        return "Failed to delete password"
    }

    return "Password deleted"
}