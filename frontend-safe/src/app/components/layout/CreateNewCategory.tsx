import React, {useState} from "react";
import {Category} from "@/app/vault/category";
import {VaultEntry} from "@/app/vault/vaultEntry";


export type NewCategoryProps = {
    newCategory: Category;
    setNewCategory: React.Dispatch<React.SetStateAction<Category>>
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    entry: VaultEntry;
}
export default function CreateNewCategory({newCategory, setNewCategory, categories, setCategories, entry}: NewCategoryProps) {


    const [isNewCategory, setIsNewCategory] = useState<boolean>(false)
    return (
        <div>
            <div className={"flex items-center justify-center"}>
                <button type={"button"} onClick={() => setIsNewCategory(!isNewCategory)}>Create a new
                    category
                </button>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button"
                         className="btn btn-circle btn-ghost btn-xs text-info">
                        <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 24 24" className="w-4 h-4 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div tabIndex={0}
                         className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64">
                        <div tabIndex={0} className="card-body">
                            <h2 className="card-title">Attention!</h2>
                            <p>When you add a category it will not be automatically changed in the category modal and
                                not
                                created until you save the password</p>
                        </div>
                    </div>
                </div>
            </div>
            {
                isNewCategory && (
                    <div className={"grid"}>
                        <input
                            name="newCategory"
                            placeholder="Create new Category"
                            value={newCategory.category}
                            onChange={(e) => setNewCategory({category: e.target.value})}
                            className="px-4 py-2 input input-bordered border border-blue-500 rounded"
                        />
                        <br/>
                        <button type={"button"} onClick={() => {
                            if (entry.category !== newCategory.category) {
                                setCategories([...categories, newCategory])
                            }
                            setNewCategory({category: ""})
                            setIsNewCategory(!isNewCategory)
                        }}>Create category
                        </button>
                    </div>

                )
            }
        </div>
    )

}