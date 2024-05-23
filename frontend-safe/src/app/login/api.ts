
import { BACKENDURL } from '../statics'
import { User } from './page'

export function LogInToVault(user: User) {
    const resp = fetch(`${BACKENDURL}users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        cache: "no-cache",
        body: JSON.stringify({
            email: user.email,
            password: user.password
        })
    })

    return resp
}