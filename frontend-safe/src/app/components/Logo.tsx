import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "./Button";
import Navbar from "@/app/components/navbar";

const Logo = () => {
    return (
        <img src="/Bild.png" alt="logo" width={"50"} height={"50"}/>
    );
};

export default Logo;