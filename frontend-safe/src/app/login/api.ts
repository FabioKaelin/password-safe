import {BACKENDURL} from '../statics'
import {User, UserWithId} from './page'

export function LogInToVault(user: User) {
    const resp = fetch(`${BACKENDURL}users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        cache: "no-cache",
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({
            email: user.email,
            password: user.password
        })
    })

    return resp
}

export async function CheckUser(): Promise<UserWithId> {
    const resp = await fetch(`${BACKENDURL}users/check`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        cache: "no-cache",
        credentials: "include",
        mode: "cors",
    })

    if (resp.status === 400)
        return {id: "", email: "", password: ""}

    return resp.json()
}