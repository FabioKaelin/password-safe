export type VaultEntry = {
    total: number;
    page: number;
    passwords: Passwords[];
}

export type Passwords = {
    id: string;
    description: string;
    password: string;
    title: string;
    url: string;
    userid: string;
    username: string;
    category: CategoryWithApi;
}

export type CategoryWithApi = {
    id: string;
    name: string;
    userid: string;
}

export type PagingProps = {
    entries: VaultEntry[];
    currentPage: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};