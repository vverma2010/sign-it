"use client";
import Image from "next/image";
export const Navbar = () => {
  return (
    <div className="flex justify-center w-screen">
      <nav className="bg-gray-800 p-4 w-full">
        <div className="container mx-auto flex items-center justify-center">
          <Image
            src="/Sign-it.png"
            alt="Logo"
            width={100}
            height={50}
            className="object-contain"
          />
        </div>
      </nav>
    </div>
  );
};
