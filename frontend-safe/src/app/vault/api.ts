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