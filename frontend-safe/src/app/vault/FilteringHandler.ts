import {CategoryWithApi, PagingProps, VaultEntry} from "@/app/vault/vaultEntry";

export type SortHandlerProps = {
    toBeSorted: string;
    sort: { [key: string]: boolean };
    setSort: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    setFilteredEntries: React.Dispatch<React.SetStateAction<VaultEntry[]>>;
    filteredEntries: VaultEntry[];
};

export function sortVaultEntries({sort, toBeSorted, setSort, setFilteredEntries, filteredEntries}: SortHandlerProps) {
    const key = toBeSorted as keyof VaultEntry
    const isASC = sort[toBeSorted]

    const sortedEntries = filteredEntries.sort((a, b) => {
        return a[key] > b[key] ? (isASC ? 1 : -1)
            : a[key] < b[key] ? (isASC ? -1 : 1)
                : 0;
    })
    setFilteredEntries([...sortedEntries])
    setSort({...sort, [toBeSorted]: !isASC})
}

export const vaultFilter = (searchInput : string) => (entry : VaultEntry) => {
    return entry.title.toLowerCase().includes(searchInput.toLowerCase())
        || entry.description.toLowerCase().includes(searchInput.toLowerCase())
        || entry.url.toLowerCase().includes(searchInput.toLowerCase())
        || entry.username.toLowerCase().includes(searchInput.toLowerCase())
        || entry.category.name.toLowerCase().includes(searchInput.toLowerCase())
};

export const categoryFilter = (searchInput : string) => (entry : CategoryWithApi) => {
    return entry.name.toLowerCase().includes(searchInput.toLowerCase())
};




export function paginateEntries({ entries, currentPage, setPage }: PagingProps): VaultEntry[] {
    const entriesPerPage = 10;
    const start = (currentPage - 1) * entriesPerPage;
    const end = currentPage * entriesPerPage;

    if (start >= entries.length) {
        setPage(Math.max(1, Math.ceil(entries.length / entriesPerPage)));
        return entries.slice(0, entriesPerPage);
    }

    return entries.slice(start, end);
}



