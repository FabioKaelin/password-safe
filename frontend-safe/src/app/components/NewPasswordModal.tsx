"use client"

import React, {useState} from "react";
import {VaultEntry} from "@/app/vault/vaultEntry";
import {createNewEntry} from "@/app/vault/api";
import {useRouter} from "next/navigation";
import Router from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

// TODO refresh is not executed after adding a new entry

export type RefreshType = {
    isRefresh: boolean,
    setIsRefresh: React.Dispatch<React.SetStateAction<boolean>>
};
export default function NewPasswordModal({setIsRefresh}: RefreshType) {
    const [entry, setEntry] = useState<VaultEntry>({
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

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const createEntry = async () => {
            const createdEntry = await createNewEntry(entry);
            setEntry(createdEntry);
            setIsOpen(false);
            setIsRefresh(true)
        };
        createEntry()
    };

    // TODO show password button needs to be added
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
                            <br/>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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