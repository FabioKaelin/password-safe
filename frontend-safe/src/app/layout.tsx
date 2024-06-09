import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Password Safe",
    description: "Here to SAVE YOU",
};

export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" >
        <body className={`${inter.className} flex flex-col h-full`}>
        <div className={"flex-grow"}>
            {children}
        </div>
        <div>
            <Footer />
        </div>
        </body>
        </html>
    );
}
