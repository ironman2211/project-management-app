"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { CiLogin, CiLogout } from "react-icons/ci";

const Navbar = () => {
  const { data: sessionData, status } = useSession();
  console.log(status);

  return (
    <div className="m-4 flex h-[9vh] items-center justify-between rounded-lg border-[2px] bg-white  p-8 text-black shadow-sm ">
      <b>LOGO</b>
      {status === "loading" ? (
        "Loading..."
      ) : (
        <div
          className={`flex w-fit items-center justify-between gap-4 rounded-full  px-4 py-2 text-sm text-gray-900 ${sessionData?.user ? "bg-black/5" : ""}`}
        >
          {sessionData?.user?.image ? (
            <div className="h-[30px] w-[30px] rounded-full bg-white shadow-lg">
              <img
                src={sessionData?.user?.image}
                alt="avatar"
                className="h-full w-full rounded-full"
              />
            </div>
          ) : (
            ""
          )}
          {sessionData?.user?.name}
          <button
            className="flex items-center justify-center gap-3 text-base"
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData ? <CiLogout /> : <CiLogin />}
            {sessionData ? "Logout" : "Login"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
