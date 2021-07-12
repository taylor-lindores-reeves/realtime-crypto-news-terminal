import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";

const Layout = ({ children, title = "This is the default title" }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <NextSeo title={title} description="A short description goes here." />
      <main className="min-h-screen">{children}</main>
    </>
  );
};

export default Layout;
