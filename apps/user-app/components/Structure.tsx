"use client";

import { Appbar } from "@repo/ui/appbar";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { ReactNode } from "react";
import SideBar from "./SideBar/SIdeBar";
interface SideBarProps {
  children: ReactNode;
}
const Structure = ({ children }: SideBarProps) => {
  const session = useSession();

  return (
    <div className="h-screen">
      <div>
        <Appbar
          onSignin={signIn}
          onSignout={signOut}
          user={session.data?.user}
        />
      </div>
      <div className="flex justify-start  h-full items-center">
        <div className="w-[15%] border-gray-300  border-r h-screen">
          <SideBar />
        </div>
        <div className="w-[85%] h-screen">{children}</div>
      </div>
    </div>
  );
};

export default Structure;
