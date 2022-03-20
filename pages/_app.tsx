import "../styles/globals.css";
// import PlausibleProvider from "next-plausible";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    // <PlausibleProvider domain="resultic.info">
    <SessionProvider session={session}>
      <Component {...pageProps} />{" "}
    </SessionProvider>
    // </PlausibleProvider>
  );
}

export default App;
