"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
interface SideBarItemProps {
  href: string;
  icon?: ReactNode;
  title: string;
  id: string;
}
const SideBarItem = ({ href, icon, title, id }: SideBarItemProps) => {
  const pathname = usePathname();
  const selected = pathname === href;

  return (
    <Link
      href={href}
      key={id}
      className={`${selected ? "text-[#6a51a6]" : "text-gray-400"} my-1 flex gap-2 font-bold cursor-pointer`}
    >
      <div>{icon}</div>
      <div>{title}</div>
    </Link>
  );
};

export default SideBarItem;
