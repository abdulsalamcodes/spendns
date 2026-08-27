import Head from "next/head";
import React from "react";
import AuthPage from "../components/Auth/AuthPage";

const Login = () => {
  return (
    <>
      <Head>
        <title>Spendns | Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthPage />
    </>
  );
};

export default Login;
