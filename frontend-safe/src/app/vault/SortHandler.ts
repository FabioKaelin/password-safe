import {VaultEntry} from "@/app/vault/vaultEntry";

export type SortHandlerProps = {
    toBeSorted: string;
    sort: { [key: string]: boolean };
    setSort: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    setFilteredEntries: React.Dispatch<React.SetStateAction<VaultEntry[]>>;
    filteredEntries: VaultEntry[];
    setIsRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

export function sortEntries({sort, toBeSorted, setSort, setFilteredEntries, filteredEntries, setIsRefresh}: SortHandlerProps) {
    const key = toBeSorted as keyof VaultEntry
    const isASC = sort[toBeSorted]

    const sortedEntries = filteredEntries.sort((a, b) => {
        return a[key] > b[key] ? (isASC ? 1 : -1)
                : a[key] < b[key] ? (isASC ? -1 : 1)
                : 0;
    })
    setFilteredEntries([...sortedEntries])
    setSort({...sort, [toBeSorted]: !isASC})
    setIsRefresh(true)
}