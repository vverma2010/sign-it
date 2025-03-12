import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full bg-gray-900 text-white py-6 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Logo / Brand Name */}
        <div className="text-xl font-semibold">
          {/* SwiftSign<span className="text-blue-400">.</span> */}
          <Link href="/">
            <Image src="/Sign-it.png" width={100} height={100} alt="SwiftSign" />
          </Link>
        </div>
        {/* Navigation Links */}
        Developed by Vaibhav with ❤️
        {/* Social Icons */}
        <div className="mt-4 md:mt-0 flex space-x-4">
          <a
            href="https://www.linkedin.com/in/vaibhav-verma-a73238130/"
            target="_blank"
            className="hover:text-blue-400"
          >
            <Image src="/Linkedin.png" width={20} height={20} alt="Linkedin" />
          </a>
          <a
            href="https://www.github.com/vverma2010"
            target="_blank"
            className="hover:text-blue-400"
          >
            <Image src="/Github.png" width={20} height={20} alt="Github" />
          </a>
          <a
            href="https://www.medium.com/@vverma4313"
            target="_blank"
            className="hover:text-blue-400"
          >
            <Image src="/medium.png" width={20} height={20} alt="medium" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-gray-400 text-xs">
        © {new Date().getFullYear()} SwiftSign. All rights reserved.
      </div>
    </footer>
  );
};
