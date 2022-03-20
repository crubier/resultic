import { Suspense } from "react";
import "../styles/globals.css";
// import PlausibleProvider from "next-plausible";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery,
} from "react-relay/hooks";
import { RelayEnvironment } from "@/lib/relay-environment";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    // <PlausibleProvider domain="resultic.info">
    <SessionProvider session={session}>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <Suspense fallback={"Loading..."}>
          <Component {...pageProps} />
        </Suspense>
      </RelayEnvironmentProvider>
    </SessionProvider>
    // </PlausibleProvider>
  );
}

export default App;
