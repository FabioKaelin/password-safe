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
                                     stroke="#ffffff">
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
                                <div onClick={() => handleEdit(entry.id, entry)} className={"cursor-pointer w-3/4"}>
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                         stroke="#000000">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                           stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                                                stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round"></path>
                                            <path
                                                d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                                                stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round"></path>
                                        </g>
                                    </svg>
                                </div>
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}