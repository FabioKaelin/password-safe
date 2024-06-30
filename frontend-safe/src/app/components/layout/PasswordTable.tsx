"use client"

import React, {useEffect, useState} from "react";
import {VaultEntry} from "@/app/vault/vaultEntry";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faSort} from "@fortawesome/free-solid-svg-icons";
import {deletePassword, getPasswordForUser} from "@/app/vault/api";
import {RefreshType} from "@/app/components/modals/NewPasswordModal";
import DeleteConfirmation, {DeleteConfirmationProps} from "@/app/components/modals/DeleteConfirmation";
import EditPasswordModal from "@/app/components/modals/EditPasswordModal";
import {useRouter} from "next/navigation";
import {createFilterFunction, sortEntries} from "@/app/vault/FilteringHandler";

export default function PasswordTable({isRefresh, setIsRefresh}: RefreshType) {

    const [see, setSee] = useState<{ id: string, visible: boolean }[]>([{id: "", visible: false}])
    const [entries, setEntries] = useState<VaultEntry[]>([])
    const [filteredEntries, setFilteredEntries] = useState<VaultEntry[]>([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [toBeDeleted, setToBeDeleted] = useState<DeleteConfirmationProps>()
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentEditEntry, setCurrentEditEntry] = useState<VaultEntry | null>(null);
    const [categoryInput, setCategoryInput] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<{ [key: string]: boolean }>({});
    const [searchInput, setSearchInput] = useState<string>("");

    const router = useRouter()

    const handleSort = (key: string) => {
        setSortOrder({...sortOrder, [key]: !sortOrder[key]})
        sortEntries({
            sort: sortOrder,
            toBeSorted: key,
            setSort: setSortOrder,
            setFilteredEntries: setFilteredEntries,
            filteredEntries: filteredEntries,
        })
    }

    useEffect(() => {
        if (searchInput === " " || searchInput === "" || searchInput === null) {
            setFilteredEntries(entries)
            return
        }
        // Higher Function method
        const res = filteredEntries.filter(createFilterFunction(searchInput));
        setFilteredEntries(res)
    }, [searchInput]);

    useEffect(() => {
        const handlePassword = async () => {
            let entries = await getPasswordForUser();
            if (entries.status === 401) {
                router.push("/login");
            }

            let entriesOnly = await entries.vault;

            console.log("entries")
            console.log(entries)
            entriesOnly = entriesOnly === null ? [] : entriesOnly;
            entriesOnly.map(x => {
                setSee(prevState => {
                    if (!prevState.some(entry => entry.id === x.id)) {
                        return [...prevState, {id: x.id, visible: false}];
                    }
                    return prevState;
                });
            })
            setEntries(entriesOnly)
            setFilteredEntries(entriesOnly)
        }
        if (isRefresh || !isModalOpen) {
            handlePassword();
            setIsRefresh(false);
        }

    }, [isRefresh, isModalOpen]);

    useEffect(() => {
        if (categoryInput === " " || categoryInput === "" || categoryInput === null) {
            setFilteredEntries(entries)
            return
        }
        const filtered =
            entries.filter(entry => entry.category?.name.toLowerCase().includes(categoryInput.toLowerCase()));
        setFilteredEntries(filtered)
    }, [categoryInput]);

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
            value === 401 && router.push("/login")
            value === 204 ? setIsRefresh(true) : console.log(value);
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

    // TODO IMPORTANT - NPM RUN BUILdD IS FAILING

    // TODO table fixed is not the way to go. when a password is too big it overlaps with the next column
    return (
        <div className="">
            <div className={"flex items-center justify-center gap-x-5"}>
                <div>
                    <label className="label">Filter for a category:</label>
                    <input
                        name="category"
                        placeholder="Filter for a category"
                        value={categoryInput}
                        onChange={(e) => setCategoryInput(e.target.value)}
                        className="px-4 py-2 mb-3 input input-bordered border border-blue-500 rounded"
                    />
                </div>
                <div>
                    <label className="label">Filter for everything:</label>
                    <input
                        name="search"
                        placeholder="Search with a query"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="px-4 py-2 mb-3 input input-bordered border border-blue-500 rounded"
                    />
                </div>
            </div>


            <table className="table md:table-fixed mx-20">
                <thead>
                <tr>
                    <th>Title <button onClick={() => handleSort("title")}>
                        <FontAwesomeIcon icon={faSort}/></button></th>

                    <th>Description <button onClick={() => handleSort("description")}>
                        <FontAwesomeIcon icon={faSort}/></button></th>
                    <th>Url</th>
                    <th>Username <button onClick={() => handleSort("username")}>
                        <FontAwesomeIcon icon={faSort}/></button></th>
                    <th>Password</th>
                    <th>Category</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                {
                    filteredEntries.map(entry => {
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
                                <td>{entry.category.name}</td>
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
                    <th>Category</th>
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
                    setIsOpen={setEditModalOpen}/>
            )}
        </div>
    );
}
