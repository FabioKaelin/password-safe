"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import Logo from "./Logo";
import {CheckUser, LogOut} from "@/app/login/api";
import {UserWithId} from "@/app/login/page";
import {useRouter} from "next/navigation";

const Navbar = () => {
    const [user, setUser] = useState<UserWithId>({id: "", email: "", password: ""});

    const router = useRouter();

    useEffect(() => {
        const handleLoggedUser = async () => {
            const user = await CheckUser()
            if (user.id === null) {
                setUser({id: "", email: "", password: ""})
                return
            }
            console.log(user)
            setUser(user)
        }

        handleLoggedUser()
    }, []);

    const handleLogout = async () => {
        const resp = await LogOut()
        setUser({id: "", email: "", password: ""})
        router.push("/login")
    }

    <div className="navbar bg-base-100">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
                <li><a>Link</a></li>
                <li>
                    <details>
                        <summary>
                            Parent
                        </summary>
                        <ul className="p-2 bg-base-100 rounded-t-none">
                            <li><a>Link 1</a></li>
                            <li><a>Link 2</a></li>
                        </ul>
                    </details>
                </li>
            </ul>
        </div>
    </div>
    return (
        <>
            <div className="w-full h-20 bg-teal-700 top-0">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex justify-between items-center h-full">
                        <Logo/>
                        <ul className="menu menu-horizontal px-1 rounded">
                            <li>
                                <Link href="/">
                                    <p>Home</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/about">
                                    <p>About</p>
                                </Link>
                            </li>
                            {
                                user.id === "" || user === null ? (
                                    <>
                                        <li>
                                            <Link href="/login">
                                                <p>Login</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/register">
                                                <p>Register</p>
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link href="/vault">
                                                <p>Vault</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <button onClick={handleLogout}>LogOut</button>
                                        </li>
                                    </>

                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Navbar;