"use client"

import Header from "@/app/components/layout/Header";
import PasswordTable from "@/app/components/layout/PasswordTable";
import NewPasswordModal from "@/app/components/modals/NewPasswordModal";
import React, {useState} from "react";
import ChangeMasterPassword from "@/app/components/modals/ChangeMasterPassword";
import ErrorAlert from "@/app/components/alerts/ErrorAlert";
import Link from "next/link";


export default function Page() {
    const [isRefresh, setIsRefresh] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<string>("")
    return (
        <>
            <div>
                <Header title={"Vault"}/>
                <div className={"absolute top-0 w-full mt-5 flex z-10"}>
                    {
                        errorMessage != "" && (
                            <ErrorAlert message={errorMessage}/>
                        )
                    }
                </div>
            </div>

            <div className={"flex justify-center mb-10"}>
                <ChangeMasterPassword isRefresh={isRefresh} setIsRefresh={setIsRefresh}/>
                <NewPasswordModal isRefresh={isRefresh} setIsRefresh={setIsRefresh} setErrorMessage={setErrorMessage}/>
                <Link href={"/category"} passHref
                      className={"px-4 py-2 bg-teal-400 text-black rounded hover:bg-teal-500 mx-5"}>
                    Go to categories
                </Link>
            </div>

            <div className={"flex justify-center items-center"}>
                <PasswordTable isRefresh={isRefresh} setIsRefresh={setIsRefresh} setErrorMessage={setErrorMessage}/>
            </div>

        </>

    );
}