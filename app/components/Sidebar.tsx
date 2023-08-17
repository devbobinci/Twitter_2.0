"use client";

import Image from "next/image";
import React from "react";

import {
  BsBell,
  BsHash,
  BsBookmarkCheck,
  BsCollection,
  BsMailbox,
} from "react-icons/bs";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import SidebarRow from "./SidebarRow";
import { useSession, signIn, signOut } from "next-auth/react";

function Sidebar() {
  const { data: session } = useSession();

  return (
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
      <Image
        src="/images/logo.png"
        width={50}
        height={50}
        alt="Twitter logo"
        className="m-3 h-10 w-10 object-contain"
      />
      <SidebarRow Icon={AiOutlineHome} title="Home" />
      <SidebarRow Icon={BsHash} title="Explore" />
      <SidebarRow Icon={BsBell} title="Notifications" />
      <SidebarRow Icon={BsMailbox} title="Messages" />
      <SidebarRow Icon={BsBookmarkCheck} title="Bookmarks" />
      <SidebarRow Icon={BsCollection} title="Lists" />
      <SidebarRow
        Icon={AiOutlineUser}
        title={session ? "Sign Out" : "Sign In"}
        onClick={session ? signOut : () => signIn()}
      />
      <SidebarRow Icon={HiOutlineDotsCircleHorizontal} title="More" />
    </div>
  );
}

export default Sidebar;
