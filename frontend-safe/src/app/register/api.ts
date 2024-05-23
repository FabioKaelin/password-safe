import { User } from "../login/page"
import { BACKENDURL } from "../statics"

export function RegisterUser(user: User) {
    const resp = fetch(`http://localhost:8000/api/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: user.email,
            password: user.password
        })
    })

    return resp
}