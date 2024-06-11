"use client"

import React, {useEffect, useState} from "react";
import {VaultEntry} from "@/app/vault/vaultEntry";
import {createNewEntry} from "@/app/vault/api";
import {useRouter} from "next/navigation";
import Router from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {Category, GetAllCategoriesFromVault} from "@/app/vault/category";


export type RefreshType = {
    isRefresh: boolean,
    setIsRefresh: React.Dispatch<React.SetStateAction<boolean>>
};
export default function NewPasswordModal({setIsRefresh}: RefreshType) {
    const [entry, setEntry] = useState<VaultEntry>({
        category: "",
        description: "",
        id: "",
        password: "",
        title: "",
        url: "",
        userid: "",
        username: ""
    });
    const [categories, setCategories] = useState<Category[]>([])

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isNewCategory, setIsNewCategory] = useState<boolean>(false);
    const [newCategory, setNewCategory] = useState<Category>({category: ""});
    const [showPassword, setShowPassword] = useState<boolean>(false)

    useEffect(() => {
        const getCategories = async () => {
            const categories = await GetAllCategoriesFromVault();
            setCategories(categories);
        }
        getCategories()
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const createEntry = async () => {
            if (entry.category == "" || entry.category == null) {
                entry.category = ""
            }
            const createdEntry = await createNewEntry(entry);
            setEntry(createdEntry);
            setIsOpen(false);
            setIsRefresh(true)
        };
        createEntry()
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
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
                            <div className={"flex items-center justify-center"}>
                                <button type={"button"} onClick={() => setIsNewCategory(!isNewCategory)}>Create a new
                                    category
                                </button>
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button"
                                         className="btn btn-circle btn-ghost btn-xs text-info">
                                        <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24" className="w-4 h-4 stroke-current">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div tabIndex={0}
                                         className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64">
                                        <div tabIndex={0} className="card-body">
                                            <h2 className="card-title">Attention!</h2>
                                            <p>When you add a category it will not be automatically changed in the category modal and not created until you save the password</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                isNewCategory && (
                                    <div className={"grid"}>
                                        <input
                                            name="Create new Category"
                                            placeholder="newCategory"
                                            value={newCategory.category}
                                            onChange={(e) => setNewCategory({category: e.target.value})}
                                            className="px-4 py-2 input input-bordered border border-blue-500 rounded"
                                        />
                                        <br/>
                                        <button type={"button"} onClick={() => {
                                            if (entry.category !== newCategory.category) {
                                                setCategories([...categories, newCategory])
                                            }
                                            setIsNewCategory(!isNewCategory)
                                        }}>Close modal
                                        </button>
                                    </div>

                                )
                            }

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