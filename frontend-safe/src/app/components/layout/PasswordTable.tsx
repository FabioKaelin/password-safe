"use client"

import React, {useEffect, useState} from "react";
import {VaultEntry} from "@/app/vault/vaultEntry";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {deletePassword, getPasswordForUser, editEntryAPI} from "@/app/vault/api";
import {RefreshType} from "@/app/components/modals/NewPasswordModal";
import DeleteConfirmation, {DeleteConfirmationProps} from "@/app/components/modals/DeleteConfirmation";
import EditPasswordModal from "@/app/components/modals/EditPasswordModal";

export default function PasswordTable({isRefresh, setIsRefresh}: RefreshType) {

    const [see, setSee] = useState<{ id: string, visible: boolean }[]>([{id: "", visible: false}])
    const [entries, setEntries] = useState<VaultEntry[]>([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [toBeDeleted, setToBeDeleted] = useState<DeleteConfirmationProps>()
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentEditEntry, setCurrentEditEntry] = useState<VaultEntry | null>(null);

    useEffect(() => {
        const handlePassword = async () => {
            let entries = await getPasswordForUser();
            console.log("entries")
            console.log(entries)
            entries = entries === null ? [] : entries;
            entries.map(x => {
                setSee(prevState => {
                    if (!prevState.some(entry => entry.id === x.id)) {
                        return [...prevState, {id: x.id, visible: false}];
                    }
                    return prevState;
                });
            })
            setEntries(entries)
        }
        if (isRefresh || !isModalOpen) {
            handlePassword();
            setIsRefresh(false);
        }
    }, [isRefresh, isModalOpen]);

    const getPasswordContent = (entry: VaultEntry): React.JSX.Element => {
        let visible = see.find(x => x.id === entry.id)?.visible;
        if (visible === undefined) {
            visible = false;
        }
        let password =
            visible ? entry.password
                : "*".repeat(entry.password?.length);

        return <p>{password}</p>
    }

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
        const response = deletePassword(id);
        response.then((value) => {
            value === "Password deleted" ? setIsRefresh(true) : console.log(value);
        });
    };

    const handleEdit = (entry: VaultEntry) => {
        setCurrentEditEntry(entry);
        setEditModalOpen(true);
    };

    const togglePassword = (id: string) => {
        let foundId = see.find(x => x.id == id)
        if (foundId === undefined) {
            return
        }
        foundId.visible = !foundId.visible

        setSee([...see.filter(x => x.id !== id), foundId])
    }

    // TODO table fixed is not the way to go. when a password is too big it overlaps with the next column
    return (
        <div className="">
            <table className="table md:table-fixed mx-20">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Url</th>
                    <th>Username</th>
                    <th>Password</th>
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
                                <td>
                                    <div className={"flex"}>
                                        {getPasswordContent(entry)}
                                        <button onClick={() => togglePassword(entry.id)} className={"ml-auto"}>
                                            {see.find(x => x.id === entry.id)?.visible ?
                                                <FontAwesomeIcon icon={faEyeSlash}/> : <FontAwesomeIcon icon={faEye}/>}
                                        </button>
                                    </div>

                                </td>
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
                        )
                    })
                }
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
                    <DeleteConfirmation title={"Are you sure?"}
                                        text={"Do you really want to delete the entry you selected?"}
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
