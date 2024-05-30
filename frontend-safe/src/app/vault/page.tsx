"use client"

import Header from "@/app/components/Header";
import {useEffect, useState} from "react";
import {getPasswordForUser} from "@/app/vault/api";
import {VaultEntry} from "@/app/vault/vaultEntry";
import PasswordTable from "@/app/components/PasswordTable";
import NewPasswordModal from "@/app/components/NewPasswordModal";

export default function Page() {
    const [entries, setEntries] = useState<VaultEntry[]>([])

    useEffect(() => {
        const handlePassword = async () => {
            const entries = await getPasswordForUser();
            setEntries(entries == null ?  [] : entries)
            console.log(entries)
        }
        handlePassword()
    }, []);

    return (
        <>
            <Header title={"Vault"}/>
            <div className={"flex justify-center"}>
                <PasswordTable entries={entries}/>
            </div>
            <NewPasswordModal/>
            
        </>

    );
}