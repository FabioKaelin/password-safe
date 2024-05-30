"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Link from "next/link";
import { LogInToVault } from "./api";
import { useRouter } from "next/navigation";

export type User = {
  email: string;
  password: string;
}

export default function LogIn() {
  const [user, setUser] = useState<User>({ email: "", password: "" });

  const router = useRouter();

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await LogInToVault(user);
      // TODO comment out in end product
      console.log(resp.json())
      
      if (resp.status === 200) {
        router.push("/vault");
      } else {
        router.push("/loginfailed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  return (
    <div>
      <Header title={"Log In"} />
      <form className="grid grid-gap-5 grid-row-7 text-black" onSubmit={handleLogIn}>
        <input type="text" placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
        <br />
        <input type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
        <br />
        <button type="submit" className="text-white">Log In</button>
        <br />
        <Link href="/register " className="text-white">Sign Up</Link>
      </form>
    </div>
  );
}
