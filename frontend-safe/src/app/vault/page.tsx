"use client"

import Header from "@/app/components/Header";
import {useEffect, useState} from "react";
import {getPasswordForUser} from "@/app/vault/api";
import {VaultEntry} from "@/app/vault/vaultEntry";
import PasswordTable from "@/app/components/PasswordTable";
import NewPasswordModal from "@/app/components/NewPasswordModal";

export default function Page() {
    return (
        <>
            <Header title={"Vault"}/>
            <div className={"flex justify-center"}>
                <PasswordTable />
            </div>
            <NewPasswordModal/>
            
        </>

    );
}