// @/components/DummyPage.js
import React, { useEffect } from "react";
import Layout from "./Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function BasePage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status !== "loading" && status !== "authenticated") {
      router.push("/"); // Redirect to dashboard after login
    }
  }, [status, router]);
  return <Layout pageTitle={title}>{children}</Layout>;
}
