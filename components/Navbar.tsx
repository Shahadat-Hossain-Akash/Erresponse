"use client";

import { Button } from "@nextui-org/react";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
//import { GiPerpendicularRings } from "react-icons/gi";
import { useSession } from "next-auth/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Badge,
  Spinner,
} from "@nextui-org/react";

import { useRouter } from "next/navigation";

const Navbar = () => {
  const links = [
    { href: "/", name: "Dashboard" },
    { href: "/issues", name: "Issues" },
  ];
  const currentPath = usePathname();

  const { status, data: session } = useSession();

  const router = useRouter();

  const onClick = () => {
    router.push("/api/auth/signout");
  };

  return (
    <nav className="flex justify-between px-12 py-4 mb-4  items-center font-quicksand">
      <Link href={"/"} aria-label="logo">
        {/*<GiPerpendicularRings
          color={"#EA712E"}
          size={"2.5rem"}
          className="text-gray-100"
  />*/}{" "}
        <p className="text-orange-400 font-semibold text-3xl">TrackIt</p>
      </Link>

      <div className=" flex space-x-4 font-quicksand list-none">
        <ul className=" flex space-x-4 font-quicksand">
          {links.map((link, idx) => (
            <li key={idx}>
              <Link
                aria-label="pages"
                key={idx}
                href={link.href}
                className={classnames({
                  "hover:text-amber-700 transition-colors": true,
                  "text-amber-600": link.href === currentPath,
                  "text-amber-500": link.href !== currentPath,
                })}
              >
                <Button
                  key={idx}
                  variant="light"
                  color="primary"
                  aria-label="pages-name"
                >
                  {link.name}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
        {status === "authenticated" ? (
          <Dropdown
            placement="left"
            radius="sm"
            shadow="sm"
            showArrow
            shouldFlip
          >
            <Badge
              content=""
              color="success"
              shape="circle"
              placement="bottom-right"
            >
              <DropdownTrigger>
                <Avatar
                  src={session.user?.image!}
                  fallback="?"
                  aria-label="user"
                  aria-roledescription="user"
                />
              </DropdownTrigger>
            </Badge>
            <DropdownMenu
              aria-label="User Actions"
              variant="flat"
              color="primary"
              className="text-orange-300"
            >
              <DropdownItem
                isReadOnly
                showDivider
                key="profile"
                className="h-14 gap-2"
                aria-label="user"
              >
                <p className="font-bold">Signed in as</p>
                <p className="font-bold">@{session.user?.name}</p>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={onClick}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : status !== "loading" ? (
          <Link href="/api/auth/signin" aria-label="sign-in">
            <Button variant="flat" color="warning" aria-label="sign-in-button">
              Sign in
            </Button>
          </Link>
        ) : (
          <Spinner />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
