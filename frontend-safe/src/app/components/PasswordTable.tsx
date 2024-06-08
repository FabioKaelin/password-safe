"use client"

import {VaultEntry} from "@/app/vault/vaultEntry";
import React, {useEffect, useState} from "react";
import {deletePassword, getPasswordForUser, editEntryAPI} from "@/app/vault/api";
import entry from "next/dist/server/typescript/rules/entry";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

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
        <div className="">
            <table className="table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Url</th>
                    <th>Username</th>
                    <th>
                        <div>
                        <span>Password
                            <div onClick={() => setSee(!see)} className={"h-full"}>
                                  {see ? (
                                      <>
                                          <FontAwesomeIcon icon={faEyeSlash} className={"h-2/4"} />
                                      </>
                                  ) : (
                                      <>
                                          <FontAwesomeIcon icon={faEye} className={"h-2/4"}/>
                                      </>
                                  )}
                            </div>
                        </span>
                        </div>
                    </th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                {
                    entries.map(entry => {
                        return (
                            <tr key={entry.id}>
                                <td>
                                    <div className="font-bold">{entry.title}</div>
                                </td>
                                <td>
                                    {entry.description}
                                </td>
                                <td>{entry.url}</td>
                                <td>{entry.username}</td>
                                <td>{getPasswordContent(entry)}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs"
                                            onClick={() => handleDelete(entry.id)}>
                                        delete
                                    </button>
                                </th>
                                <th>
                                    <button className="btn btn-ghost btn-xs"
                                            onClick={() => handleEdit(entry.id, entry)}>
                                        edit
                                    </button>
                                </th>
                            </tr>
                        )
                    })
                }
                </tbody>
                {/* foot */}
                <tfoot>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Url</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
                </tfoot>
            </table>
        </div>
    )
}