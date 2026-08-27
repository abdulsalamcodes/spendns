import React from "react";
import IncomePage from "../components/Income";
import Container from "../hoc/Container";
import Head from "next/head";

const Income = () => {
  return (
    <>
      <Head>
        <title>Spendns | Income</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <IncomePage />
      </Container>
    </>
  );
};

export default Income;
