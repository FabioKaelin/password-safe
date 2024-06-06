"use client"

import {VaultEntry} from "@/app/vault/vaultEntry";
import React, {useEffect, useState} from "react";
import {deletePassword, getPasswordForUser, editEntryAPI} from "@/app/vault/api";

export default function PasswordTable() {

    const [see, setSee] = useState<boolean>(false)
    const [entries, setEntries] = useState<VaultEntry[]>([])
    const [loadEntries, setLoadEntries] = useState<boolean>(true)

    useEffect(() => {
        const handlePassword = async () => {
            const entries = await getPasswordForUser();
            setEntries(entries == null ? [] : entries)
            console.log(entries)
        }
        if (loadEntries) {
            handlePassword()
            setLoadEntries(false)
        }
    }, [loadEntries])


    const getPasswordContent = (entry: VaultEntry): React.JSX.Element => {
        let password =
            see ? entry.password
                : "*".repeat(entry.password?.length);

        return <p>{password}</p>
    }

    const handleDelete = async (id: string) => {
        const deleteEntry = async () => {
            console.log(id)
            const response = deletePassword(id)
            response.then((value) => {
                value === "Password deleted" ? setLoadEntries(true) : console.log(value)
            })
        }
        deleteEntry()

    }

    const handleEdit = async (id: string, updatedEntry: VaultEntry) => {
        const editEntry = async () => {
            console.log(id)
            const response = editEntryAPI(id, updatedEntry)
            response.then((value) => {
                if (value.id === id) {
                    console.log("Password successfully updated");
                    setLoadEntries(true);
                } else {
                    console.error("Failed to update password", value);
                }
            }).catch((error) => {
                console.error("Error updating password:", error);
            });
        }
    }

    return (
        <table className="table-auto border-collapse border border-slate-600 text-center">
            <thead className="border-collapse border border-slate-600 text-center">
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Url</th>
                <th>Username</th>
                <th>
                    <div>
                        <span>Password
                            <div onClick={() => setSee(!see)} className={"h-10 w-10"}>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                     stroke="#000000">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                                            stroke="#ffffff" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round"></path>
                                        <path
                                            d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                                            stroke="#ffffff" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round"></path>
                                    </g>
                                </svg>
                            </div>
                        </span>

                    </div>
                </th>
                <th>Delete</th>
                <th>Edit</th>
            </tr>
            </thead>
            <tbody className="table-auto border-collapse border border-slate-600 text-center">
            {
                entries.map(entry => {
                    return (
                        <tr key={entry.id}>
                            <td>{entry.title}</td>
                            <td>{entry.description}</td>
                            <td>{entry.url}</td>
                            <td>{entry.username}</td>
                            <td>
                                {getPasswordContent(entry)}
                            </td>
                            <td className="items-center cursor-pointer">
                                <div onClick={() => handleDelete(entry.id)} className={"w-1/2"}>
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                           stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path d="M3 6.98996C8.81444 4.87965 15.1856 4.87965 21 6.98996"
                                                  stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                            <path
                                                d="M8.00977 5.71997C8.00977 4.6591 8.43119 3.64175 9.18134 2.8916C9.93148 2.14146 10.9489 1.71997 12.0098 1.71997C13.0706 1.71997 14.0881 2.14146 14.8382 2.8916C15.5883 3.64175 16.0098 4.6591 16.0098 5.71997"
                                                stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round"></path>
                                            <path d="M12 13V18" stroke="#ffffff" stroke-width="1.5"
                                                  stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path
                                                d="M19 9.98999L18.33 17.99C18.2225 19.071 17.7225 20.0751 16.9246 20.8123C16.1266 21.5494 15.0861 21.9684 14 21.99H10C8.91389 21.9684 7.87336 21.5494 7.07541 20.8123C6.27745 20.0751 5.77745 19.071 5.67001 17.99L5 9.98999"
                                                stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round"></path>
                                        </g>
                                    </svg>
                                </div>
                            </td>
                            <td>
                                <button onClick={() => handleEdit(entry.id, entry)}>Edit</button>
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}