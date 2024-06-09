"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/layout/Navbar";
import Header from "@/app/components/layout/Header";
import {useEffect} from "react";

export default function Home() {
    // TODO to be removed when home page is existing
    const router = useRouter();
    useEffect(() => {
        router.push("/login");
    }, []);
  return (
      <>
          <div>
              <Header title={"Hi"} />
              <h1 className="text-red-500">Home</h1>
              <Link href="/login">Go to Login</Link>
          </div>
      </>
  );
}
