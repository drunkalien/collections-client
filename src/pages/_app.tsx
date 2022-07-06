import { appWithTranslation } from "next-i18next";
import { QueryClientProvider } from "react-query";
import { ThemeProvider } from "next-themes";

import "../styles/globals.scss";
import "tailwindcss/tailwind.css";
import { Layout } from "components";
import { queryClient } from "services";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />{" "}
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default appWithTranslation(MyApp);
