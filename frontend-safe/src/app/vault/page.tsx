"use client"

import Header from "@/app/components/Header";
import {useEffect, useState} from "react";
import {getPasswordForUser} from "@/app/vault/api";
import {VaultEntry} from "@/app/vault/vaultEntry";
import PasswordTable from "@/app/components/PasswordTable";

export default function Page() {
    const [entries, setEntries] = useState<VaultEntry[]>([])

    useEffect(() => {
        const handlePassword = async () => {
            const entries = await getPasswordForUser();
            setEntries(entries)
            console.log(entries)
        }
        handlePassword()
    }, []);

    return (
        <div>
            <Header title={"Vault"}/>
            <PasswordTable entries={entries}/>
        </div>
    );
}