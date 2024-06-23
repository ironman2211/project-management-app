import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";

export default function Sidebar({ show, setter }: any) {
  const router = useRouter();

  const className =
    "bg-gray-900 w-[80px] transition-[margin-left] md:static top-0 bottom-0 left-0 z-40 py-10 ";

    const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  const MenuItem = ({ icon, route }: any) => {
    const colorClass =
      router.pathname === route
        ? "text-white"
        : "text-white/50 hover:text-white";

    return (
      <Link
        href={route}
        onClick={() => {
          setter((oldVal: any) => !oldVal);
        }}
        className={`text-md flex gap-1  py-3 pl-6 [&>*]:my-2 ${colorClass}`}
      >
        <div className="flex w-[30px] text-xl [&>*]:mx-auto">{icon}</div>
      </Link>
    );
  };

  return (
    <>
      <div className={`${className}${appendClass}`}>
        <div className="flex flex-col">
          <MenuItem  route="/dashboard" icon={<MdOutlineDashboard />} />
          <MenuItem route="/user" icon={<FaRegUser />} />
        </div>
      </div>
    </>
  );
}
