import {fetch} from "undici-types";
import {User} from "@/app/login/page";
import {BACKENDURL} from "@/app/statics";
import {VaultEntry} from "@/app/vault/vaultEntry";

export function getPasswordForUser() {
    const resp = fetch(`http://${BACKENDURL}passwords`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    })
    return resp
}