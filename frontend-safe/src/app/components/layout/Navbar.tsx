"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import Logo from "./Logo";
import {CheckUser} from "@/app/login/api";
import {UserWithId} from "@/app/login/page";

const Navbar = () => {
    const [user, setUser] = useState<UserWithId>({id: "", email: "", password: ""});
    useEffect(() => {
        const handleLoggedUser = async () => {
            const user = await CheckUser()
            console.log(user)
            setUser(user)
        }

        handleLoggedUser()
    }, []);

    return (
        <>
            <div className="w-full h-20 bg-teal-700 top-0">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex justify-between items-center h-full">
                        <Logo/>
                        <ul className="hidden md:flex gap-x-6 text-white">
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
                                user.id === "" ? (
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
                                    <li>
                                        <Link href="/vault">
                                            <p>Vault</p>
                                        </Link>
                                    </li>
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