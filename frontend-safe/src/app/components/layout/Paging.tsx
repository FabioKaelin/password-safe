import {VaultEntry} from "@/app/vault/vaultEntry";
import {getPasswordForUser} from "@/app/vault/api";

export type PagingProps = {
    currentPage: number;
    totalPages: number;
    setEntries: React.Dispatch<React.SetStateAction<VaultEntry>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function Paging({currentPage, totalPages, setEntries, setPage}: PagingProps) {
    const handlePageChange = async (page: number) => {
        const res = await getPasswordForUser(page)
        await res.vault.then((data) => {
            setEntries(data)
            setPage(page)
        })
    }

    return (
        <div className={"flex justify-center items-center"}>
            <button
                onClick={() => {
                    if (currentPage === 1) return;
                    handlePageChange(currentPage - 1)
                }}
                className={"px-4 py-2 bg-teal-400 text-black rounded hover:bg-teal-500 mx-5"}>
                Previous
            </button>
            <div>{currentPage} of {totalPages}</div>
            <button
                onClick={() => {
                    if (currentPage == totalPages) return;
                    handlePageChange(currentPage + 1)
                }}
                className={"px-4 py-2 bg-teal-400 text-black rounded hover:bg-teal-500 mx-5"}>
                Next
            </button>
        </div>
    );
}