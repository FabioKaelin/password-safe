"use client";

import Image from "next/image";
import LogIn from "./pages/LogIn";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-red-500">Home</h1>
      <Link href="/login">Go to Login</Link>
    </div>
  );
}
