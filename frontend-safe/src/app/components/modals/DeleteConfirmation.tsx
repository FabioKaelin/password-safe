"use client"

import React from "react";

export type DeleteConfirmationProps = {
    title: string;
    text: string;
    handleDelete: (id: string) => Promise<void>;
    isModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    id: string
};


export default function DeleteConfirmation({title, text, handleDelete, isModalOpen, id}: DeleteConfirmationProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="bg-neutral rounded-lg shadow-lg w-full max-w-md p-6 relative">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{text}</p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn mx-1" onClick={() => {
                            handleDelete(id).then(() => isModalOpen(false))
                        }}>Confirm
                        </button>
                        <button className="btn ml-1" onClick={() => isModalOpen(false)}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
}