import {VaultEntry} from "@/app/vault/vaultEntry";
import {getPasswordForUser} from "@/app/vault/api";

export type Category = {
    category: string;
}

export function FilterAllCategories(entry: VaultEntry[]): Category[] {
    let categories: Category[] = [];
    entry.forEach((entry) => {
        entry.category !== "" && entry.category !== null &&
            categories.push({category: entry.category})
    })

    return categories;
}

export async function GetAllCategoriesFromVault(): Promise<Category[]> {
    return await getPasswordForUser().then((entries) => {
        return FilterAllCategories(entries);
    });
}