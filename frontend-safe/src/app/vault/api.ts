import {User, UserWithId} from "@/app/login/page";
import {BACKENDURL} from "@/app/statics";
import {VaultEntry} from "@/app/vault/vaultEntry";
import Router from 'next/router';


export async function getPasswordForUser(): Promise<{ vault: Promise<VaultEntry[]>, status: number }> {
    const resp = await fetch(`${BACKENDURL}passwords/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-cache",
        credentials: "include",
        mode: "cors",
    })

    if (resp.status === 401)
        return {vault: Promise.resolve([]), status: resp.status}
    
    return {vault: resp.json(), status: resp.status}
}

export async function createNewEntry(entry: VaultEntry): Promise<{ vault: Promise<VaultEntry>, status: number }> {
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
            password: entry.password,
            category: entry.category
        }),
        cache: "no-cache",
        credentials: "include",
        mode: "cors",
    })

    if (resp.status === 401)
        return {vault: Promise.resolve({id: "", url: "", category: "", password: "", description: "", username: "", userid: "", title: ""}), status: resp.status}

    return {vault: resp.json(), status: 200}
}

export async function deletePassword(id: string): Promise<number> {
    const resp = await fetch(`${BACKENDURL}passwords/${id}`, {
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

// most this code snippet was generated by chatgpt
export async function editEntryAPI(id: string, entry: VaultEntry): Promise<VaultEntry> {
    // Stelle sicher, dass die ID korrekt in die URL integriert wird
    const url = `${BACKENDURL}passwords/${id}`;

    console.log("Attempting to update entry at URL:", url); // Zum Debuggen der URL

    try {
        const resp = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(entry),
            credentials: "include",
            mode: "cors",
        });

        if (resp.status === 403 || resp.status === 401) {
            Router.push("/login");
            throw new Error('Unauthorized or Forbidden access - redirected to login');
        }

        if (!resp.ok) {
            const errorText = await resp.text(); // Für detaillierte Fehlermeldungen
            throw new Error(`Failed to update the password entry: ${errorText}`);
        }

        return await resp.json();
    } catch (error) {
        console.error("Error in editEntryAPI:", error);
        throw error;
    }
}

export async function changeMasterPassword(user: UserWithId): Promise<{ user: Promise<UserWithId>, status: number }> {
    const resp = await fetch(`${BACKENDURL}users/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-cache",
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({
            email: user.email,
            password: user.password,
            id: user.id
        })
    })

    if (resp.status === 401)
        return {user: Promise.resolve({id: "", email: "", password: ""}), status: resp.status}

    return {user: resp.json(), status: resp.status}
}