"use client";

import React from "react";
import Header from "../components/Header";
import Router, { useRouter } from "next/navigation";
import Link from "next/link";

export default function LogIn() {
  const router = useRouter();
  return (
    <div>
      <Header title={"Log In"} />
      <form className="grid grid-gap-5 grid-row-7">
        <input type="text" placeholder="Username" />
        <br />
        <input type="password" placeholder="Password" />
        <br />
        <button>Log In</button>
        <br />
        <Link href="/register">Sign Up</Link>
      </form>
    </div>
  );
}
