import {CategoryWithApi, Passwords, VaultEntry} from "@/app/vault/vaultEntry";

export type SortHandlerProps = {
    toBeSorted: string;
    sort: { [key: string]: boolean };
    setSort: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    setFilteredEntries: React.Dispatch<React.SetStateAction<VaultEntry>>;
    filteredEntries: VaultEntry;
};

export function sortVaultEntries({sort, toBeSorted, setSort, setFilteredEntries, filteredEntries}: SortHandlerProps) {
    const key = toBeSorted as keyof Passwords
    const isASC = sort[toBeSorted]

    const sortedEntries = filteredEntries.passwords.sort((a, b) => {
        return a[key] > b[key] ? (isASC ? 1 : -1)
            : a[key] < b[key] ? (isASC ? -1 : 1)
                : 0;
    })
    setFilteredEntries({total: filteredEntries.total, page: filteredEntries.page,  passwords: [...sortedEntries]})
    setSort({...sort, [toBeSorted]: !isASC})
}

export const vaultFilter =   (searchInput : string) => (entry : Passwords) => {
    return entry.title.toLowerCase().includes(searchInput.toLowerCase())
        || entry.description.toLowerCase().includes(searchInput.toLowerCase())
        || entry.url.toLowerCase().includes(searchInput.toLowerCase())
        || entry.username.toLowerCase().includes(searchInput.toLowerCase())
        || entry.category.name.toLowerCase().includes(searchInput.toLowerCase())
};

export const categoryFilter = (searchInput : string) => (entry : CategoryWithApi) => {
    return entry.name.toLowerCase().includes(searchInput.toLowerCase())
};