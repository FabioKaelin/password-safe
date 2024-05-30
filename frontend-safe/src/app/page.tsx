"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Header from "@/app/components/Header";

export default function Home() {
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
