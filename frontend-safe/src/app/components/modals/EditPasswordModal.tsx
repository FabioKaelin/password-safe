// code has been refactored with chatgpt

import React, {useEffect, useState} from "react";
import {CategoryWithApi, VaultEntry} from "@/app/vault/vaultEntry";
import {createNewEntry, editEntryAPI, getCategory} from "@/app/vault/api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {Category, GetAllCategoriesFromVault} from "@/app/vault/category";
import {retry} from "next/dist/compiled/@next/font/dist/google/retry";
import ErrorAlert from "@/app/components/alerts/ErrorAlert";

type EditPasswordModalProps = {
    entry: VaultEntry;
    isOpen: boolean;
    onClose: () => void;
    onUpdated: () => void;
};

export default function EditPasswordModal({entry, isOpen, onClose, onUpdated}: EditPasswordModalProps) {
    const [editedEntry, setEditedEntry] = useState<VaultEntry>(entry);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [categories, setCategories] = useState<CategoryWithApi[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("")

    useEffect(() => {
        if (isOpen) {
            setEditedEntry(entry);
        }

        const getCategories = async () => {
            const categories = await getCategory();
            const category = await categories.category
            setCategories(category);
        }
        getCategories()
    }, [isOpen, entry]); // Update bei jeder Öffnung und bei Änderung der entry-Prop

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!editedEntry.id) {
            console.error("No ID provided for the entry to update.");
            return;
        }

        try {
            if (entry.password.length < 8) {
                setErrorMessage("Password must be at least 8 characters long")
                return
            }
            
            if (editedEntry.password != "" && editedEntry.url != "" && editedEntry.username != "" && editedEntry.title != "" && editedEntry.description != "") {
                const response = await editEntryAPI(editedEntry.id, editedEntry);
                console.log("Update response:", response);
                onUpdated();
                onClose();
            } else {
                setErrorMessage("Please fill in all fields")
            }

        } catch (error) {
            console.error("Error updating the entry:", error);
        }
    };


    const handleInputChange = (name: keyof VaultEntry, value: string) => {
        setEditedEntry(prev => ({...prev, [name]: value}));
    };

    return isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="bg-neutral rounded-lg shadow-lg w-full max-w-md p-6 relative">
                <button onClick={() => {
                    onClose()
                    setErrorMessage("")
                }} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                    &times;
                </button>
                {
                    errorMessage != "" && (
                        <ErrorAlert message={errorMessage}/>
                    )
                }
                <h2 className="text-2xl mb-4 font-bold text-white">Edit Password Entry</h2>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <input
                        name="title"
                        placeholder="Title"
                        value={editedEntry.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className="px-4 py-2 input input-bordered border border-blue-500 rounded"
                    />
                    <input
                        name="description"
                        placeholder="Description"
                        value={editedEntry.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="px-4 py-2 input input-bordered border border-blue-500 rounded"
                    />
                    <input
                        name="url"
                        placeholder="URL"
                        value={editedEntry.url}
                        onChange={(e) => handleInputChange("url", e.target.value)}
                        className="px-4 py-2 input input-bordered border border-blue-500 rounded"
                    />
                    <input
                        name="username"
                        placeholder="Username"
                        value={editedEntry.username}
                        onChange={(e) => handleInputChange("username", e.target.value)}
                        className="px-4 py-2 input input-bordered border border-blue-500 rounded"
                    />

                    <div className="flex items-center">
                        <input
                            name="password"
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            value={editedEntry.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            className="px-4 py-2 input input-bordered border border-blue-500 rounded w-full"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="ml-2 px-4 py-2 border border-blue-500 rounded h-full">
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}/>
                        </button>
                    </div>

                    <select className="px-4 py-2 select select-bordered border border-blue-500 rounded"
                            onChange={(e) => handleInputChange("category", e.target.value)}>

                        <option disabled selected value={editedEntry.category.id}>{editedEntry.category.id}</option>
                        {
                            categories.map((category) => {
                                return category.id === editedEntry.category.id ?
                                    null :
                                    <option key={category.id}
                                            value={category.id}>{category.name}</option>
                            })
                        }
                    </select>

                    <button type="submit" className="px-4 py-2 bg-teal-400 text-black rounded hover:bg-teal-500">
                        Update
                    </button>
                </form>
            </div>
        </div>
    ) : null;
}
