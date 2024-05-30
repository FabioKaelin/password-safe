import {BACKENDURL} from '../statics'
import {User} from './page'

export function LogInToVault(user: User) {
    const resp = fetch(`http://localhost:8000/api/users/login`, {
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