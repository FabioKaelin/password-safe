"use client"

import React, {useEffect, useState} from "react";
import {CategoryWithApi, VaultEntry} from "@/app/vault/vaultEntry";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSort} from "@fortawesome/free-solid-svg-icons";
import {RefreshType} from "@/app/components/modals/NewPasswordModal";
import DeleteConfirmation, {DeleteConfirmationProps} from "@/app/components/modals/DeleteConfirmation";
import EditPasswordModal from "@/app/components/modals/EditPasswordModal";
import {useRouter} from "next/navigation";
import {categoryFilter, sortVaultEntries} from "@/app/vault/FilteringHandler";
import {deleteCategories, getCategories} from "@/app/category/api";
import EditCategoryModal from "@/app/components/modals/EditCategoryModal";

export default function CategoriesTable({isRefresh, setIsRefresh}: RefreshType) {

    const [categories, setCategories] = useState<CategoryWithApi[]>([])
    const [filteredEntries, setFilteredEntries] = useState<CategoryWithApi[]>([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [toBeDeleted, setToBeDeleted] = useState<DeleteConfirmationProps>()
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentEditEntry, setCurrentEditEntry] = useState<CategoryWithApi | null>(null);
    const [searchInput, setSearchInput] = useState<string>("");

    const router = useRouter()

    useEffect(() => {
        if (searchInput === " " || searchInput === "" || searchInput === null) {
            setFilteredEntries(categories)
            return
        }
        const res = filteredEntries.filter(categoryFilter(searchInput));
        setFilteredEntries(res)
    }, [searchInput]);

    useEffect(() => {
        const handleCategories = async () => {
            const resp = await getCategories();
            console.log(resp)
            if (resp.status === 401) {
                router.push("/login");
            }
            const categories = await resp.category
            setCategories(categories);
        }
        if (isRefresh || !isModalOpen) {
            handleCategories();
            setIsRefresh(false);
        }

    }, [isRefresh, isModalOpen]);

    const handleDelete = (id: string) => {
        setToBeDeleted({
            title: "Are you sure?",
            text: "Do you really want to delete this category?",
            handleDelete: () => deleteEntry(id),
            isModalOpen: setIsModalOpen,
            id: id
        });
        setIsModalOpen(true);
    };

    const deleteEntry = async (id: string): Promise<void> => {
        const response = deleteCategories(id);

        response.then((value) => {
            value === 401 && router.push("/login")
            value === 204 ? setIsRefresh(true) : console.log(value);
        });
    };

    const handleEdit = (entry: CategoryWithApi) => {
        setCurrentEditEntry(entry);
        setEditModalOpen(true);
    };


    return (
        <div className="">
            <div className={"flex items-center justify-center gap-x-5"}>
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
                                    <div className="font-bold">{entry.name}</div>
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
                    <th>Category</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
                </tfoot>
            </table>

            {
                isModalOpen && (
                    <DeleteConfirmation title={toBeDeleted?.title || ""}
                                        text={toBeDeleted?.text || ""}
                                        handleDelete={() => deleteEntry(toBeDeleted!.id)}
                                        isModalOpen={setIsModalOpen} id={toBeDeleted!.id}/>
                )
            }

            {editModalOpen && currentEditEntry && (
                <EditCategoryModal
                    entry={currentEditEntry}
                    isOpen={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onUpdated={() => setIsRefresh(true)}
                    setIsOpen={setEditModalOpen}/>
            )}
        </div>
    );
}
