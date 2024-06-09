import Image from "next/image";
import { useEffect, useState } from "react";

const Logo = () => {
    return (
        <div className={"flex items-center"}>
            <Image src="/passwordguy.png" alt="logo" width={"75"} height={"75"}/>
            <h1 className={"text-3xl mx-5 text-white"}>RoboGuard</h1>
        </div>
    );
};

export default Logo;