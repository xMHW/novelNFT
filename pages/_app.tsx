import { SessionProvider } from "next-auth/react";
import PlausibleProvider from "next-plausible";
import { DOMAIN_URL } from "@/lib/constants";
import Header from "@/components/Header";
import { RecoilRoot } from "recoil";
import { Layout } from "antd";
import { MoralisProvider } from "react-moralis";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    //<MoralisProvider>
    <PlausibleProvider domain={DOMAIN_URL}>
      <SessionProvider session={session}>
        <RecoilRoot>
          <Layout>
            <Header />
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
      </SessionProvider>
    </PlausibleProvider>
    //</MoralisProvider>
  );
}
