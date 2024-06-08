"use client";

import React, {useState} from "react";
import Header from "../components/Header";
import Link from "next/link";
import {LogInToVault} from "./api";
import {useRouter} from "next/navigation";

export type User = {
    email: string;
    password: string;
}

export default function LogIn() {
    const [user, setUser] = useState<User>({email: "", password: ""});

    const router = useRouter();

    const handleLogIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const resp = await LogInToVault(user);
            // TODO comment out in end product
            console.log(resp.json())

            if (resp.status === 200) {
                router.push("/vault");
            } else {
                router.push("/loginfailed");
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    }

    return (
        <div>
            <Header title={"Log In"}/>
            <div className={"flex justify-center items-center"}>
                <form className="grid gap-5 text-black w-2/5" onSubmit={handleLogIn}>
                    <input type="text" placeholder="Email"
                           className={"px-4 py-2 input input-bordered border border-blue-500 rounded w-full"}
                           onChange={(e) => setUser({...user, email: e.target.value})}/>
                    <input type="password" placeholder="Password"
                           className={"px-4 py-2 input input-bordered border border-blue-500 rounded w-full"}
                           onChange={(e) => setUser({...user, password: e.target.value})}/>
                    <button type="submit" className="btn bg-teal-400 hover:bg-teal-500 text-black">Log In</button>
                    <Link href="/register " className="btn bg-teal-400 hover:bg-teal-500 text-black">Sign Up</Link>
                </form>
            </div>
        </div>
    );
}
