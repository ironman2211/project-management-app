import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "../_components/Layout/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home(props: any) {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard"); // Redirect to dashboard after login
    }
  }, [status, router]);
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className=" flex min-h-[88vh] flex-col items-center justify-center bg-gray-100 text-gray-900">
        <h1 className="text-5xl font-extrabold  leading-tight tracking-wide text-black sm:text-[3rem] ">
          T3
          <span className="text-[hsl(280,100%,70%)]"> Task Management</span> App
        </h1>
        <p className="my-9 text-xl">Please login to contunue</p>
        <button
          className="rounded-full bg-[hsl(280,100%,70%)] bg-white/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-[hsl(280,100%,70%)]/20"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Logout" : "Login"}
        </button>
      </main>
    </>
  );
}
