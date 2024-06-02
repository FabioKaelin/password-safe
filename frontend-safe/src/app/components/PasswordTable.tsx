"use client"

import {VaultEntry} from "@/app/vault/vaultEntry";
import React, {useState} from "react";

type PasswordTableProps = {
    entries: VaultEntry[]
}

export default function PasswordTable({entries}: PasswordTableProps) {

    const [see, setSee] = useState<boolean>(false)

    const getPasswordContent = (entry: VaultEntry): React.JSX.Element => {
        let password =
            see ? entry.password
                : "*".repeat(entry.password.length);

        return <p>{password}</p>
    }

    return (
        <table className="table-fixed">
            <thead>
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
            </tr>
            </thead>
            <tbody>
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
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}