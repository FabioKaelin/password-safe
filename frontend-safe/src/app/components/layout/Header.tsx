"use client"

import Navbar from "@/app/components/layout/Navbar";

type HeaderProps = {
    title: string;
};

export default function Header({title}: HeaderProps) {
    return (
        <header>
            <Navbar/>
            <h1 className="text-4xl my-5 mx-[150px] font-bold">{title}</h1>
        </header>
    );
}
