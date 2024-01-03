import React from "react";
import DebtPage from "../components/Debt";
import withAuth from "../hoc/WithAuth";
import Head from "next/head";

const Debt = () => {
  return (
    <>
      <Head>
        <title>Spendns | Debts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DebtPage />
    </>
  );
};

export default withAuth(Debt);
