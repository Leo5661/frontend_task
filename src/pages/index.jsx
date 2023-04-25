import Image from "next/image";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import { useContext, useEffect, useState } from "react";
import TheamContext from "@/context/TheamContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const appConfig = useContext(TheamContext);
  return (
    <main className={`item-center flex flex-col ${inter.className}`}>
      <Nav />
      <div className="content flex h-screen grow justify-center">
        App Config
        {JSON.stringify(appConfig)}
      </div>
    </main>
  );
}
