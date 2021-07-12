import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";

const Layout = ({ children, title = "Realtime Crypto Terminal" }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <NextSeo
        title={title}
        description="Example of a realtime crypto terminal."
      />
      <main className="min-h-screen">{children}</main>
    </>
  );
};

export default Layout;
