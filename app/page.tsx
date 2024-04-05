"use client";

import Modal from "@/components/ui/Modal";
import Image from "next/image";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1>Home</h1>
      <Link href="/login">Log in</Link>
    </div>
  );
}
