"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

export default function Home() {
  return (
      <><Navbar/>
          <div>
              <h1 className="text-red-500">Home</h1>
              <Link href="/login">Go to Login</Link>
          </div>
      </>
  );
}
