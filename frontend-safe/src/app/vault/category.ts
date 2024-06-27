import {VaultEntry} from "@/app/vault/vaultEntry";
import {getPasswordForUser} from "@/app/vault/api";

export type Category = {
    category: string;
}

export function FilterAllCategories(entries: VaultEntry[]): Category[] {
    let categories: Category[] = [];
    if (entries == null || entries.length === 0)
        return categories;
    entries.forEach((entry) => {
        entry !== null && entry.category !== null && entry.category.id !== "" &&
        categories.filter((category) => category.category === entry.category.id).length === 0 &&
        categories.push({category: entry.category.id})
    })

    return categories;
}

export async function GetAllCategoriesFromVault(): Promise<Category[]> {
    return await getPasswordForUser().then(async (entries) => {
        const vaultEntries = await entries.vault
        return FilterAllCategories(vaultEntries);
    });
}