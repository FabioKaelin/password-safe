// code has been refactored with chatgpt

import React, {useEffect, useState} from "react";
import {CategoryWithApi} from "@/app/vault/vaultEntry";
import ErrorAlert from "@/app/components/alerts/ErrorAlert";

type EditPasswordModalProps = {
    entry: CategoryWithApi;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
    onUpdated: () => void;
};

const defaultCategories: CategoryWithApi = {
    id: "",
    name: "",
    userid: ""
}

export default function EditCategoryModal({entry, isOpen, onClose, onUpdated, setIsOpen}: EditPasswordModalProps) {
    const [editedEntry, setEditedEntry] = useState<CategoryWithApi>(entry);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("")

    useEffect(() => {
        if (isOpen) {
            setEditedEntry(entry);
        }
    }, [isOpen, entry]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!editedEntry.id) {
            console.error("No ID provided for the entry to update.");
            return;
        }

        try {
            if (editedEntry.id != "" && editedEntry.name != "" && editedEntry.userid != "") {
                const response = await editCategoriesById(editedEntry.id, editedEntry);
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


    const handleInputChange = (name: keyof CategoryWithApi, value: string) => {
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
                        name="username"
                        placeholder="Username"
                        value={editedEntry.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="px-4 py-2 input input-bordered border border-blue-500 rounded"
                    />

                    <button type="submit" className="px-4 py-2 bg-teal-400 text-black rounded hover:bg-teal-500">
                        Update
                    </button>
                </form>
            </div>
        </div>
    ) : null;
}
