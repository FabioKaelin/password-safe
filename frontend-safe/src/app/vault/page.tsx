"use client"

import Header from "@/app/components/Header";
import {useEffect} from "react";
import {getPasswordForUser} from "@/app/vault/api";

export default function Page() {

    useEffect(() => {
        const handlePassword = async () => {
            const entries = await getPasswordForUser();
            console.log(entries)
        }
        handlePassword()
    }, []);
    
    return (
        <div>
            <Header title={"Vault"} />
        </div>
    );
}