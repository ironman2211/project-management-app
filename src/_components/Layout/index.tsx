// @/components/Layout/index.js
import React, { useState } from "react";
import Head from "next/head";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ pageTitle, children }: any) {
  // Concatenate page title (if exists) to site title
  let titleConcat = "Responsive Sidebar Example";
  if (pageTitle) titleConcat = pageTitle + " | " + titleConcat;

  // Mobile sidebar visibility state
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Head>
        <title>{titleConcat}</title>
      </Head>
      <div className="min-h-screen">
        <Navbar />
        <div className="flex">
          <Sidebar show={showSidebar} setter={setShowSidebar} />
          <div className="flex min-h-[91vh] w-screen flex-grow flex-col md:w-full">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
