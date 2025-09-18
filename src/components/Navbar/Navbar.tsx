// Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // <--- راقب تغيير الصفحة

  // راقب token أو page change
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, [pathname]); // كل مرة الصفحة تتغير، يحدث الـ state

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between h-20 p-primary shadow-xl">
      <Link href={"/"} className="relative block size-14">
        <Image src={"/medical-logo.jpg"} fill alt="Logo" className="object-cover" />
      </Link>

      <div className="flex gap-7 font-semibold">
        {loggedIn ? (
          <button onClick={handleLogout} className="cursor-pointer">
            Logout
          </button>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
