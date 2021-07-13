import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, title = "Realtime Crypto Terminal" }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Header />
      <NextSeo
        title={title}
        description="Example of a realtime crypto terminal."
      />
      <main className="-mt-24 pb-8 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
