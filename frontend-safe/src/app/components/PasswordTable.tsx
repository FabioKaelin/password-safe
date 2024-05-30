"use client"

import {VaultEntry} from "@/app/vault/vaultEntry";
import {retry} from "next/dist/compiled/@next/font/dist/google/retry";

type PasswordTableProps = {
    entries: VaultEntry[]
}

export default function PasswordTable({entries}: PasswordTableProps) {
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
                            <td>{entry.password}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}