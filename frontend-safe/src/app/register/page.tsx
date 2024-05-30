"use client"

import { useRouter } from "next/navigation";
import Header from "../components/Header";
import { User } from "../login/page";
import { useState } from "react";
import { RegisterUser } from "./api";
import { LogInToVault } from "../login/api";

export default function Register() {
  const [user, setUser] = useState<User>({ email: "", password: "" });

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await RegisterUser(user);

      if (resp.status === 201) {
        handleLogIn(e);
      } else {
        router.push("/loginfailed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await LogInToVault(user);

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
      <Header title={"Register"} />
      <form className="grid grid-gap-5 grid-row-7 text-black" onSubmit={handleRegister}>
        <input type="text" placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
        <br />
        <input type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
        <br />
        <button type="submit" className="text-white">Register</button>
        <br />
      </form>
    </div>
  );
}
