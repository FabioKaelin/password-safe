"use client"

import Header from "@/app/components/layout/Header";
import PasswordTable from "@/app/components/layout/PasswordTable";
import NewPasswordModal from "@/app/components/modals/NewPasswordModal";
import {useState} from "react";

export default function Page() {
    const [isRefresh, setIsRefresh] = useState<boolean>(true)
    return (
        <>
            <Header title={"Vault"}/>
            <div className={"flex justify-center mb-10"}>
                <NewPasswordModal isRefresh={isRefresh} setIsRefresh={setIsRefresh}/>
            </div>
            <div className={"flex justify-center"}>
                <PasswordTable isRefresh={isRefresh} setIsRefresh={setIsRefresh}/>
            </div>

        </>

    );
}