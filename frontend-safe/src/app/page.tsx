"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/layout/Header";
import React from "react";

export default function Home() {

    return (
        <>
            <div>
                <Header title={"Home"}/>
                <div className={"flex justify-center items-center"}>
                    <Image src={"/passwordguy.png"} alt={"robo with password"} width={"300"} height={"300"}/>
                    <h1 className={"text-3xl"}>RoboGuard</h1>
                </div>
                <div className={"flex justify-center items-center min-h-full"}>
                    <div className={"grid gap-5 text-black w-2/5"}>
                        <Link href="/login" className="btn bg-teal-400 hover:bg-teal-500 text-black">
                            Log In
                        </Link>
                        <Link href="/register " className="btn bg-teal-400 hover:bg-teal-500 text-black">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
