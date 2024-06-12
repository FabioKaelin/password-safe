"use client"

import React, {useEffect, useState} from "react";
import {VaultEntry} from "@/app/vault/vaultEntry";
import {changeMasterPassword, createNewEntry} from "@/app/vault/api";
import {useRouter} from "next/navigation";
import Router from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {UserWithId} from "@/app/login/page";
import {CheckUser} from "@/app/login/api";


export type RefreshType = {
    isRefresh: boolean,
    setIsRefresh: React.Dispatch<React.SetStateAction<boolean>>
};
export default function ChangeMasterPassword({setIsRefresh}: RefreshType) {
    const router = useRouter();
    const [user, setUser] = useState<UserWithId>({email: "", id: "", password: ""});
    const [isOpen, setIsOpen] = useState(false);
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const changeUserDetails = async () => {
            const userResp = await changeMasterPassword(user);
            if (userResp.status === 401) {
                router.push("/login");
            }

            const userWithId = await userResp.user
            setUser(userWithId);
            setIsOpen(false);
            setIsRefresh(true)
        };
        changeUserDetails()
    };

    useEffect(() => {
        const getUser = async () => {
            const user = await CheckUser();
            setUser(user);
        }
        getUser()
    }, []);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-teal-400 text-black rounded hover:bg-teal-500 mx-5"
            >
                Change Master Password
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="bg-neutral rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl mb-4 font-bold text-white">Change Master password</h2>
                        <form onSubmit={handleSubmit} className="grid gap-4">
                            <input
                                name="user"
                                placeholder="User"
                                value={user.email}
                                className="px-4 py-2 input input-bordered border border-blue-500 rounded disabled"
                            />
                            <span>
                                <input
                                    name="password"
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                    value={user.password}
                                    onChange={(e) => setUser({
                                        ...user,
                                        password: e.target.value
                                    })}
                                    className="px-4 py-2 input input-bordered border border-blue-500 rounded w-4/5"
                                />
                               <button type="button" onClick={() => setShowPassword(!showPassword)}
                                       className={"px-4 py-2 border border-blue-500 rounded h-full mx-1 w-1/6"}>
                                  {showPassword ? (
                                      <>
                                          <FontAwesomeIcon icon={faEyeSlash}/>
                                      </>
                                  ) : (
                                      <>
                                          <FontAwesomeIcon icon={faEye}/>
                                      </>
                                  )}
                               </button>
                            </span>
                            <br/>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-teal-400 text-black rounded hover:bg-teal-500 rounded "
                            >
                                Change Master Password
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}