import Image from "next/image";
import LogIn from "./components/LogIn";

export default function Home() {
  return (
    <div>
      <h1 className="text-red-500">Home</h1>
      <LogIn />
    </div>
  );
}
