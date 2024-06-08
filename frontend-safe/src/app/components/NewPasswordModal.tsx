"use client"

import {useState} from "react";
import {VaultEntry} from "@/app/vault/vaultEntry";
import {createNewEntry} from "@/app/vault/api";
import {useRouter} from "next/navigation";

export default function NewPasswordModal() {
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
    const router = useRouter()

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const createEntry = async () => {
            const createdEntry = await createNewEntry(entry);
            setEntry(createdEntry);
            setIsOpen(false);
        };
        createEntry().then(() => router.push("/vault"))
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Add New Entry
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-opacity-75 flex items-center justify-center">
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
                            <input
                                name="password"
                                placeholder="Password"
                                type="password"
                                value={entry.password} 
                                onChange={(e) => setEntry({...entry, password: e.target.value})}
                                className="px-4 py-2 input input-bordered border border-blue-500 rounded"
                            />
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