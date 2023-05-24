import { SessionProvider } from "next-auth/react";
import PlausibleProvider from "next-plausible";
import { DOMAIN_URL } from "@/lib/constants";
import Header from "@/components/Header";
import { RecoilRoot } from "recoil";
import { ConfigProvider, Layout } from "antd";
const { Content } = Layout;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <PlausibleProvider domain={DOMAIN_URL}>
      <SessionProvider session={session}>
        <RecoilRoot>
          <Layout>
            <Header />
            <Content style={{ padding: "20px 200px 20px 200px", backgroundColor: "#F4F7FF", width: "100%", height: "100%" }}>
              <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: '#F4F7FF',
                      colorBorder: '#E7E7E7',
                    },
                  }}
                >
                  <Component {...pageProps} />
                </ConfigProvider>
            </Content>
          </Layout>
        </RecoilRoot>
      </SessionProvider>
    </PlausibleProvider>
  );
}
