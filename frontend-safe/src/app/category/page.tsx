"use client"

import React, {useState} from "react";
import ErrorAlert from "@/app/components/alerts/ErrorAlert";
import Header from "@/app/components/layout/Header";
import CreateCategoryModal from "@/app/components/modals/CreateCategoryModal";
import CategoriesTable from "@/app/components/layout/CategoriesTable";

export default function Page() {
    const [isRefresh, setIsRefresh] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<string>("")

    return (
        <div>
            <div>
                <Header title={"Categories"}/>
                <div className={"absolute top-0 w-full mt-5 flex z-10"}>
                    {
                        errorMessage != "" && (
                            <ErrorAlert message={errorMessage}/>
                        )
                    }
                </div>
            </div>

            <div className={"flex justify-center mb-10"}>
                <CreateCategoryModal isRefresh={isRefresh} setIsRefresh={setIsRefresh}/>
            </div>

            <div className={"flex justify-center items-center"}>
                <CategoriesTable isRefresh={isRefresh} setIsRefresh={setIsRefresh} setErrorMessage={setErrorMessage}/>
            </div>
        </div>
    );
}