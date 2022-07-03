import { appWithTranslation } from "next-i18next";

import "../styles/globals.scss";
import "tailwindcss/tailwind.css";
import { Layout } from "components";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />{" "}
    </Layout>
  );
}

export default appWithTranslation(MyApp);
