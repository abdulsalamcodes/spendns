import Head from "next/head";
import React from "react";
import HomePage from "../components/HomePage";
import withAuth from "../hoc/WithAuth";

const Home = () => {
  
  return (
    <div className="">
      <Head>
        <title>Spendns</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage />
    </div>
  );
};

export default withAuth(Home);
