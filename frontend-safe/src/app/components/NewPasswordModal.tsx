"use client"

import {useState} from "react";
import {VaultEntry} from "@/app/vault/vaultEntry";
import {createNewEntry} from "@/app/vault/api";

export default function NewPasswordModal() {
    const [entry, setEntry] = useState<VaultEntry>({
        description: "",
        id: "",
        password: "",
        title: "",
        url: "",
        userid: "",
        username: ""
    })
    const handleSubmit = () => {
        const createEntry = async () => {
            const createdEntry = await createNewEntry(entry);
            setEntry(createdEntry)
        }
        createEntry()
    }
    

    return (
        <div className={"text-black grid grid-cols-5 gap-y-10"}>
            <form onSubmit={handleSubmit}>
                <input name={"title"} onChange={(e) => setEntry({...entry, title: e.target.value})}/>
                <input name={"url"} onChange={(e) => setEntry({...entry, url: e.target.value})}/>
                <input name={"username"} onChange={(e) => setEntry({...entry, username: e.target.value})}/>
                <input name={"password"} onChange={(e) => setEntry({...entry, password: e.target.value})}/>
                <button type="submit" className="text-white">Register</button>
            </form>
        </div>
    )
}