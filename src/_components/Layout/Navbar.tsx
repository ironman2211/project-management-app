"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { CiLogin, CiLogout } from "react-icons/ci";

const Navbar = () => {
  const { data: sessionData, status } = useSession();
  console.log(status);

  return (
    <div className="flex h-[9vh] items-center justify-between bg-gray-900 px-8 text-white shadow-xl ">
      <b>LOGO</b>
      {status === "loading" ? (
        "Loading..."
      ) : (
        <div className="flex w-fit items-center justify-between gap-4 rounded-full bg-white/10 px-4 py-2 text-sm text-gray-100 ">
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
