// code has been refactored with chatgpt

import React, { useEffect, useState } from "react";
import { VaultEntry } from "@/app/vault/vaultEntry";
import { editEntryAPI } from "@/app/vault/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

type EditPasswordModalProps = {
    entry: VaultEntry;
    isOpen: boolean;
    onClose: () => void;
    onUpdated: () => void;
};

export default function EditPasswordModal({ entry, isOpen, onClose, onUpdated }: EditPasswordModalProps) {
    const [editedEntry, setEditedEntry] = useState<VaultEntry>(entry);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen) {
            setEditedEntry(entry);
        }
    }, [isOpen, entry]); // Update bei jeder Öffnung und bei Änderung der entry-Prop

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!editedEntry.id) {
            console.error("No ID provided for the entry to update.");
            return;
        }

        try {
            const response = await editEntryAPI(editedEntry.id, editedEntry);
            console.log("Update response:", response);
            onUpdated();  // Refresh the parent component's data
            onClose();    // Close the modal
        } catch (error) {
            console.error("Error updating the entry:", error);
        }
    };


    const handleInputChange = (name: keyof VaultEntry, value: string) => {
        setEditedEntry(prev => ({ ...prev, [name]: value }));
    };

    return isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="bg-neutral rounded-lg shadow-lg w-full max-w-md p-6 relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                    &times;
                </button>
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
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    <button type="submit" className="px-4 py-2 bg-teal-400 text-black rounded hover:bg-teal-500">
                        Update
                    </button>
                </form>
            </div>
        </div>
    ) : null;
}
