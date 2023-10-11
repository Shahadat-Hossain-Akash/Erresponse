"use client";

import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { GiTripleScratches } from "react-icons/gi";

const Navbar = () => {
  const links = [
    { href: "/", name: "Dashboard" },
    { href: "/issues", name: "Issues" },
  ];
  const currentPath = usePathname();

  return (
    <nav className="flex justify-between px-12 py-4 mb-4  items-center">
      <Link href={"/"}>
        <GiTripleScratches size={"2.5rem"} className="text-lime-300" />
      </Link>

      <ul className=" flex space-x-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={classnames({
              "hover:text-lime-200 transition-colors": true,
              "text-lime-300": link.href === currentPath,
              "text-lime-500": link.href !== currentPath,
            })}
          >
            {link.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
