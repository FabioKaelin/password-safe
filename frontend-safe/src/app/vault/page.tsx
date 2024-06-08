"use client"

import Header from "@/app/components/Header";
import PasswordTable from "@/app/components/PasswordTable";
import NewPasswordModal from "@/app/components/NewPasswordModal";

export default function Page() {
    return (
        <>
            <Header title={"Vault"}/>
            <div className={"flex justify-center mb-10"}> 
                <NewPasswordModal/>
            </div>
            <div className={"flex justify-center"}>
                <PasswordTable/>
            </div>

        </>

    );
}