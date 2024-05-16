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
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Log In</button>
        <Link href="/register">Sign Up</Link>
      </form>
    </div>
  );
}
