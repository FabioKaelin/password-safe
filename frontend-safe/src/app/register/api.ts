import {User} from "../login/page"
import {BACKENDURL} from "../statics"

export function RegisterUser(user: User) {
    console.log(`${user.email} ${user.password}`)
    const resp = fetch(`http://localhost:8000/api/users/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        cache: "no-cache",
        body: JSON.stringify({
            email: user.email,
            password: user.password
        })
    })

    console.log("I am after")
    
    return resp
}