import { AppProps } from "next/dist/next-server/lib/router/router";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";

import "../styles/globals.scss";
import "react-multi-carousel/lib/styles.css";
import "nprogress/nprogress.css";

import { DefaultSeo } from "next-seo";
import { SEO } from "../next-seo.config";

NProgress.configure({ minimum: 0.1, trickleSpeed: 50 });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/favicon/favicon.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="/logo/logo-200x200.png"
          sizes="192x192"
        />
        <link rel="apple-touch-icon" href="/logo/logo-200x200.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
      <style jsx>
        {`
          @import url(https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Roboto:wght@400;500&display=swap);
        `}
      </style>
    </>
  );
}

export default MyApp;
