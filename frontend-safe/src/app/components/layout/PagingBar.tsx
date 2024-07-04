import { paginateEntries } from "@/app/vault/FilteringHandler";
import { VaultEntry } from "@/app/vault/vaultEntry";
import { useState } from "react";

const PagingBar = ({ entries }: { entries: VaultEntry[] }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const paginatedEntries = paginateEntries({ entries, currentPage, setPage: setCurrentPage });

    return (
        <div>
            <ul>
                {paginatedEntries.map(entry => (
                    <li key={entry.id}>{entry.title}</li>
                ))}
            </ul>
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Previous</button>
            <button onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
        </div>
    );
};

export default PagingBar