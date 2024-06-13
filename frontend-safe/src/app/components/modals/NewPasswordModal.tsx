"use client"

import React, {useEffect, useState} from "react";
import {VaultEntry} from "@/app/vault/vaultEntry";
import {createNewEntry} from "@/app/vault/api";
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

const defaultModal: VaultEntry = {
    category: "",
    description: "",
    id: "",
    password: "",
    title: "",
    url: "",
    userid: "",
    username: ""
};

export default function NewPasswordModal({setIsRefresh}: RefreshType) {
    const router = useRouter()

    const [entry, setEntry] = useState<VaultEntry>(defaultModal);
    const [categories, setCategories] = useState<Category[]>([])

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [newCategory, setNewCategory] = useState<Category>({category: ""});
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    useEffect(() => {
        const getCategories = async () => {
            const categories = await GetAllCategoriesFromVault();
            setCategories(categories);
        }
        getCategories()
    }, [isOpen]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const createEntry = async () => {
            if (entry === null)
                setErrorMessage("Please fill in all fields")

            if (entry.category == "" || entry.category == null) {
                entry.category = ""
            }
            
            if (entry.password.length < 8) {
                setErrorMessage("Password must be at least 8 characters long")
                return
            }

            if (entry.password != "" && entry.url != "" && entry.username != "" && entry.title != "" && entry.description != "") {
                const resp = await createNewEntry(entry);
                if (resp.status === 401) {
                    router.push("/login");
                }
                setEntry(defaultModal);
                setIsOpen(false);
                setIsRefresh(true)
            } else {
                setErrorMessage("Please fill in all fields")
            }
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
                className="px-4 py-2 bg-teal-400 text-black rounded hover:bg-teal-500"
            >
                Add New Entry
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
                        <h2 className="text-2xl mb-4 font-bold text-white">New Password Entry</h2>

                        <form onSubmit={handleSubmit} className="grid gap-4">
                            <input
                                name="title"
                                placeholder="Title"
                                value={entry.title}
                                onChange={(e) => setEntry({...entry, title: e.target.value})}
                                className="px-4 py-2 input input-bordered border border-blue-500 rounded"
                            />
                            <input
                                name="description"
                                placeholder="Description"
                                value={entry.description}
                                onChange={(e) => setEntry({...entry, description: e.target.value})}
                                className="px-4 py-2 input input-bordered border border-blue-500 rounded"
                            />
                            <input
                                name="url"
                                placeholder="URL"
                                value={entry.url}
                                onChange={(e) => setEntry({...entry, url: e.target.value})}
                                className="px-4 py-2 input input-bordered border border-blue-500 rounded"
                            />
                            <input
                                name="username"
                                placeholder="Username"
                                value={entry.username}
                                onChange={(e) => setEntry({...entry, username: e.target.value})}
                                className="px-4 py-2 input input-bordered border border-blue-500 rounded"
                            />

                            <span>
                                <input
                                    name="password"
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                    value={entry.password}
                                    onChange={(e) => setEntry({
                                        ...entry,
                                        password: e.target.value
                                    })}
                                    className="px-4 py-2 input input-bordered border border-blue-500 rounded w-4/5"
                                />
                                
                               <button type="button" onClick={() => setShowPassword(!showPassword)}
                                       className={"px-4 py-2 border border-blue-500 rounded h-full mx-1 w-1/6"}>
                                  {showPassword ? (
                                      <>
                                          <FontAwesomeIcon icon={faEyeSlash}/>
                                      </>
                                  ) : (
                                      <>
                                          <FontAwesomeIcon icon={faEye}/>
                                      </>
                                  )}
                               </button>
                            </span>

                            <select className="px-4 py-2 select select-bordered border border-blue-500 rounded"
                                    onChange={(e) => setEntry({...entry, category: e.target.value})}>

                                <option disabled selected value={""}>Select a category if you like</option>
                                {
                                    categories.map((category) => {
                                        return <option key={category.category}
                                                       value={category.category}>{category.category}</option>
                                    })
                                }
                            </select>

                            <CreateNewCategory newCategory={newCategory} setNewCategory={setNewCategory}
                                               categories={categories} setCategories={setCategories}
                                               entry={entry}/>

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