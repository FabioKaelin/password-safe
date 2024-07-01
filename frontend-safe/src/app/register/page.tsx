"use client"

import {useRouter} from "next/navigation";
import Header from "../components/layout/Header";
import {User} from "../login/page";
import React, {useState} from "react";
import {RegisterUser} from "./api";
import {LogInToVault} from "../login/api";
import ErrorAlert from "@/app/components/alerts/ErrorAlert";

export default function Register() {
    const [user, setUser] = useState<User>({email: "", password: ""});
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        try {
            if (user.email === "" || user.password === "") {
                setErrorMessage("Please fill in all fields");
                return;
            }
            if (user.password.length < 8) {
                setErrorMessage("Password must be at least 8 characters long");
                return;
            }

            const resp = await RegisterUser(user);

            if (resp.status === 201) {
                handleLogIn(e);
            } else if (resp.status === 400) {
                setErrorMessage("A user with that email already exists. Please log in instead.");
            } else {
                setErrorMessage("An unexpected error occurred. Please try again later.");
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    }

    const handleLogIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const resp = await LogInToVault(user);

            if (resp.status === 200) {
                router.push("/vault");
            } else {

                setErrorMessage("Error! It's on us. Sorry :( Please try again later");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setErrorMessage("An unexpected error occurred. Please try again later.");
        }
    }

    return (
        <div className="relative">
            <Header title={"Register"}/>
            {errorMessage && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 z-10">
                    <ErrorAlert message={errorMessage}/>
                </div>
            )}
            <div className="flex justify-center items-center min-h-full">
                <form className="grid gap-5 text-black w-2/5" onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Email"
                        className={"px-4 py-2 input input-bordered border border-blue-500 text-white rounded w-full"}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className={"px-4 py-2 input input-bordered border border-blue-500 text-white rounded w-full"}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                    />
                    <button type="submit" className="btn bg-teal-400 hover:bg-teal-500 text-black">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
