"use client"

import React, { useEffect, useState } from "react";
import { VaultEntry } from "@/app/vault/vaultEntry";
import { deletePassword, getPasswordForUser, editEntryAPI } from "@/app/vault/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { RefreshType } from "@/app/components/modals/NewPasswordModal";
import DeleteConfirmation, { DeleteConfirmationProps } from "@/app/components/modals/DeleteConfirmation";
import EditPasswordModal from "@/app/components/modals/EditPasswordModal";  // Stellen Sie sicher, dass der Pfad korrekt ist

export default function PasswordTable({ isRefresh, setIsRefresh }: RefreshType) {
    const [see, setSee] = useState<boolean>(false);
    const [entries, setEntries] = useState<VaultEntry[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [toBeDeleted, setToBeDeleted] = useState<DeleteConfirmationProps>();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentEditEntry, setCurrentEditEntry] = useState<VaultEntry | null>(null);

    useEffect(() => {
        const handlePassword = async () => {
            const entries = await getPasswordForUser();
            setEntries(entries == null ? [] : entries);
            console.log(entries);
        };
        if (isRefresh || !isModalOpen) {
            handlePassword();
            setIsRefresh(false);
        }
    }, [isRefresh, isModalOpen]);

    const getPasswordContent = (entry: VaultEntry): React.JSX.Element => {
        let password = see ? entry.password : "*".repeat(entry.password?.length);
        return <p>{password}</p>;
    };

    const handleDelete = (id: string) => {
        setToBeDeleted({
            title: "Hi",
            text: "Do you really want to?",
            handleDelete: () => deleteEntry(id),
            isModalOpen: setIsModalOpen,
            id: id
        });
        setIsModalOpen(true);
    };

    const deleteEntry = async (id: string): Promise<void> => {
        console.log(id);
        const response = deletePassword(id);
        response.then((value) => {
            value === "Password deleted" ? setIsRefresh(true) : console.log(value);
        });
    };

    const handleEdit = (entry: VaultEntry) => {
        setCurrentEditEntry(entry);
        setEditModalOpen(true);
    };

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
                                            <FontAwesomeIcon icon={faEyeSlash} className={"h-2/4"}/>
                                        ) : (
                                            <FontAwesomeIcon icon={faEye} className={"h-2/4"}/>
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
                {entries.map(entry => (
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
                                    onClick={() => handleEdit(entry)}>
                                edit
                            </button>
                        </th>
                    </tr>
                ))}
                </tbody>
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

            {
                isModalOpen && (
                    <DeleteConfirmation title={"Are you sure?"} text={"Do you really want to delete the entry you selected?"}
                                        handleDelete={() => deleteEntry(toBeDeleted!.id)}
                                        isModalOpen={setIsModalOpen} id={toBeDeleted!.id}/>
                )
            }

            {editModalOpen && currentEditEntry && (
                <EditPasswordModal
                    entry={currentEditEntry}
                    isOpen={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onUpdated={() => setIsRefresh(true)}
                />
            )}
        </div>
    );
}
