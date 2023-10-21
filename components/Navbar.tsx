"use client";

import { Button } from "@nextui-org/react";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { GiPerpendicularRings } from "react-icons/gi";

const Navbar = () => {
  const links = [
    { href: "/", name: "Dashboard" },
    { href: "/issues", name: "Issues" },
  ];
  const currentPath = usePathname();

  return (
    <nav className="flex justify-between px-12 py-4 mb-4  items-center font-quicksand">
      <Link href={"/"}>
        <GiPerpendicularRings
          color={"#EA712E"}
          size={"2.5rem"}
          className="text-gray-100"
        />
      </Link>

      <div className=" flex space-x-4 font-quicksand">
        {links.map((link, idx) => (
          <>
            <Link
              key={idx}
              href={link.href}
              className={classnames({
                "hover:text-amber-700 transition-colors": true,
                "text-amber-600": link.href === currentPath,
                "text-amber-500": link.href !== currentPath,
              })}
            >
              <Button key={idx} variant="light" color="primary">
                {link.name}
              </Button>
            </Link>
          </>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
