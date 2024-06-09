"use client";

import Image from "next/image";
import {useRouter} from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/layout/Navbar";
import Header from "@/app/components/layout/Header";
import React, {useEffect} from "react";

export default function Home() {

    return (
        <>
            <div>
                <Header title={"Home"}/>
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
