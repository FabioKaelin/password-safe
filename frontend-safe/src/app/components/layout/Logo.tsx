"use client"

import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return (
        <Link href={"/"} className={"flex items-center h-full btn btn-ghost"}>
            <Image src="/passwordguy.png" alt="logo" width={"75"} height={"75"}/>
            <h1 className={"text-3xl mx-5 text-white"}>RoboGuard</h1>
        </Link>
    );
};

export default Logo;