import {VaultEntry} from "@/app/vault/vaultEntry";
import {getPasswordForUser} from "@/app/vault/api";

export type Category = {
    category: string;
}

export function FilterAllCategories(entry: VaultEntry[]): Category[] {
    let categories: Category[] = [];
    if (entry == null || entry.length === 0)
        return categories;
    entry.forEach((entry) => {
        entry.category !== "" && entry.category !== null &&
        categories.filter((category) => category.category === entry.category).length === 0 &&
        categories.push({category: entry.category})
    })

    return categories;
}

export async function GetAllCategoriesFromVault(): Promise<Category[]> {
    return await getPasswordForUser().then(async (entries) => {
        const vaultEntries = await entries.vault
        return FilterAllCategories(vaultEntries);
    });
}