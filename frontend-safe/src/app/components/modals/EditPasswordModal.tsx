"use client"

import React, {useEffect, useState} from "react";
import {VaultEntry} from "@/app/vault/vaultEntry";
import {createNewEntry} from "@/app/vault/api";
import {useRouter} from "next/navigation";
import Router from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";


export type RefreshType = {
    isRefresh: boolean,
    setIsRefresh: React.Dispatch<React.SetStateAction<boolean>>
};
export default function EditPasswordModal({setIsRefresh}: RefreshType) {
    const [entry, editEntry] = useState<VaultEntry>({
        description: "",
        id: "",
        password: "",
        title: "",
        url: "",
        userid: "",
        username: ""
    });

    const [isOpen, setIsOpen] = useState(false);
    const [showPassword, setShowPassword] = useState<boolean>(false)

    useEffect(() => {
        if (isOpen && entry.id) {
            const fetchEntry = async () => {
                const data = getEntryById(entry.id);
                // @ts-ignore
                editEntry(data);
            };
            fetchEntry();
        }
    }, [isOpen, entry.id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // @ts-ignore
            const updatedEntry = await updatedEntry(entry);
            editEntry(updatedEntry);
            setIsOpen(false);
            setIsRefresh(true);
        } catch (error) {
            console.error("Fehler beim Aktualisieren des Eintrags:", error);
        }
    };

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-teal-400 text-black rounded hover:bg-teal-500">
                Edit Entry
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="bg-neutral rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                            &times;
                        </button>
                        <h2 className="text-2xl mb-4 font-bold text-white">Edit Password Entry</h2>
                        <form onSubmit={handleSubmit} className="grid gap-4">
                            {/* Formularfelder hier */}
                            <input
                                name="title"
                                placeholder="Title"
                                value={entry.title}
                                onChange={(e) => editEntry({ ...entry, title: e.target.value })}
                                className="px-4 py-2 input input-bordered border border-blue-500 rounded"
                            />
                            {/* Weitere Eingabefelder analog */}
                            <button type="submit" className="px-4 py-2 bg-teal-400 text-black rounded hover:bg-teal-500">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

function getEntryById(id: string) {
    throw new Error("Function not implemented.");
}
