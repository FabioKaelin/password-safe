import React from "react";
import Header from "../components/Header";

export default function LogIn() {
  return (
    <div>
      <Header title={"Log In"} />
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Log In</button>
      </form>
    </div>
  );
}
