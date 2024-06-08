"use client";

import React, {useState} from "react";
import Header from "../components/Header";
import Link from "next/link";
import {LogInToVault} from "./api";
import {useRouter} from "next/navigation";
import ErrorAlert from "@/app/components/ErrorAlert";

export type User = {
    email: string;
    password: string;
}

export default function LogIn() {
    const [user, setUser] = useState<User>({email: "", password: ""});
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to hold error message
    const router = useRouter();

    const handleLogIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null); 
        try {
            const resp = await LogInToVault(user);

            if (resp.status === 200) {
                router.push("/vault");
            } else if (resp.status === 401) {
                setErrorMessage("Error! The log in failed. Please ensure your email and password is correct");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setErrorMessage("Error! It's on us. Sorry :( Please try again later");
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
            {errorMessage && <ErrorAlert message={errorMessage} />} {/* Conditionally render ErrorAlert */}
        </div>
    );
}