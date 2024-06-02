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
                <th>Password</th>
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
                                <button onClick={() => setSee(!see)}>See</button>
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}