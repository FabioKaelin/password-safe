"use client"

import React, {useEffect, useState} from "react";
import {VaultEntry} from "@/app/vault/vaultEntry";
import {createNewCategory, createNewEntry} from "@/app/vault/api";
import {useRouter} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {Category, GetAllCategoriesFromVault} from "@/app/vault/category";
import CreateNewCategory from "@/app/components/layout/CreateNewCategory";
import ErrorAlert from "@/app/components/alerts/ErrorAlert";


export type RefreshType = {
    isRefresh: boolean,
    setIsRefresh: React.Dispatch<React.SetStateAction<boolean>>
};

export default function CreateCategoryModal({setIsRefresh}: RefreshType) {
    const router = useRouter()

    const [category, setCategory] = useState<Category>({category: ""})
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("")

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const createEntry = async () => {
            if (category === null || category.category == "" || category.category == null) {
                setErrorMessage("Please fill in all fields")
                return
            }

            const resp = await createNewCategory(category.category);
            if (resp.status === 401) {
                router.push("/login");
            }
            setIsOpen(false);
            setIsRefresh(true)
        }
        createEntry()
    };

    return (
        <>
            <button
                onClick={() => {
                    setIsOpen(true)
                    setErrorMessage("")
                }}
                className="px-4 py-2 bg-teal-400 text-black rounded hover:bg-teal-500 mx-5"
            >
                Add Category
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="bg-neutral rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        >
                            &times;
                        </button>
                        {
                            errorMessage != "" && (
                                <ErrorAlert message={errorMessage}/>
                            )
                        }
                        <h2 className="text-2xl mb-4 font-bold text-white">Create a new Category</h2>

                        <form onSubmit={handleSubmit} className="grid gap-4">
                            <input
                                name="title"
                                placeholder="Title"
                                value={category.category}
                                onChange={(e) => setCategory({...category, category: e.target.value})}
                                className="px-4 py-2 input input-bordered border border-blue-500 rounded"
                            />

                            <br/>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-teal-400 text-black rounded hover:bg-teal-500 rounded "
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}