import React from "react";
import ExpensePage from "../components/Expenses";
import Container from "../hoc/Container";
import Head from "next/head";

const Expenses = () => {
  return (
    <>
      <Head>
        <title>Spendns | Expenses</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <ExpensePage />
      </Container>
    </>
  );
};

export default Expenses;
