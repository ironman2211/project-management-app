import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Toaster } from "react-hot-toast";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Loader from "~/_components/Loader";
import { AppWrapper } from "~/context";
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <AppWrapper>
        <main className={GeistSans.className}>
          <Toaster />
          <Loader />
          <Component {...pageProps} />
        </main>
      </AppWrapper>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
