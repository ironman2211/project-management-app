import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { AppWrapper } from "~/context";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <AppWrapper>
        <main className={GeistSans.className}>
          <Component {...pageProps} />
        </main>
      </AppWrapper>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
