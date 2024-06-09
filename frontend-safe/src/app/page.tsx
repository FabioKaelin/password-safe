"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/layout/Navbar";
import Header from "@/app/components/layout/Header";
import React, {useEffect} from "react";

export default function Home() {
    
  return (
      <>
          <div>
              <Header title={"Hi"} />
              <Link href="/login" className="btn bg-teal-400 hover:bg-teal-500 text-black">
                  Log In
              </Link>
              <Link href="/register " className="btn bg-teal-400 hover:bg-teal-500 text-black">
                  Sign Up
              </Link>
          </div>
      </>
  );
}
