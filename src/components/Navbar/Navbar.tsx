import { NavbarDataTypes } from "@/types/navbar-types";
import Image from "next/image";
import Link from "next/link";

const navbarData: NavbarDataTypes[] = [
  {
    title: "Login",
    href: "/login",
  },
  {
    title: "Register",
    href: "/register",
  },
];

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-20 p-primary shadow-xl ">
      <Link href={"/"} className="relative block size-14">
        <Image
          src={"/medical-logo.jpg"}
          fill
          alt="Logo"
          className="object-cover"
        />
      </Link>
      <div className="flex gap-7 font-semibold">
        {navbarData.map(({ title, href }, index) => (
          <Link key={index} href={href}>
            {title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
